import { ExchangeInterface, RequestInterface } from './interface/response.interface'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ExchangeRequestDocument } from './Schema/exchangeRequest.schema'
import { NatsMessengerService } from '@app/nats-messenger'
import { RequestDocument } from './Schema/request.schema'
import { StatusRequestEnum } from './Enum/request.enum'
import { EventService } from 'src/Event/event.service'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as moment from 'moment'
import { ObjectId } from 'mongoose';

// Service responsible for managing operations related to REQUESTS/EXCHANGE
@Injectable()
export class RequestService {

  constructor(
    @InjectModel('Request')
    private requestModel: Model<RequestDocument>,
    @InjectModel('ExchangeRequest')
    private ExchangeModel: Model<ExchangeRequestDocument>,
    // @InjectModel('event')
    // private eventModel: Model<EventDocument>,
    private eventService: EventService,
    private readonly natsMessengerService: NatsMessengerService,
  ) { }

    /**
     * Retrieve an asso through its ID  
     * @param assoId - association ID 
     */
    async getAssoByID(assoId: string) {
        try {
        //fetch user's details with NATS 
        const association = await this.natsMessengerService.send(
            'GET_ASSOCIATION_BY_ID',
            { params: { id: assoId } }
        )
        return association;
        } catch (error) {
        throw new NotFoundException(error)
        }
    }


