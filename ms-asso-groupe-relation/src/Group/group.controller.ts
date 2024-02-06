import { Controller, NotFoundException, UseInterceptors, ValidationPipe } from '@nestjs/common'
import { RpcSuccessInterceptor } from 'src/Interceptor/RpcSuccessInterceptor'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { GroupDocument } from './Schema/group.schema'
import { IdDto } from 'src/Association/Dto/id.dto'
import { GroupService } from './group.service'
import { GroupDto } from './Dto/group.dto'

// Controller responsible for handling API endpoints related to GROUPS
@Controller()
@UseInterceptors(RpcSuccessInterceptor)
export class GroupController {
    constructor(
        private readonly groupService: GroupService,
    ) { }

    /**
     * Retrieve a group by its ID.  
     * @param params - group ID 
     * GET - 'group/:id'
     */
    @MessagePattern('GET_GROUP_BY_ID')
    async findGroupID(@Payload('params', new ValidationPipe()) params: IdDto): Promise<GroupDocument> {
        try {
            return await this.groupService.getGroupById(params.id);
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Get the names of groups based on the ID of an event.
     * @param params - event ID .
     * GET - 'group/name/ByEvent/:id'
     */    
    @MessagePattern('GET_GROUPNAME_BY_EVENTID')
    async findGroupNameByEventId(@Payload('params', new ValidationPipe()) params: IdDto):Promise<string[]> {
        try {
            return await this.groupService.getGroupNameByEventId(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Get the names+IDs of groups based on the ID of an association.
     * @param params - Association ID
     * GET - 'grouplist/ByAsso/:id'
     */ 
    @MessagePattern('GET_GROUPDETAILS_BY_ASSO')
    async findGroupDetailsByAssoId(@Payload('params', new ValidationPipe()) params: IdDto):Promise<object[]> 
    {
        try {
            return await this.groupService.getGroupDetailsByAssoId(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
 
     /**
     * Création of a new group
     * @param body - GroupDTO
     * POST - 'group/create'
     */ 
    @MessagePattern('CREATE_GROUP')
    async createGroup(@Payload('body') body: GroupDto): Promise<GroupDocument>
    {
        try {
            return await this.groupService.createGroup(body);
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Modification of a group
     * @param body - GroupDTO
     * @param params - group ID  
     * PUT - 'group/update/:id'
     */ 
    @MessagePattern('UPDATE_GROUP')
    async updateGroup(
        @Payload('params', new ValidationPipe()) params: IdDto, 
        @Payload('body') body: GroupDto): Promise<GroupDocument>
    {
        try {
            return await this.groupService.updateGroup(params.id, body); 
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
        
    /**
     * Delete a group 
     * @param params - group ID  
     * DELETE - 'group/delete/:id'
     */ 
    @MessagePattern('DELETE_GROUP')
    async deleteGroup(@Payload('params', new ValidationPipe()) params: IdDto):Promise<boolean> {
        try {
            return await this.groupService.deleteGroup(params.id);
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all groups belonging to a specific association.
     * @param params - association ID 
     * GET - 'groups/ByAsso/:id'
     */ 
    @MessagePattern('GET_GROUPS_BY_ASSO_ID')
    async indexGroupByAssoId(@Payload('params', new ValidationPipe()) params: IdDto):Promise<GroupDocument[]> {
        try {
            return await this.groupService.getAllGroupAssoId(params.id)
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Retrieve all groups.
     * GET - 'groups'
     */ 
    @MessagePattern('INDEX_GROUPS')
    async findAllAsso(): Promise<GroupDocument[]> {
        try {
            return await this.groupService.getAllGroups();
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Retrieve all groups belonging to a specific association based on the user.
     * @param params - User ID 
     * GET -  'groups/ByAsso/ByUser/:id'
     */ 
    @MessagePattern('GET_GROUPS_BY_USER_ID')
    async indexGroupByUserId(@Payload('params', new ValidationPipe()) params: IdDto):Promise<GroupDocument[]> {
        try {
            return await this.groupService.getAllGroupsUserId(params.id)
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Update a group by adding a Kid ID.
     * @param params - Group ID
     * @param body - Kid ID
     * POST - 'group/addKid/byGroup/:id'
     */ 
    @MessagePattern('ADD_KID_TO_GROUP')
    async updateGroupAddKid( 
        @Payload('body') body: {id: string}, //kidId
        @Payload('params', new ValidationPipe()) params: IdDto): Promise<GroupDocument> {  //groupID
        try {
            return await this.groupService.addKid(body.id,params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
   
    /**
     * Update a group by removing a Kid ID.
     * @param params -Group ID
     * @param body - Kid ID
     * POST - 'group/removeKid/ByGroup/:id'
     */ 
    @MessagePattern('REMOVE_KID_FROM_GROUP')
    async removeKidToGroup(
        @Payload('params', new ValidationPipe()) params: IdDto, // groupId
        @Payload('body') body: {id: string}): Promise<GroupDocument>{
        try {
            return await this.groupService.removeKid(params.id, body.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

}
