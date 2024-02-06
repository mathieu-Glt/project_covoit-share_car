import { Injectable, NotFoundException } from '@nestjs/common'
import { EventInterface } from 'src/Event/interface/event.interface'
import { NatsMessengerService } from '@app/nats-messenger'
import { EventDocument } from './Schema/event.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Service responsible for managing operations related to EVENTS
@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name)
        private eventModel: Model<EventDocument>,
        private readonly natsMessengerService: NatsMessengerService,
    ) { }

    /**
     * Retrieve an event through its ID  
     * @param eventId - event ID 
     */
    async getEventById(eventId: string): Promise<EventDocument> {
        try {
            return await this.eventModel.findById(eventId)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve an event through its name  
     * @param name - event name 
     */
    async getEventByName(name: string): Promise<EventDocument> {
        try {
            return await this.eventModel.findOne({ name })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all events an user is part of  
     * @param userId - user Id
     */
    async getAllEventsByUser(userId: string): Promise<EventDocument[]> {
        try {
            const userDetails = await this.natsMessengerService.send(
                'GET_USER_BY_ID',
                userId
            )
            return await this.getAllEventsByGroup(userDetails.group_id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
      
    /**
     * Retrieve all events
     */
    async getAllEvents(): Promise<EventDocument[]> {
        try {
            return this.eventModel.find()
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all events of a group
     * @param groupId - group Id
     */ 
    async getAllEventsByGroup(groupId: string): Promise<EventDocument[]> {
        try {
            return this.eventModel.find({ groups : [groupId]})
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all events of an association
     * @param assoId - association Id
     */ 
    async getAllEventsByAsso(assoId: string): Promise<EventDocument[]> {
        try {
            const events = await this.eventModel.find({ association_id : [assoId]})
            console.log("🚀 ~ file: event.service.ts:87 ~ EventService ~ getAllEventsByAsso ~ events:", events)
            return events;
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Creation of a new event 
     * @param event - EventInterface 
     */ 
    async createEvent(event: EventInterface): Promise<EventDocument> {
        try {
            return await this.eventModel.create({...event})
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Modification of a new event 
     * @param eventId - event ID 
     * @body EventInterface 
     */ 
    async eventEdit(eventId: string, body: EventInterface): Promise<EventDocument> {
        try {
            // Get the current event without making any changes
            const oldEvent = await this.eventModel.findById(eventId)
            
            if (!oldEvent) { throw new NotFoundException('Event not found') }

            // Update the event with the new data
            const updatedEvent = await this.eventModel.findByIdAndUpdate(
                eventId,
                body,
                { new: true } // Returns the updated event
            )
        
            if (!updatedEvent) { throw new NotFoundException('Event not found') }

            // Determine the new groups and old groups
            const oldGroups = oldEvent.groups
            const newGroups = updatedEvent.groups;

            // Find the added groups (groups in newGroups but not in oldGroups)
            const addedGroups = newGroups.filter(group => !oldGroups.includes(group));

            // If there are added groups, send email notifications to parents
            if (addedGroups) {
                for (const eachNewGroupId of addedGroups) {
                await this.natsMessengerService.emit('EMAIL_TO_INDEX_USERS_NEW_GROUP',
                    { id: eachNewGroupId }
                )
                }
            }

            // Get the list of participating groups in the event
            const groupsList = updatedEvent.groups

                // For each group, send email notifications to parents 
                for (const eachGroupId of groupsList ) {
                await this.natsMessengerService.emit(
                    'EMAIL_TO_INDEX_USERS_BY_GROUP',
                    {id : eachGroupId}
                )
                }
            // Return the updated event    
            return updatedEvent
        } catch (error) {
        throw new NotFoundException(error)
        }
    }

    /**
     * Delete an event
     * @param eventId - event ID 
     */  
    async deleteEvent(eventId: string): Promise<void> {
        try {
            return this.eventModel.findByIdAndRemove(eventId)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
}