    /**
     * Retrieve a request through its ID  
     * @param requestId - request ID 
     */
    async getRequestById(requestId: string): Promise<RequestDocument> {
        try {
            return await this.requestModel.findById(requestId)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }


    /**
     * Retrieve all the requests of the app 
     */
    async getAllRequests(): Promise<RequestDocument[]> {
        try {
            return this.requestModel.find()
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all requests published on an event   
     * @param eventId - event id  
     */
    async getAllRequestsByEvent(eventId: string): Promise<RequestDocument[]> {
        try {
            return await this.requestModel.find({ event_id: eventId })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
    
    /**
     * Retrieve all exchanges by request 
     * @param requestId - request id  
     */
    async getAllExchangesByRequest(requestId: string) {
        try {
        // Get the request using its ID
        const thisRequest = await this.requestModel.findById(requestId)
        // Get the exchanges from the request
        const exchangesIds = thisRequest.exchanges

        const exchangesByReq = []

        // Loop through each exchange ID in the request
        for (const exchangesId of exchangesIds) {
            // Get the exchange using its ID
            const exchanges = await this.getExchangeById(exchangesId)
            // Get the user ID associated with the exchange
            const userIdExchanges = exchanges.user_id // array of  user ID
            // Get user exchange information using user ID
            const userExchangeDetails = await this.natsMessengerService.send(
                'GET_USER_BY_ID',
                { params: { id: userIdExchanges } }
            )
            // Create an object containing user and exchange information
            exchangesByReq.push({
                user: userExchangeDetails,
                exchange: exchanges,
                // association: associations
            })

            const asssociations = userExchangeDetails.datas.associations
            
            // Loop through each association ID in userExchange.datas.associations
            for (let i = 0; i < asssociations.length; i++) {
                const associationId = asssociations[i];
                // Get association information using association ID
                const associations = await this.getAssoByID(associationId)
                // Push association information to exchangesByReq
                exchangesByReq.push({
                    association: associations
                })
            }
        }
        // Return the array of exchange information
        return exchangesByReq
        } catch (error) {
        throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all requests published in an association
     * @param assoId - association id  
     */
    async getAllRequestsByAsso(assoId: string):Promise<RequestDocument[]> {
        try {
            // Get all users belonging to the association using its ID through NATS
            const usersByAsso = await this.natsMessengerService.send(
                'INDEX_USERS_PARENTS_BY_ASSO',
                { params: assoId }
            )

            // Extract user IDs from usersByAsso
            const userIds = usersByAsso.map(user => user._id)

            const requestsByAsso = []

            // Loop through each user ID
            for (const userId of userIds) {
                // Get requests by user ID
                const userRequests = await this.getRequestsByUserId(userId)

                if (userRequests) {
                    // Push user's requests to requestsByAsso
                    requestsByAsso.push(userRequests)
                }
            }
            // Return the array of requests
            return requestsByAsso

        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Search user with info event_id & asso_id
     * @param eventId - event id 
     * @param associationId - association id 
     */

    // async findUserByEventAndAssociation(eventId: string, associationId: string): Promise <void> {
    //     console.log("🚀 ~ RequestService ~ findUserByEventAndAssociation ~ eventId:", eventId)
    //     const event = await this.eventService.getEventById(eventId)
    //     const association = await this.natsMessengerService.send(
    //         'GET_ASSOCIATION_BY_ID',
    //         { params: { id: associationId } }
    //     )
    //     console.log("🚀 ~ RequestService ~ findUserByEventAndAssociation ~ association:", association)
    //     console.log("🚀 ~ RequestService ~ findUserByEventAndAssociation ~ event:", event)
    //     if(event && association) {
    //         const user = await this.userModel
    //     }
    // }
    /**
     * Create a new request from an event 
     * @param eventId - event id  
     * @param data - RequestInterface
     */
    async createRequestEvent(data: RequestInterface, eventId: string): Promise<RequestDocument> {
        try {
            // Check if the event exists
            const eventExists = await this.eventService.getEventById(eventId)

            if (!eventExists) { throw new BadRequestException('Event does not exist') }

            // Convert the departure_time string to a Date object using moment.js
            const departureTime = moment(data.departure_time, 'YYYY-MM-DD [à] HH:mm').toDate()

            // Ensure that the departure time is in the future
            if (departureTime <= new Date()) {throw new Error('The departure time must be in the future') }

            // Create a new request object with modified data
            const newBody = {
                ...data,
                departure_time: data.departure_time,
                event_id: eventId.toString(),
            }
            const newRequest = new this.requestModel(newBody)
            // Save the new request to the database
            return newRequest.save()

        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Modify an existing request 
     * @param requestId - request id  
     * @param body - RequestInterface
     */ 
    async editRequest(requestId: string, body: RequestInterface): Promise<RequestDocument> {
        try {
            return await this.requestModel.findByIdAndUpdate(
                requestId,
                body,
                { new: true }
            )
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Delete an existing request 
     * @param requestId - request id  
     */ 
    async deleteRequest(requestId: string): Promise<RequestDocument> {
        try {
            return this.requestModel.findByIdAndRemove(requestId)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all requests published by an user 
     * @param userId - user id  
     */ 
    async getRequestsByUserId(userId: string): Promise<RequestDocument[]> {
        try {
            return this.requestModel.find({ userId })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all the requests of an user
     * @param userId - user id 
     */

    async findRequestRelatedToUserForEvent(userId: string): Promise<object> {
        console.log("🚀 ~ RequestService ~ findRequestRelatedToUserForEvent ~ userId:", userId)
        // const results = await this.requestModel.find({ userId: userId })
        // console.log("🚀 ~ file: request.service.ts:246 ~ RequestService ~ findRequestRelatedToUserForEvent ~ results:", results)
        try {
           const requests = await this.requestModel.aggregate([
            {
                $match: { userId: userId } // $match: This stage filters the documents in the requestModel collection to find documents where the userId matches the provided userId.
            },
            {
                $addFields: {
                    convertedEventId: { $toObjectId: "$eventId" } // This stage adds a new field called convertedEventId to the documents, which is created by converting the eventId field to an ObjectId. This is typically used to perform a lookup on the event collection.
                }
            },
            {
                $lookup: {
                    from: 'event',
                    localField: 'convertedEventId', //  This stage performs a lookup operation to retrieve documents from the event collection. It matches the convertedEventId field from the requestModel with the _id field in the event collection and stores the results in an array called 'event'.
                    foreignField: '_id',
                    as: 'event'
                }
            },
            {
                $unwind: '$event' // This stage deconstructs the 'event' array, effectively flattening it into individual documents.
            }
           ]) 
           console.log("🚀 ~ file: request.service.ts:251 ~ RequestService ~ findRequestRelatedToUserForEvent ~ requests:", requests)
           return requests;
        } catch (error) {
            console.log("🚀 ~ file: request.service.ts:252 ~ RequestService ~ findRequestRelatedToUserForEvent ~ error:", error)
            
        }
    }

    /**
     * Retrieve all requests a specific user has replied to (exchange)
     * @param userId - user id  
     */   
    async getAllRequestsByExchangeMadeByUser(userId: string) {
        try {
            // Retrieve all exchanges made by the user 
            const exchangeList = await this.ExchangeModel.find({ userId })
            // Extract exchange IDs from the list of exchanges
            const exchangeIds: string[] = exchangeList.map((exchange: ExchangeRequestDocument) => exchange._id.toString());

            const requestsByExchange = []

            // For each exchange, find the associated requests
            for (const exchangeId of exchangeIds) {
                // Find requests that have the current exchange's ID in their exchanges array
                const userRequest = await this.requestModel.find({
                    exchanges: [{ _id: exchangeId }]
                })
                // if any requests found, push them in the empty array 
                if (userRequest) { 
                    requestsByExchange.push(userRequest) 
                }
            }
            return requestsByExchange
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

  //*************** EXCHANGE ****************//

    /**
     * Retrieve an exchange by its ID 
     * @param exchangeId - exchange ID 
     */ 
    async getExchangeById(exchangeId: string): Promise<ExchangeRequestDocument> {
        try {
            return await this.ExchangeModel.findById(exchangeId)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Create an exchange on a request already published  
     * @param requestId - request ID 
     * @param body - ExchangeInterface 
     */ 
    async createExchangeToRequest(requestId: string, body: ExchangeInterface) {
        try {
            // Create a new exchange
            const newExchange = await this.ExchangeModel.create({
                user_id: body.user_id, // ID of the user responding to the request 
                status: StatusRequestEnum.pending // default status : pending 
            })

            // Retrieve the request using the provided request ID
            const thisRequest = await this.requestModel.findById(requestId)
            // Add the ID of the new exchange to the exchanges array of the request
            if (thisRequest) { thisRequest.exchanges.push(newExchange.id) }

            // Update the request to include the new exchange in its exchanges array
            await this.requestModel.findByIdAndUpdate(requestId, { exchanges: thisRequest.exchanges })

            // Retrieve the ID of the user who published the request
            const publisherUser = await this.natsMessengerService.send(
                'GET_USER_BY_ID',
                {
                    params: { id: thisRequest.userId } // user ID 
                }
            )

            // Send an email to the user who published the request
            // to inform them that someone is interested in their request 
            await this.natsMessengerService.emitEmailResponseToRequest(publisherUser.datas.email, requestId)

            return newExchange

        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Modify an exchange on a request already published  
     * @param requestId - request ID 
     * @param exchanges: ExchangeRequestDocument[] 
     */ 
    async editExchanges(requestId: string, exchanges: ExchangeRequestDocument[]): Promise<void> {
        try {
            const updatedRequest = await this.requestModel.findByIdAndUpdate(
                requestId,
                exchanges,
                { new: true }
            )

            if (!updatedRequest) {
                throw new NotFoundException('No request found')
            }
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all exchanges published by an user  
     * @param userId -User ID 
     */ 
    async getExchangesByUser(userId: string): Promise<ExchangeRequestDocument[]> {
        try {
            return await this.ExchangeModel.find({ userId })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Response of an exchange request 
     * Modification of an exchange  
     * @param exchangeId - exchange ID 
     * @param body ExchangeInterface 
     */ 
    async replyToExchangeReceived(exchangeId: string, body: ExchangeInterface): Promise<ExchangeRequestDocument> {
        try {
            //Modify the status of the exchange 
            const exchangedModified = await this.ExchangeModel.findByIdAndUpdate(exchangeId, { status: body.status })

            //retrive the email address of the user who responded to the request 
            const email = await this.natsMessengerService.send(
                'GET_USER_BY_ID',
                {
                    params: { id: exchangedModified.user_id } 
                }
            )

        //retrieve the request under which the exchange was made 
        const request = await this.getRequestByExchangeId(exchangeId)

        // send an email to the person who replied to the request in order to ask them to go check on the app 
        if (exchangedModified) await this.natsMessengerService.emitEmailReplyToExchangeReceived(email, request.id)
        return exchangedModified
        } catch (error) {
        throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve a request by the id of the exchange   
     * @param exchangeId - exchange ID 
     */ 
    async getRequestByExchangeId(exchangeId: string): Promise<RequestDocument> {
        try {
            const [request] = await this.requestModel.find({
                exchanges: exchangeId
            })
            return request
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

}