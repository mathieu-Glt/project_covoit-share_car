import { Controller, NotFoundException, Req, UseInterceptors, ValidationPipe } from '@nestjs/common'
import { RpcSuccessInterceptor } from 'src/Interceptor/RpcSuccessInterceptor'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { EventDocument } from './Schema/event.schema';
import { EventService } from './event.service'
import { EventDto } from './Dto/event.dto'
import { IdDto } from './Dto/id.dto'
import { FastifyRequest } from 'fastify';
// Controller responsible for handling API endpoints related to EVENTS
@Controller()
@UseInterceptors(RpcSuccessInterceptor)
export class EventController {

    constructor(
        private readonly eventService: EventService) { }

    /**
     * Retrieve an event through its ID 
     * @param params - IdDto -  User ID
     * GET - 'event/:id'
     */
    @MessagePattern('GET_EVENT_BY_ID')
    async findEventId(@Payload('params', new ValidationPipe()) params: IdDto):Promise<EventDocument> {
        try {
            return await this.eventService.getEventById(params.id)          
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    //TODO / DECIDER SI ON GARDE CETTE ROUTE 
    /**
     * Retrieve the list of all events on the app 
     * GET - 'events'
     */
    @MessagePattern('INDEX_EVENTS')
    async findAllEvents():Promise<EventDocument[]> {
       try {
        return await this.eventService.getAllEvents();
       } catch (error) {
        throw new NotFoundException(error) 
       }
    }

    /**
     * Retrieve all the events of a group 
     * @param params - IdDto -  group ID  
     * GET - 'events/byGroup/:id'
     */
    @MessagePattern('INDEX_EVENTS_BY_GROUP')
    async findAllEventsByGroup(@Payload('params', new ValidationPipe()) params: IdDto):Promise<EventDocument[]> {
       try {
        return await this.eventService.getAllEventsByGroup(params.id);
       } catch (error) {
        throw new NotFoundException(error) 
       }
    }

    /**
     * Retrieve all the events of an association 
     * @param params - IdDto -  association ID 
     * GET - 'events/byAsso/:id'
     */
    @MessagePattern('INDEX_EVENTS_BY_ASSO')
    async findAllEventsByAsso(@Payload('params', new ValidationPipe()) params: IdDto):Promise<EventDocument | EventDocument[]> {
       try {
        const events =  await this.eventService.getAllEventsByAsso(params.id);
        console.log("🚀 ~ file: event.controller.ts:68 ~ EventController ~ findAllEventsByAsso ~ events:", events)
        if(events) {
            return events
        }
       } catch (error) {
        throw new NotFoundException(error) 
       }
    }

    /**
     * Retrieve all the events an user is part of
     * @param params - IdDto -  user ID 
     * GET - 'events/byUser/:id'
     */
    @MessagePattern('INDEX_EVENTS_BY_USER')
    async findAllEventsByUser(@Payload('params', new ValidationPipe()) params: IdDto):Promise<EventDocument[]> {
       try {
        return await this.eventService.getAllEventsByUser(params.id);
       } catch (error) {
        throw new NotFoundException(error) 
       }
    }

    /**
     * Modification of an event 
     * @param params - IdDto -  event ID 
     * @body EventDto 
     * PUT - 'event/update/:id'
     */
    @MessagePattern('UPDATE_EVENT')
    async updateEventEdit(
        @Payload('params', new ValidationPipe()) params: IdDto, 
        @Payload('body') body: EventDto):Promise<EventDocument> {
            
        try {
            return await this.eventService.eventEdit(params.id, body)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Creation of an event 
     * @body EventDto 
     * POST - 'event/create'
     */
    @MessagePattern('CREATE_EVENT')
    async createEvent(@Payload('body') body: EventDto):Promise<EventDocument> {
        try {
            return await this.eventService.createEvent(body)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Delete an event 
     * @param IdDto - Event ID 
     * DELETE - 'event/delete/:id'
     */
    @MessagePattern('DELETE_EVENT')
    async deleteEvent(@Payload('params') params: IdDto): Promise<void> {
        try {
            await this.eventService.deleteEvent(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

}