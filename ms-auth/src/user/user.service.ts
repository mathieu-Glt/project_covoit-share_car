/* eslint-disable @typescript-eslint/no-unused-vars */
import { adminEditInterface, assoUserEditInterface, getUsersCreatedInterface, kidEditInterface, parentAdminCreateInterface, parentEditInterface } from './interface/userRes.interface'
import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { RoleUserEnum, TypeUserEnum } from './Enum/user.enum'
import { NatsMessengerService } from '@app/nats-messenger'
import { CreateUserDto } from './Dto/createUser.dto'
import { UserDocument } from './Schema/user.schema'
import { AuthService } from 'src/auth/auth.service'
import { InjectModel } from '@nestjs/mongoose'
import { IdDto } from './Dto/id.dto'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { ResponseErrorInterface, ResponseSuccessInterface } from './interface/response.interface'
import { passwordDto } from './Dto/password.dto'

// Service responsible for USER related operations
@Injectable()
export class UserService {
    constructor(
      @InjectModel('User')
      private userModel: Model<UserDocument>,
      @Inject(forwardRef(() => AuthService))
      private authService: AuthService,
      private readonly natsMessengerService: NatsMessengerService,
    ) { }

    /**
     * Password hashing function.
     * @param data - password to hash
     */
    async hash(data: string): Promise<string> {
      const hash = await bcrypt.hash(data, await bcrypt.genSalt())
      const password = data = hash
      return password
    }

