import { Controller, NotFoundException, UseInterceptors, ValidationPipe } from '@nestjs/common'
import { RpcSuccessInterceptor } from 'src/Interceptor/RpcSuccessInterceptor';
import { AssociationDocument } from './Schema/association.schema';
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AssociationService } from './association.service';
import { AssociationDTO } from './Dto/association.dto';
import { NameDto } from './Dto/name.dto';
import { IdDto } from './Dto/id.dto';

//Controller responsible for managing API endpoints related to ASSOCIATIONS 
@Controller()
@UseInterceptors(RpcSuccessInterceptor)
export class AssociationController {
    constructor(
        private readonly associationService: AssociationService,
        ) {}
    
    /**
     * Retrieve an association with its ID 
     * @param params - IdDTO - association ID 
     * GET - 'association/:id'
     */
    @MessagePattern('GET_ASSOCIATION_BY_ID')
    async findAssoByID(@Payload('params', new ValidationPipe()) params: IdDto): Promise<AssociationDocument> {
        try {
            return await this.associationService.getAssoByID(params.id)
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Retrieve an association with its name
     * @param params - nameDTO - association name 
     * GET - 'association/ByName/:name'
     */
    @MessagePattern('GET_ASSOCIATION_BY_NAME')
    async findAssoByName(@Payload('params', new ValidationPipe()) params: NameDto): Promise<AssociationDocument> {
        try {
            return await this.associationService.getOneAssoByName(params.name);
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Retrieve all associations from the application 
     * GET - 'associations'
     */
    @MessagePattern('INDEX_ASSOCIATIONS')
    async findAllAsso(): Promise<AssociationDocument[]> {
        try {
        return await this.associationService.getAllAssociations();
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Récupération des associations dont fait partie un utilisateur
     * @param params - IdDto - ID de l'utilisateur
     * Methode GET - 'asso/user/:id
     */
    @MessagePattern('INDEX_ASSO_BY_USER')
    async assoByUser(@Payload('params') params: IdDto):Promise<object> {
        try {
           const assos = await this.associationService.getAssosByUser(params.id)
           console.log("🚀 ~ file: association.controller.ts:68 ~ AssociationController ~ assoByUser ~ assos:", assos)
           return assos;
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Fetch associations where the user provided has a USER role 
     * @param params - IdDto - user ID 
     * GET - 'asso/role/user/:id'
     */
    @MessagePattern('INDEX_ASSO_BY_ROLE_USER')
    async assoByRoleUser(@Payload('params', new ValidationPipe()) params: IdDto):Promise<AssociationDocument[]> {
        try {
           return await this.associationService.getAssosByRoleUser(params.id)
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Fetch associations where the user provided has an ADMIN role
     * @param params - IdDto - user ID 
     * GET - 'asso/role/admin/:id'
     */    
    @MessagePattern('INDEX_ASSO_BY_ROLE_ADMIN')
    async assoByRoleAdmin(@Payload('params', new ValidationPipe()) params: IdDto) :Promise<AssociationDocument[]>{
        try {
           return await this.associationService.getAssosByRoleAdmin(params.id)
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Creation of a new association by user ID 
     * @param params - IdDto - user ID  
     * POST - 'association/create/byUser/:id'
     */   
    @MessagePattern('CREATE_ASSOCIATION')
    async createAssociation(
        @Payload('body', new ValidationPipe()) body: AssociationDTO,
        @Payload('params', new ValidationPipe()) params: IdDto): Promise<AssociationDocument> { 

        try {
            return await this.associationService.createAssociation(body, params.id);
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }
        
    /**
     * Modification of an association
     * @param params - IdDto - association ID 
     * Methode PUT - 'asso/update/:id'
     */ 
    @MessagePattern('UPDATE_ASSOCIATION')
    async updateAssociation(
        @Payload('params', new ValidationPipe()) params: IdDto, 
        @Payload('body', new ValidationPipe()) body: AssociationDTO
        ): Promise<AssociationDocument> {
        try {
            return await this.associationService.associationEdit(params.id, body);
        } catch (error) {
            throw new NotFoundException(error) 
        }    
    }

    /**
     * Delete an association 
     * @param params - IdDto - association ID 
     * DELETE - 'asso/delete/:id'
     */  
    @MessagePattern('DELETE_ASSOCIATION')
    async deleteAssociation(@Payload('params', new ValidationPipe()) params: IdDto):Promise<void> {
        try {
            await this.associationService.associationDelete(params.id);
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

}

