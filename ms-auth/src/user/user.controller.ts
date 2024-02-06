/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpCode, HttpStatus, NotFoundException, UseInterceptors, ValidationPipe} from '@nestjs/common'
import { assoUserEditInterface, getUsersCreatedInterface } from './interface/userRes.interface'
import { RpcSuccessInterceptor } from 'src/Interceptor/RpcSuccessInterceptor'
import { userPayload } from 'src/auth/interface/authUp.interface'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { NatsMessengerService } from '@app/nats-messenger'
import { CreateUserDto } from './Dto/createUser.dto'
import { UserDocument } from './Schema/user.schema'
import { userEmailDto } from './Dto/userEmail.dto'
import { UserService } from './user.service'
import { IdDto } from './Dto/id.dto'
import { ResponseErrorInterface, ResponseSuccessInterface } from './interface/response.interface'

// Controller responsible for managing user-related API endpoints
@Controller()
@UseInterceptors(RpcSuccessInterceptor)
export class UserController {
    constructor(
        private userService: UserService,
        private readonly natsMessengerService: NatsMessengerService,
    ) { }

     /**
     * Retrieve a user by their ID 
     * @param params - IdDto -  User ID
     * GET - 'user/:id'
     * @review => ok
     */
    @MessagePattern('GET_USER_BY_ID')
    async findUserID(@Payload('params', new ValidationPipe()) params: IdDto): Promise<UserDocument> {
        try {
            return await this.userService.getUserById(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

     /**
     * Retrieve a user by their email 
     * @param params - userEmailDto - User email
     * GET - 'user/byEmail/:email'
     * @review => ok
     */
    @MessagePattern('GET_USER_BY_EMAIL')
    async findUserEmail(@Payload('params', new ValidationPipe()) params: userEmailDto): Promise<UserDocument> {
        try {
            const user =  await this.userService.getUserByEmail(params.email)
            return user;
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

     /**
     * Retrieve a list of all parent users belonging to the same association
     * @param params - idDto - association ID 
     * GET - 'users/byAsso/:id'
     * @returns List of parent user details in and array
     * @review => ok
     */
    @MessagePattern('INDEX_USERS_PARENTS_BY_ASSO')
    async findAllUsersByAsso(@Payload('params', new ValidationPipe()) params: IdDto ):Promise<UserDocument[]> {
        try {
            return this.userService.getAllUsersByAsso(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve a list of all child users belonging to the same association
     * @param params - IdDto - Association ID
     * GET - 'users/kid/byAsso/:id'
     * @returns List of user Kid details in array 
     * @review => ok
     */
    @MessagePattern('INDEX_USERS_KID_BY_ASSO')
    async findAllUsersKidByAsso(@Payload('params', new ValidationPipe()) params: IdDto ):Promise<UserDocument[]> {
        try {
            return this.userService.getAllUsersKidByAsso(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * User creation from a group 
     * creation of userkid+ userparent+ relation + invation sent by email to parent  
     * @param body - CreateUserDto
     * POST - 'users/create'
     */
    @MessagePattern('CREATE_USERS')
    async createUsers(@Payload('body') body: CreateUserDto): Promise<getUsersCreatedInterface> {
        try {
            return await this.userService.createUsers(body)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Update a user by their ID.
     * @param body - CreateUserDto
     * @param params - IdDto - ID of the user
     * PUT - 'user/update/:id'
     */
    @MessagePattern("UPDATE_USER")
    async updateUser(
      @Payload('params', new ValidationPipe()) params: IdDto, 
      @Payload('body') body: CreateUserDto): Promise<UserDocument>
    {
        try {
            return await this.userService.setUser(params.id, body)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Modification of a user type ADMIN 
     * @param body - CreateUserDto
     * @param params - IdDto - user id 
     * PUT - 'userAdmin/update/:id'
     */    
    @MessagePattern("UPDATE_USER_ADMIN")
    async updateUserAdmin(
      @Payload('params', new ValidationPipe()) params: IdDto, 
      @Payload('body') body: CreateUserDto):Promise<UserDocument> {
          try {
            console.log("🚀 ~ file: user.controller.ts:128 ~ UserController ~ params:", params)
            console.log("🚀 ~ file: user.controller.ts:128 ~ UserController ~ @Payload ~ body:", body)
            return await this.userService.userParentAdminEdit(params.id, body)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
    /**
     * Modification of the role of an user 
     * @param body - assoUserEditInterface 
     * @param params - IdDto - user ID  
     * PUT - 'user/update/role/:id'
     */  
    @MessagePattern("UPDATE_USER_ASSO_ROLE")
    async setUserRoleAdmin(
        @Payload('params', new ValidationPipe()) params: IdDto, // USER ID 
        @Payload('body') body: assoUserEditInterface // asso 
        ):Promise<UserDocument> {
        try {
            return await this.userService.setUserRole(params.id, body)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }


    /**
     * Delete an user 
     * @param params - IdDto - user ID 
     * DELETE - 'user/delete/:id'
     */
    @MessagePattern('DELETE_USER')
    async deleteUser(@Payload('params', new ValidationPipe()) params: IdDto): Promise<void>{
        try {
            await this.userService.userDelete(params)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Fetch the user connected 
     * @param user - userPayload
     * GET - 'user/show/me'
     */
    @MessagePattern('SHOW_ME')
    async findUserConnected(@Payload('user') user: userPayload): Promise<UserDocument> {
        try {
            const res = await this.userService.getUserById(user.sub);
            if (res) {
                const userConnected = await this.userService.getUserConnected(user.sub)
                userConnected.password = "";
                return userConnected;
            }
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Modify the user connected 
     * @param user - userPayload
     * @param body - CreateUserDto
     * POST - 'user/update/me'
     */
    @MessagePattern('UPDATE_ME')
    async updateConnectedUser(
      @Payload('body') body: CreateUserDto,
      @Payload('user') user: userPayload):Promise<UserDocument> {
        try {
            const res = await this.userService.getUserById(user.sub)
            if (res) {
                const updateUser = await this.userService.userEditConnected(body, user.sub)
                return  updateUser
            }
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Get the email address of the user with the user ID  
     * @param params - IdDto - user ID  
     */
    @MessagePattern('GET_EMAIL_BY_USER_ID')
    async getEmailByUserId(@Payload('params', new ValidationPipe()) params: IdDto) {
        try {
            return this.userService.getEmailByUserId(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve the list of all the parents of a group  
     * @param group - idDto - group ID  
     * GET - 'users/ByGroup/:id'
     */
    // @MessagePattern('INDEX_USERS_BY_GROUP')
    // async findUsersByGroup(@Payload('params', new ValidationPipe()) group: IdDto): Promise<UserDocument[]> {
    //     try {
    //         //retrieve all the user(kids) of a group 
    //         const kidsGroup = await this.userService.getAllUsersByGroupId(group.id)

    //         //retrieve all the user(parents) from the user(kids) 
    //         // const parentGroup = await this.userService.getAllUsersByRelation(kidsGroup)

    //         //return an array of all users (parent details)
    //         // return parentGroup
    //     } catch (error) {
    //         throw new NotFoundException(error)
    //     }
    // }

    /**
     * Send emails to parents when a child is added to a group.
     * @param group - idDto - group ID  
     */
    // @MessagePattern('EMAIL_TO_INDEX_USERS_NEW_GROUP')
    // async sendEmailToNewUsersByGroup(@Payload() group: IdDto): Promise<UserDocument[]> {
    //     try {
    //         const parentsList = await this.findUsersByGroup(group)
    //         await this.userService.sendEmailParentsByGroup_groupHasBeenAdded(parentsList, group.id)
    //         return parentsList
    //     } catch (error) {
    //         throw new NotFoundException(error)
    //     }
    // }

    /**
     * Send emails to parents whose children belong to a group.
     * @param group - idDto - group ID 
     */
    // @MessagePattern('EMAIL_TO_INDEX_USERS_BY_GROUP')
    // async sendEmailToUsersByGroup(@Payload() group: IdDto) {
    //     try {
    //         const parentsList = await this.findUsersByGroup(group)
    //         return await this.userService.sendEmailParentsByGroup_EventEdit(parentsList, group.id)
    //     } catch (error) {
    //         throw new NotFoundException(error)
    //     }
    // }

    /**
     * Check if user exists  
     * @param params - idDto - user ID  
     * GET - 'auth/verif/user/:id'
     */
    @MessagePattern('USER_EXISTS')
    async verifUserExists(@Payload('params', new ValidationPipe()) params:IdDto) {
        try {
            return this.userService.hasUserById(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Get the names of children in the group. 
     * @param params - idDto - group ID  
     * GET - 'user/Kidname/ByGroup/:id'
     */
    @MessagePattern('GET_KIDNAMES_BY_GROUP')
    async findKidsNamesGroupId(@Payload('params', new ValidationPipe()) params: IdDto) {
        try {
            return this.userService.getKidsNamesByGroupId(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    } 
    
    
    
}