    /**
     * Retrieve a user by their email.l 
     * @param email - user email address 
     * @review => oK 
     */ 
    async getUserByEmail(email: string): Promise<UserDocument> {
      try {
        return await this.userModel.findOne({ email: email.toLowerCase() })
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Create users including user (type kid) + user(type parent) + relation + email invitation
     * @param data - CreateUserDto 
     * @review => oK 
     */ 
    async createUsers(data: CreateUserDto): Promise<getUsersCreatedInterface> {
      try {
        // Check the type of user to create 
        const IsKidType = data.type
        if (IsKidType != TypeUserEnum.Kid) throw new NotFoundException('Mauvais type renseigné')

        // Check if the group ID is provided
        if (!data.group_id) throw new NotFoundException('Pas de groupe renseigné')

        // Create a new user type kid 
        const newKid = await this.newUserKid(data)

        // Create a new user type parent
        const newParent = await this.newUserParent(data)

        //Create relation parent-kid-asso 
        if (newKid && newParent) {
          return this.natsMessengerService.send(
            'CREATE_RELATION',
            {
              fromRef_id: newKid.id,
              toRef_id: newParent._id.toString(),
              link: TypeUserEnum.Kid,
              asso_id: data.asso_id
            }
          )
        }
        return {
          newKid,
          newParent
        }
      } catch (error) {
        throw new NotFoundException('Utilisateurs non créés')
      }
    }

    /**
     * Creation user (type kid)
     * @param data - CreateUserDto 
     */
    async newUserKid(data: CreateUserDto): Promise<UserDocument> {
      try {
        //creation of new user 
        const newKid = await this.userModel.create({
          ...data,
          email: ""
        })
        //add kid to group
        await this.addkidToGroup(data.group_id, newKid._id)
        return newKid
      } catch (error) {
        throw new NotFoundException('Enfant non créé')
      }
    }

    /**
     *  Creation user (type parent user) (when kid is created at the same time)
     * @param data - CreateUserDto (we retrieve only the email address )
     */
    async newUserParent(data: CreateUserDto): Promise<UserDocument> {
      try {
        //Creation new user type (parent)
        const newParent = await this.userModel.create({
          type: TypeUserEnum.Parent,
          isActive: false,
          email: data.email,
          associations: [{
            _id: data.asso_id,
            role: RoleUserEnum.User
          }]
        })
    
        //Send invitation email to parent 
        if (newParent) {
        this.sendEmailCreationAccount(newParent.email)
        }
        return newParent
        
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     *  Sends an email upon the creation of a parent profile and creates a link with a token.
     * @param email -  Email address of the created user.
     */
    async sendEmailCreationAccount(email: string) {
      try {
        //create new link with token 
        const linkToken = await this.toekncreateLinkTokenCreationAccount(email);
        this.natsMessengerService.emitEmailCreationAccount(email, linkToken);      
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Creation of a personalised link with token for the creation of parent user 
     * @param email - email address of user created 
     */
    async toekncreateLinkTokenCreationAccount(email: string): Promise<string>{
      //Cration of authtoken with email address 
      const newAuthToken = await this.authService.createAuthToken(email)
      console.log("🚀 ~ file: user.service.ts:157 ~ UserService ~ createLinkTokenCreationAccount ~ newAuthToken:", newAuthToken)
      try {
        //return the link with token
        return `${process.env.PREFIX_URI}/auth/confirm-profile/${newAuthToken.token}`
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     *  Creation of a new user type parent (admin) (inscription)
     * @param data - parentAdminCreateInterface 
     */
    async newUserParentAdmin(data: parentAdminCreateInterface): Promise<any> {
      try {
        console.log("🚀 ~ file: user.service.ts:170 ~ UserService ~ newUserParentAdmin ~ data:", data)
        
          //hash the new password 
          // console.log("🚀 ~ file: user.service.ts:175 ~ UserService ~ newUserParentAdmin ~ hashedPassword:", hashedPassword)
          //creation of an user admin with provided datas 
          const newParentAdmin = await this.userModel.create({
                  ...data,
                  type: TypeUserEnum.Parent, 
                })
            console.log("🚀 ~ file: user.service.ts:181 ~ UserService ~ newUserParentAdmin ~ newParentAdmin:", newParentAdmin)
            //sends email once user created 
            // if (newParentAdmin && TypeUserEnum.Parent) {
            await this.sendEmailCreationAsso(newParentAdmin.email)
            // }
            // return newParentAdmin
          
      } catch (error) {
        throw new NotFoundException(error)
      }
    }
    
    /**
     *  Sends email in order to finalize the creation of an association  
     * @param email - user email address 
     */
    async sendEmailCreationAsso(email: string) {
      console.log("🚀 ~ file: user.service.ts:198 ~ UserService ~ sendEmailCreationAsso ~ email:", email)
      try {
        //create new link with token using the email address of the user la focntion createLinkTokenCreationAccount renvoit 
        // ce lien `${process.env.PREFIX_URI}/auth/confirm-profile/${newAuthToken.token}
        const linkToken = await this.toekncreateLinkTokenCreationAccount(email);
        this.natsMessengerService.emitEmailCreationAccount(email, linkToken);
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     *  Creates a link with a token in the email for creating a parent admin (registration).
     * @param email - user email address 
     */
    async createLinkTokenCreationAsso(email: string):Promise<string> {
      // Create an authentication token 
      const newAuthToken = await this.authService.createAuthToken(email)
      try {
        // Return the link with the token
        return `${process.env.PREFIX_URI}/auth/create-asso/${newAuthToken.token}`
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     *  Displays the list of all users by association ID
     * @param assoId - association ID  
     * @review => ok
     */
    async getAllUsersByAsso(assoId: string): Promise<UserDocument[]> {
      try {
        return await this.userModel.find({ "associations._id": assoId })
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     *  Retrieves the list of all kids by association ID
     * @param assoId - association ID  
     * @review => ok
     */
    async getAllUsersKidByAsso(assoId : string): Promise<UserDocument[]> {
      try {
        //retrieve all groups from the association using NATS  
        const allGroupsByAsso = await this.natsMessengerService.send(
          'GET_GROUPS_BY_ASSO_ID',
          assoId
          )
        
        // Get all group IDs of the association
        const groupIds = allGroupsByAsso.map(group => group._id)
          
        const kidsListByAsso = []
        
        // Get all kids from the groups
        for (const groupId of groupIds) {
          const allKidsFromOneGroup = await this.natsMessengerService.send(
            'INDEX_USERS_BY_GROUP',
            groupId
          )
          if(allKidsFromOneGroup) {
            kidsListByAsso.push(allKidsFromOneGroup)
          }
        }
            
          return kidsListByAsso
        } catch (error) {
          throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve an user with their id 
     * @param id - user ID  
     * @review = ok
     */
    async getUserById(id: string): Promise<UserDocument> {
      try {
        return await this.userModel.findById(id);
      } catch (error) {
        throw new NotFoundException(error) 
      }
    }

    /**
     * Checks if a user exists by their ID
     * @param id - user ID  
     * @review => ok
     */
    async hasUserById(id: string): Promise<boolean>{
      try {
        return await this.userModel.countDocuments({ _id: id }) >= 1 ? true : false;
      // if (!throwError) 
      // return exist;
      // throw new BadRequestException('User not found')
        
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Modification of an user 
     * @param id - user ID 
     * @body CreateUserDto 
     * @review => ok
     */
    async setUser(userId: string, body: CreateUserDto): Promise<UserDocument> {
      try {
        // Hash the provided password
        body.password = await this.hash(body.password)
        // Update the user with the edited data
        const userUdapted =  await this.userModel.findByIdAndUpdate(
          userId,
          this.__getPayloadForEdit(body),
          { new: true }
        )
        // Clear the password from the returned user object
        userUdapted.password = "";
        return userUdapted;
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Modification of an user admin
     * @param id - user ID 
     * @body CreateUserDto 
     * @review => ok
     */
    async userParentAdminEdit(userId: string, body: CreateUserDto): Promise<UserDocument> {
      try {
        // Hash the provided password
        body.password = await this.hash(body.password)
        // Update the user with the edited data
        const userUdapted =  await this.userModel.findByIdAndUpdate(
          userId,
          this.__getAdminPayloadForEdit(body),
          { new: true }
        )
        // Clear the password from the returned user object
        userUdapted.password = "";
        return userUdapted;
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Modification of an user role
     * @param userId - user ID 
     * @body assoUserEditInterface
     */
    async setUserRole(userId : string, body: assoUserEditInterface) {
      try {
        // Get the user by their ID
        const thisUser = await this.getUserById(userId) 
    
        // Find the index of an association with an empty ID in the associations array
        const indexToUpdate = thisUser.associations.findIndex((assoc) => assoc.id === '');
      
        if (indexToUpdate !== -1) {
          // If an association with an empty ID is found, replace it with the data from the body
          thisUser.associations[indexToUpdate] = body;
        } else {
          // Otherwise, check if the association already exists
          const existingAssociation = thisUser.associations.find((assoc) => assoc.id === body.id);
    
          // If the association exists, update only the role
          if (existingAssociation) {
            existingAssociation.role = body.role;
          } else {
            // If the association doesn't exist, add it to the associations array and save the user
            thisUser.associations.push(body)
            await thisUser.save() 
          }
        }
        return thisUser;
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Delete an user with their ID 
     * @param user - user ID 
     */
    async userDelete(user: IdDto): Promise<void> {
      try {
        return this.userModel.findByIdAndRemove(user.id)
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Retrieve the user connected 
     * @param userId - user ID 
     */
    async getUserConnected(userId: string): Promise<UserDocument> {
      try {
        const userConnected = await this.userModel.findById(userId);
        userConnected.password = "";
        return userConnected
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Modify the user connected 
     * @param userId - user ID 
     * @body CreateUserDto 
     */
    async userEditConnected(body: CreateUserDto, userId: string): Promise<UserDocument> {
      try {
        body.password = await this.hash(body.password)
        return await this.userModel.findByIdAndUpdate(
          userId,
          body,
          { new: true }
        )
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Retrieve the email address of the user with their ID  
     * @param userId - user ID 
     */
    async getEmailByUserId(userId: string): Promise<UserDocument> {
      try {
        return await this.userModel.findById(userId)
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Retrieve all the users from a group ID 
     * @param groupId - group ID 
     */
    async getAllUsersByGroupId(groupId: string): Promise<string[]> {
      try {
        // Find all users with the specified group ID and retrieve distinct '_id' values
        const kidsGroup = await this.userModel.find({
          group_id: groupId
        }).distinct('_id')
        // Convert the distinct '_id' values to strings and return the array
        return kidsGroup.map(id => id.toString())
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

     /**
     * Retrieve all the users by relation 
     * @param kidsIds - array of kid ids 
     */
    // async getAllUsersByRelation(kidsIds: string[]): Promise<UserDocument[]> {
    //   try {
    //     // Fetches the parent IDs associated with the provided list of kid IDs
    //     const parentIndex_Id = await this.natsMessengerService.send(
    //       'FETCH_TOREF_LINK_KID',
    //       kidsIds // pour fromRefID (= KID ID)
    //     )
    //     // Retrieves parent user documents based on the fetched parent IDs
    //     return await Promise.all(
    //       parentIndex_Id.map((parentId: string) =>
    //         this.userModel
    //           .findById(parentId)
    //       )
    //     )
    //   } catch (error) {
    //     throw new NotFoundException(error)
    //   }
    // }

     /**
     * Add a kid to a group 
     * @param groupId - group id
     * @body kidId - kid id 
     */
    async addkidToGroup(groupId: string, kidId: string) {
      try {
        return await this.natsMessengerService.send(
          'ADD_KID_TO_GROUP',
          {
            body: { kidId, groupId }
          })
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

     /**
     * remove a kid from a group 
     * @param groupId - group id
     * @body kidId - kid id 
     */
    async removeKidToGroup(kidId: string, groupId: string) {
      try {
        return await this.natsMessengerService.send(
          'REMOVE_KID_TO_GROUP', {
          kidId, groupId
        })
      
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * send email to all parents of a group when the group was created 
     * @param groupId - group id
     * @body kidId - kid id 
     */
    async sendEmailParentsByGroup_groupHasBeenAdded(parentsGroupList: UserDocument[], groupId: string) {
      try {
        const eachParents = parentsGroupList.map(async (eachParent) => {

          if (!eachParent.email) throw new NotFoundException('Pas OK')
          await this.natsMessengerService.emitEmailAddedToGroup(eachParent.email)
        })
        return await Promise.all(eachParents)
        
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * send email to all parents of a group when the group is updated 
     * @param groupId - group id
     * @body kidId - kid id 
     */
    async sendEmailParentsByGroup_EventEdit(parentsGroupList: UserDocument[], groupId: string) {
      try {
        const eachParents = parentsGroupList.map(async (eachParent) => {

          if (!eachParent.email) throw new NotFoundException('Pas OK')
          return this.natsMessengerService.emitEmailEventEdited(eachParent.email)
        })
        return await Promise.all(eachParents)
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Returns the payload for editing a user based on their type.
     * @param body - CreateUserDto containing user data
     * @returns Payload for editing user based on type (parent or kid)
     * @review => ok
     */
    private  __getPayloadForEdit(body: CreateUserDto): parentEditInterface | kidEditInterface {
      // Use a switch statement to determine the type of user based on body.type
      switch (body.type) {
        case TypeUserEnum.Parent: 
        // If the user type is Parent, call __getParentPayloadForEdit
        // and cast the result to parentEditInterface
          return this.__getParentPayloadForEdit(body) as parentEditInterface;
        case TypeUserEnum.Kid: 
        // If the user type is Kid, call __getKidPayloadForEdit
        // and cast the result to kidEditInterface
          return this.__getKidPayloadForEdit(body) as kidEditInterface;
      }
    }

    /**
     * Returns the payload for editing a parent user.
     * @param body - CreateUserDto containing parent user data
     * @returns Payload for editing parent user
     */
    private __getParentPayloadForEdit(body: CreateUserDto): parentEditInterface {
      // Return an object with properties for editing a parent user
      return {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        city: body.city,
        address: body.address,
        password: body.password,
        phone: body.phone,
        isActive: true
      }
    }

    /**
     * Returns the payload for editing a kid user.
     * @param body - CreateUserDto containing kid user data
     * @returns Payload for editing kid user
     */
    private __getKidPayloadForEdit(body: CreateUserDto): kidEditInterface {
      // Return an object with properties for editing a kid user
      return {
        firstname: body.firstname,
        lastname: body.lastname,
        comment: body.comment,
        birthday: body.birthday,
        group_id: body.group_id,
      }
    }

    /**
     * Returns the payload for editing an admin user.
     * @param body - CreateUserDto containing admin user data
     * @returns Payload for editing admin user
     */
    private __getAdminPayloadForEdit(body: CreateUserDto): adminEditInterface {
      // Return an object with properties for editing an admin user
      return {
        password: body.password,
        isActive: true,
        associations: [{
        id: "", // The ID of the association (empty in this case)
        role: RoleUserEnum.Admin // Set the role to Admin
        }]
      }
    }

    /**
     * Retrieves the names and IDs of kids in a specified group.
     * @param groupId - ID of the group
     * @returns An array of objects containing kid's first name, last name, and ID
     */
    async getKidsNamesByGroupId(groupId:string) {
      try {
        // Retrieve the group details using its ID through NATS
        const thisGroup = await this.natsMessengerService.send(
          'GET_GROUP_BY_ID',
          { params: { id : groupId } }
        )
        
        // Initialize an empty array to store kid names and IDs
        const KidsNames: object[] = []

        // Iterate through each kid's ID in the group
        for (const kidId of thisGroup.datas.users) {
            // Retrieve kid's details using their ID
            const kid = await this.getUserById(kidId)
            // Push kid's first name, last name, and ID into the KidsNames array
            KidsNames.push({
              firstname: kid.firstname,
              lastname: kid.lastname,
              id: kid._id
              });
          
          }
          // Return the array containing kid's names and IDs
          return KidsNames;

      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Modification user'password
     * @param id - user ID 
     * @body passwordDto 
     * @review => ok
     */
      async updatePasswordUser(userId: string, body: passwordDto): Promise<UserDocument> {
          console.log("🚀 ~ file: user.service.ts:358 ~ UserService ~ updatePasswordUser ~ body:", body.confirmPassword)
          console.log("🚀 ~ file: user.service.ts:358 ~ UserService ~ updatePasswordUser ~ userId:", userId)

          try {
            if(body.password !== body.confirmPassword) throw new BadRequestException('Passwords do not match !')
          //hash the new password 
          const hashedPassword = await bcrypt.hash(body.password, await bcrypt.genSalt())
          console.log("🚀 ~ file: user.service.ts:676 ~ UserService ~ updatePasswordUser ~ hashedPassword:", hashedPassword)

            const userPasswordUpadate = await this.userModel.findByIdAndUpdate(
              { _id: userId }, 
              { password: hashedPassword }, 
              { new: true }
              )
              return userPasswordUpadate;
          } catch (error) {
            throw new NotFoundException(error)
          }
        }
    

}
