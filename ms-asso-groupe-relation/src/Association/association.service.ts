import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { AssoInterface, RoleUserEnum } from './interface/association.interface';
import { AssociationDocument } from './Schema/association.schema';
import { NatsMessengerService } from '@app/nats-messenger';
import { GroupService } from 'src/Group/group.service';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Service responsible for managing operations related to ASSOCIATIONS 
@Injectable()
export class AssociationService {
    constructor(
        @InjectModel('Associations')
        private associationModel: Model<AssociationDocument>,
        @Inject(forwardRef(() => GroupService))
        private groupService: GroupService,
        private readonly natsMessengerService: NatsMessengerService,
    ) { }
    
    /**
     * Retrieve an association by its ID
     * @param params - ID of the association
     */
    async getAssoByID(assoId: string): Promise<AssociationDocument> {
      try {
        return await this.associationModel.findById(assoId);
      } catch (error) {
        throw new NotFoundException(error) 
      }
    }

    /**
     * Retrieve an association by its name
     * @param params - name of the association
     */
    async getAssoByName(name: string):Promise<AssociationDocument> {
      try {
        const [assoName] = await this.associationModel.find({ name });
        return assoName
      } catch (error) {
        throw new NotFoundException(error) 
      }
    }

    /**
     * Creation of a new association 
     * @param params - user ID 
     * @param body - AssoInterface 
     */
    async createAssociation(asso: AssoInterface, userId: string ): Promise<AssociationDocument> {
      try {
        // Check if an association with the same name already exists
        if (await this.getOneAssoByName(asso.name)) throw new BadRequestException('Association already exists');
        // Create the association
        const assoCreated = await this.associationModel.create(asso);

        if(assoCreated) {
          // Send a message to update the user's association role to ADMIN
          const userModified = await this.natsMessengerService.send(
            'UPDATE_USER_ASSO_ROLE',
            {
              params: {
                id: userId
              },
              body: {
                id: assoCreated._id,
                role: RoleUserEnum.Admin
              }
            }
            )
          return userModified
        } 
      } catch (error) {
        throw new NotFoundException(error) 
      }
    }

    /**
     * Retrieve the list of all associations of the application 
     */
    async getAllAssociations(): Promise<AssociationDocument[]> {
      try {
        return await this.associationModel.find()
      } catch (error) {
        throw new NotFoundException(error) 
      }
    }

    /**
     * Modification of an association  
     * @param params - ID of the association 
     * @param body - AssoInterface  
     */
    async associationEdit(assoId: string, body: AssoInterface): Promise<AssociationDocument> {
    try {
        return await this.associationModel.findByIdAndUpdate(
          assoId,
          body,
          { new: true }
        )
      } catch (error) {
        throw new NotFoundException(error) 
      }
    }
    
    /**
     * Delete an association 
     * @param params - association ID 
     */ 
    async associationDelete(assoId: string) {
      try {
        await this.associationModel.findByIdAndRemove(assoId);
      } catch (error) {
        throw new NotFoundException(error) 
      }
    }

    /**
     * Retrive an association by its name 
     * @param params - association name 
     */ 
    async getOneAssoByName(name: string): Promise<AssociationDocument> {
      try {
        return await this.associationModel.findOne({ name });
      } catch (error) {
        throw new NotFoundException(error) 
      }
    }

    /**
     * Retrieve the association list where the user is part of 
     * @param params - user ID 
     */ 
    async getAssosByUser(userId: string):Promise<object[]> {
      try {
        //get the user details using NATS service 
        const userDetails = await this.natsMessengerService.send(
          'GET_USER_BY_ID',
          { params: { id: userId }}
        )
        console.log("🚀 ~ file: association.service.ts:141 ~ AssociationService ~ getAssosByUser ~ userDetails:", userDetails)
        
      // Check if user details contain associations
      if (userDetails.datas.associations) {
        const userAssos = [];

        for (const asso of userDetails.datas.associations) {
          //retrieve the details of the association 
          const association = await this.getAssoByID(asso.id);
          console.log("🚀 ~ file: association.service.ts:150 ~ AssociationService ~ getAssosByUser ~ association:", association)
          //if the association exists, we push into the array 
          if (association) {
          // Push association data into the result array
          userAssos.push({
            id: asso.id,
            role: asso.role,
            name: association.name,
          });
        }}

        return userAssos;
        }
      } catch (error) {
        throw new NotFoundException(error) 
      }
    }


    /**
     * Retrieve the association where the user is a part of with an USER role 
     * @param params - user ID 
     */ 
    async getAssosByRoleUser(userId: string):Promise<AssociationDocument[]> {
      try {
        //retrieve the user details using NATS 
        const userDetails = await this.natsMessengerService.send(
          'GET_USER_BY_ID',
          { params: { id:userId }}
        )
        // Extract associations from the user details
        const userAssos = userDetails.datas.associations
        // Filter associations based on USER role
        const userAssociations = userAssos.filter((association: { role: string; }) => association.role === RoleUserEnum.User)
        // Return an array of association IDs
        return userAssociations.map((association: { _id: string; }) => association._id)
      } catch (error) {
        throw new NotFoundException(error) 
      }
    }
  
    /**
     * Retrieve the association where the user is a part of with an ADMIN role 
     * @param params - user ID
     */ 
    async getAssosByRoleAdmin(userId: string):Promise<AssociationDocument[]> {
      try {
        //retrieve the user details using NATS  
        const userDetails = await this.natsMessengerService.send(
          'GET_USER_BY_ID',
          { params: { id:userId } }
        )
        // Extract associations from the user details
        const userAssos = userDetails.datas.associations
        // Filter associations based on ADMIN role
        const userAssociations = userAssos.filter((association: { role: string; }) => association.role === RoleUserEnum.Admin)
        // Return an array of association IDs
        return userAssociations.map((association: { _id: string; }) => association._id)
      } catch (error) {
        throw new NotFoundException(error) 
      }
    } 
}