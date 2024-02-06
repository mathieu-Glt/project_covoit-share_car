import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { AssociationService } from 'src/Association/association.service'
import { Group, GroupDocument } from './Schema/group.schema'
import { GroupInterface } from './interface/group.interface'
import { NatsMessengerService } from '@app/nats-messenger'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Service responsible for managing operations related to GROUPS
@Injectable()
export class GroupService {
    constructor(
      @InjectModel('Group')
      private groupModel: Model<Group>,
      @Inject(forwardRef(() => AssociationService))
      private assoService: AssociationService,
      private readonly natsMessengerService: NatsMessengerService,
    ) { }
  
  /**
   * Retrieve a group by its ID
   * @param params - group ID
   */
  async getGroupById(groupId: string): Promise<GroupDocument> {
    try {
      return await this.groupModel.findById(groupId);
    } catch (error) {
      throw new NotFoundException(error) 
    }
  }

  /**
   * Create a new group 
   * @param body - GroupInterface
   */
  async createGroup(body: GroupInterface): Promise<GroupDocument> {
    try {
    if (await this.getGroupByName(body.name)) throw new BadRequestException('Group name already exists');
      return this.groupModel.create(body);
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  /**
   * Modification of a group 
   * @param body - GroupInterface
   * @param params - group ID 
   */
  async updateGroup(groupId: string, body: GroupInterface): Promise<GroupDocument> {
    try {
       return await this.groupModel.findByIdAndUpdate(
        groupId,
        body,
        { new: true }
        )
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
    
  /**
   * Delete a group 
   * @param params - group ID 
   */
  async deleteGroup(groupId: string):Promise<boolean> {
    try {
      // Find and remove the group with the given ID
      const deletedGroup = await this.groupModel.findByIdAndRemove(groupId);
      // Check if the group was found and deleted
      return deletedGroup !== null ? true : false
    } catch (error) {
      throw new NotFoundException(error) 
    }  
  }

  /**
   * Retrieve all the groups of an association
   * @param params - association ID 
   */
  async getAllGroupAssoId(assoId: string): Promise<GroupDocument[]> {
    // Check if the association exists  
    const assoExist = await this.assoService.getAssoByID(assoId)

    if(!assoExist) throw new NotFoundException('Association non trouvée')

    try {
      // Retrieve all groups associated with the given association ID using the groupModel
      return await this.groupModel.find({
        association_id : assoId
      })
    } catch (error) {
      throw new NotFoundException(error) 
    }
  }
  
  /**
   * Retrive all the groups by user ID 
   * @param params - user ID
   */
  async getAllGroupsUserId(userId: string): Promise<GroupDocument[]> {
    // Retrieve the user's associations using NATS
    const userAssociations = await this.natsMessengerService.send(
        'INDEX_ASSO_BY_USER',
        { params: { id: userId }}
    )
    // Extract association IDs from userAssociations and store them in assoIds array
    const assoIds = [];
    for (const e of userAssociations.datas) {
      assoIds.push(e.association.id)  
    }
    try {
      // Retrieve all groups associated with the extracted association IDs using the groupModel
      return await this.groupModel.find({
        association_id: {
        //Use the $in operator to match groups with any of the extracted association IDs
          '$in': assoIds
        }
      })
    } catch (error) {
      throw new NotFoundException(error) 
    }
  }    

  /**
   * Retrieve a group by its name 
   * @param params - group name 
   */
  async getGroupByName(name :string): Promise<GroupDocument> {
    try {
      return await this.groupModel.findOne({ name });
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

    /**
   * Retrieve all the groups of the application 
   */
  async getAllGroups(): Promise<GroupDocument[]> {
    try {
      return await this.groupModel.find()
    } catch (error) {
      throw new NotFoundException(error) 
    }
  }

  /**
   * Retrieves the names and IDs of all groups belonging to an association.
   * @param params - association ID 
   */
  async getGroupDetailsByAssoId(assoId: string):Promise<object[]> 
  {
    try {
      // Retrieve all groups associated with the specified association ID
      const allGroupsByAsso = await this.getAllGroupAssoId(assoId)
      // Map the retrieved group data to an array of objects containing group IDs and names
      return allGroupsByAsso.map(({ _id, name }) => ({ _id, name }));
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  /**
   * Retrieves the names of all groups participating in an event.
   * @param params - ID of the event
   */
  async getGroupNameByEventId(eventId: string):Promise<string[]> {
    try {
      // Retrieve the event details using NATS 
      const thisEvent = await this.natsMessengerService.send(
        'GET_EVENT_BY_ID',
        {params : {id: eventId}}
      )

      const groupNames: string[] = []
      // Iterate through the group IDs associated with the event
      for (const groupId of thisEvent.datas.groups) {
        // Retrieve the group details using the group ID
        const group = await this.getGroupById(groupId)
        // Push the retrieved group name to the array
        groupNames.push(group.name);
      
      }
      // Return an array containing the names of groups participating in the event
      return groupNames;
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  /**
   * Modification of a group by adding a user (type kid)
   * @param params - group ID 
   * @param body - user (type kid) ID  
   */
  async addKid(kidId: string, groupId: string) {
    try{
      // Retrieve the group by its ID
      const group = await this.groupModel.findById(groupId)
   
      // Check if the child is already in the group
      if (!group.users.includes(kidId)) {
        // Add the kid's ID to the list of users in the group
        group.users.push(kidId)
        // Save the updated group to the database
        await group.save()
      }
      // Return the updated group with the child added
      return group
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
   * Modification of a group by removing a user (type kid)
   * @param params - group ID 
   * @param body - user (type kid) ID  
   */
  async removeKid(groupId: string, kidId: string) {
 
    try {
      // Retrieve the group by its ID
      const updatedGroup = await this.groupModel.findById(groupId)
      
      // Check if the child is already in the group
      if (updatedGroup.users.includes(kidId)) {
        //Remove the kid's ID to the list of users in the group
        updatedGroup.users = updatedGroup.users.filter(userId => userId != kidId)
        // Save the updated group to the database
        await updatedGroup.save()
      }
      // Return the updated group with the child removed
      return updatedGroup
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

}
