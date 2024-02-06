import { Controller, NotFoundException, UseInterceptors, ValidationPipe } from '@nestjs/common'
import { RpcSuccessInterceptor } from 'src/Interceptor/RpcSuccessInterceptor'
import { ExchangeRequestDocument } from './Schema/exchangeRequest.schema'
import { ExchangeInterface, ResponseInterfaceError, ResponseInterfaceSuccess } from './interface/response.interface'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { RequestDocument } from './Schema/request.schema'
import { RequestService } from './request.service'
import { ExchangeDto } from './Dto/exchange.dto'
import { RequestDto } from './Dto/request.dto'
import { IdDto } from 'src/Event/Dto/id.dto'
import { NatsMessengerService } from '@app/nats-messenger/nats-messenger.service'
import { EventService } from 'src/Event/event.service'

// Controller responsible for handling API endpoints related to REQUESTS and EXCHANGES
@Controller()
@UseInterceptors(RpcSuccessInterceptor)
export class RequestController {

    constructor(
        private readonly requestService: RequestService,
        private readonly eventService: EventService,
        private readonly natsMessengerService: NatsMessengerService,
    ) { }

    /**
     * Retrieve a request through its ID 
     * @param params - IdDto -  User ID
     * GET - 'request/:id'
     */
    @MessagePattern('GET_REQUEST_BY_ID')
    async findRequestId(@Payload('params') params: IdDto):Promise<RequestDocument> {
        try {
            return await this.requestService.getRequestById(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve a request through its exchange ID 
     * @param params - IdDto -  exchange ID
     * GET - 'request/byExchange/:id'
     */
    @MessagePattern('GET_REQUEST_BY_EXCHANGE')
    async findRequestByExchangeId(@Payload('params', new ValidationPipe()) params: IdDto):Promise<RequestDocument> {
        try {
            return await this.requestService.getRequestByExchangeId(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    //TODO A VOIR SI ON GARDE 
    /**
     * Retrieve all requests on the app 
     * GET - 'requests'
     */
    @MessagePattern('INDEX_REQUESTS')
    async findAllRequests():Promise<RequestDocument[]>{
        try {
            return await this.requestService.getAllRequests()
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all requests from an user ID 
     * @param params - IdDto -  USER ID
     * GET - 'requests/user/:id'
     */
    @MessagePattern('REQUESTS_BY_USER_ID')
    // async findAllRequestUserId(@Payload('params', new ValidationPipe()) params: IdDto): Promise<RequestDocument[]> {
        async findAllRequestUserId(@Payload('params', new ValidationPipe()) params: IdDto): Promise<object> {
            try {
            // const response = await this.requestService.getRequestsByUserId(params.id)
            const response = await this.requestService.getRequestsByUserId(params.id)
            console.log("🚀 ~ file: request.controller.ts:74 ~ findAllRequestUserId ~ response:", response)
            if (!response) {
                throw new NotFoundException('No request found')
            }
            return response
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all requests an user has replied to (exchanges)
     * @param params - IdDto -  USER ID
     * GET - 'prefix requests/byExchange/ByUser/:id'
     */
    @MessagePattern('REQUESTS_BY_EXCHANGE_BY_USER')
    async findAllRequestsByExchangeMadeByUser(@Payload('params', new ValidationPipe()) params: IdDto): Promise<RequestDocument[]> {
        try {
            return await this.requestService.getAllRequestsByExchangeMadeByUser(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all requests published on an event 
     * @param params - IdDto -  event ID 
     * GET - 'requests/event/id '
     */
    @MessagePattern('REQUESTS_BY_EVENT')
    async findAllRequestsByEvents(@Payload('params', new ValidationPipe()) params: IdDto): Promise<RequestDocument[]> {
        try {
            return await this.requestService.getAllRequestsByEvent(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all requests published by association ID 
     * @param params - IdDto -  association ID 
     * GET - 'requests/asso/id'
     */
    @MessagePattern('REQUESTS_BY_ASSO')
    async findAllRequestsByAsso(@Payload('params', new ValidationPipe()) params: IdDto): Promise<RequestDocument[]> {
        try {
            return await this.requestService.getAllRequestsByAsso(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

        // TODO crée une requête qui permet de crée une nouvelle requests
        // TODO la faire dans  le fichier request.controller.ts ds le dossier ms-event-request-exchange

    /**
     * Modification of a request 
     * @param params - IdDto -  request ID  
     * @param body - RequestDto  
     * PUT - 'request/update/:id'
     */
    @MessagePattern('UPDATE_REQUEST')
    async updateRequest(
        @Payload('params', new ValidationPipe()) params: IdDto, 
        @Payload('body') body: RequestDto ):Promise<ResponseInterfaceError | ResponseInterfaceSuccess> {
        // console.log("🚀 ~ //findAllRequestUserId ~ params:", params)
        try {
            const request = await this.requestService.getRequestById(params.id)
            console.log("🚀 ~ @Payload ~ request:", request)
            // console.log("request.userId", request.userId);
            // nats ici me permet de faire appel à un controller d'au autre service
            const userRequestDetails = await this.natsMessengerService.send(
                'GET_USER_BY_ID',
                { params: { id: request.userId } }
            )
            console.log("🚀 ~ @Payload ~ userRequestDetails:", userRequestDetails)
            console.log("🚀 ~ @Payload ~ userRequestDetailsId:", userRequestDetails.datas._id)
            console.log("🚀 ~ @Payload ~ request:", request.userId)
                if(request.userId === userRequestDetails.datas._id) {
                    console.log('super super super');
                    
                    const requestEdit = await this.requestService.editRequest(params.id, body)
                    return {
                        success: true,
                        code: 200,
                        message: 'Update request successfull',
                        request: requestEdit,
                    }
                    
                } else {
                    console.log('no no no');

                    return {
                        success: false,
                        code: 401,
                        message: 'Unauthorized'
                    }
                }
                // { statusCode: 401, time: Date.now(), errors: { message: 'Unauthorized - Missing or wrong JsonWebToken', code: 'NJTW-G-01' }
        } catch (error) {
            // throw new NotFoundException(error)
            return {
                success: false,
                code: 401,
                message: 'Unauthorized'
            }

        }
    }

    /**
     * Create a new request from an event  
     * @param params - IdDto -  event ID  
     * @param body - RequestDto  
     * POST - 'request/create/:id '
     */
    @MessagePattern('CREATE_REQUEST')
    async createRequest(
        @Payload('params', new ValidationPipe()) params: IdDto, 
        // @Payload('body') body: RequestDto):Promise<ResponseInterfaceError | ResponseInterfaceSuccess> {
        @Payload('body') body: any):Promise<any> {
        console.log("🚀 ~ @Payload ~ body:", body)
        try {
            const event = await this.eventService.getEventById(params.id)
            console.log("🚀 ~ @Payload ~ event:", event)
            const userDetails = await this.natsMessengerService.send(
                'GET_USER_BY_ID',
                { params: { id: body.userId }}
              )
            console.log("🚀 ~ @Payload ~ userDetails:", userDetails)
      
            if(event) {
                // const user = await this.requestService.findUserByEventAndAssociation(event._id, event.association_id)
                if(userDetails) {

                    if(body.role !== 'admin') {
                        return {
                            success: true,
                            code: 401,
                            message: 'User not authorized',
                            internalCode: "EC-ME-01",
                            date: new Date()
                        }
    
                    } else {
                        const eventCreate = await this.requestService.createRequestEvent(body, params.id)
                        return {
                            success: true,
                            code: 201,
                            message: 'The request has been created',
                            request: eventCreate,
                            date: new Date()
                        }
    
                    }

    
                } else {
                    return {
                        success: false,
                        code: 401,
                        message: 'Unauthorized'
                    }
    
                }
            } else {
                return {
                    success: false,
                    code: 404,
                    message: 'Event not found'
                }
    
            }
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Delete a request 
     * @param params - IdDto -  request ID  
     * DELETE - 'request/delete/:id'
     */
    @MessagePattern('DELETE_REQUEST')
    async deleteRequest(
        @Payload('params', new ValidationPipe()) params: IdDto,
        @Payload('body') body: any):Promise<any> {
        console.log("🚀 ~ @Payload ~ body:", body)
        try {
            if(body.role !== 'admin') {
                return {
                    success: false,
                    code: 401,
                    message: 'User not authorized',
                    internalCode: "EC-ME-01",
                    date: new Date()
                }

            } else {
                const request = await this.requestService.deleteRequest(params.id)
                return {
                    success: true,
                    code: 201,
                    message: 'The request has been deleted',
                    request: request,
                    date: new Date()
                }

            }

            // console.log("🚀 ~ file: request.controller.ts:172 ~ deleteRequest ~ request:", request)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    //*************** EXCHANGE ****************//

    /**
     * Creation of an exchange on a request 
     * @param params - IdDto -  request ID 
     * @param body - exchangeDto  
     * POST - 'exchange/create/:id'
     */
    @MessagePattern('CREATE_EXCHANGE_TO_REQUEST_ID') 
    async newExchangeToRequest(
        @Payload('params', new ValidationPipe()) params: IdDto, 
        @Payload('body') body: ExchangeDto): Promise<ExchangeRequestDocument>
    {
        try {
            return this.requestService.createExchangeToRequest(params.id, body)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /***
     * Retrieve exchange by its id
     * @param params - IdDto -  request ID 
     * GET - 'exchange/:id'
     */
    @MessagePattern('EXCHANGE_REQUEST_BY_ID')
    async findEschangeById(@Payload('params', new ValidationPipe()) params: IdDto): Promise<ExchangeRequestDocument> {
        try {
            return  await this.requestService.getExchangeById(params.id)
        } catch (error) {
            throw new NotFoundException(error)

        }
    }


    /**
     * Retrieve all the exchanges made on an request 
     * @param params - IdDto -  request ID 
     * GET - 'exchange/byRequest/:id'
     */
    @MessagePattern('EXCHANGES_BY_REQUEST')
    async findAllExchangesByRequest(@Payload('params', new ValidationPipe()) params: IdDto): Promise<ExchangeRequestDocument[]> {
        try {
            return await this.requestService.getAllExchangesByRequest(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve all the exchanges made by a provided user 
     * @param params - IdDto -  userID 
     * GET - 'exchange/byUser/:id'
     */
    @MessagePattern('EXCHANGE_BY_USER')
    async findExchangeByUser(@Payload('params', new ValidationPipe()) params: IdDto) {;
        try {
            return await this.requestService.getExchangesByUser(params.id)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    //MODIFICATION D UNE EXCHANGE L UTILISATEUR QUI A PUBLIE LA REQUEST
    //L'utilisateur qui a publié une annonce a reçu une réponse et il peut y répondre 
    //POST : prefix: exchange/reply/:id
    /**
     * Modification of an exchange by the user whi posted it 
     * the user received an exchange and replies to it  
     * @param params - IdDto -  exchange ID 
     * @param body - ExchangeInterface  
     * POST - 'exchange/reply/:id'
     */
    @MessagePattern('REPLY_TO_EXCHANGE')
    async replyToExchangeReceived(
        @Payload('params', new ValidationPipe()) params: IdDto, /*EXCHANGE ID */
        @Payload('body') body: ExchangeInterface): Promise<ExchangeRequestDocument>
    {
        try {
            return await this.requestService.replyToExchangeReceived(params.id, body)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

}
