import { Controller, NotFoundException, UseInterceptors, ValidationPipe } from '@nestjs/common'
import { RpcSuccessInterceptor } from 'src/Interceptor/RpcSuccessInterceptor'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { RelationDocument } from './Schema/relation.schema'
import { RelationService } from './relation.service'
import { IdDto } from 'src/Association/Dto/id.dto'
import { RelationDTO } from './Dto/relation.dto'

// Controller responsible for handling API endpoints related to RELATION 
@Controller()
@UseInterceptors(RpcSuccessInterceptor)
export class RelationController {
  constructor(
    private readonly relationService: RelationService
    ) {}

  /**
   *  Create a new relation
   * @param body - RelationDTO - data of the relation to create.
   * POST - 'relation/create'
   */
  @MessagePattern('CREATE_RELATION')
  async createNewRelation(@Payload() body: RelationDTO):Promise<RelationDocument> {
    try {
      return await this.relationService.createRelation(body);
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  /**
   * Retrieve relations by user ID
   * @param params - user ID
   * GET - 'relation/ByUser/:UserID'
   */
  @MessagePattern('GET_RELATION_BY_USER')
  async findRelativesByUser(@Payload('params', new ValidationPipe()) params: IdDto): Promise<RelationDocument[]> {
    try {
      return await this.relationService.getRelationsByUserId(params.id)
    } catch (error) {
      throw new NotFoundException(error) 
    }
  }

  /**
   * Retrieve all relations by association ID.
   * @param params - association ID 
   * GET - 'relations/ByAsso/:id'
   */
  @MessagePattern('INDEX_RELATIONS_BY_ASSO')
  async findAllRelations(@Payload('params', new ValidationPipe()) params: IdDto):Promise<RelationDocument[]> {
    try {
      return this.relationService.getAllRelationsByAsso(params.id);
    } catch (error) {
      throw new NotFoundException(error) 
    }
  }

  /**
   * Retrieve a relation by its ID.
   * @param params - Relation ID.
   * Methode : GET - prefix : 'relation/:id'
   */
  @MessagePattern('GET_RELATION_BY_ID')
  async findRelationById(@Payload('params', new ValidationPipe()) params: IdDto):Promise<RelationDocument> {
    try {
      return await this.relationService.getRelationById(params.id)
    } catch (error) {
      throw new NotFoundException(error) 
    }
  }

  /**
   * Update a relation.
   * @param params - relation ID 
   * @param body - RelationDTO
   * PUT - 'relation/update/:id'
   */
  @MessagePattern('UPDATE_RELATION')
  async updateRelation(
    @Payload('params', new ValidationPipe()) params: IdDto,
    @Payload('body') body: RelationDTO
  ):Promise<RelationDocument> {
    try {
      return await this.relationService.updateRelation(params.id, body)
    } catch (error) {
      throw new NotFoundException(error) 
    }
  }

  /**
   * Delete a relation.
   * @param params - Relation ID
   * DELETE - 'relation/delete/:id'
   */
  @MessagePattern('DELETE_RELATION')
  async deleteRelation(@Payload('params', new ValidationPipe()) params: IdDto): Promise<RelationDocument> {
    try {
      return await this.relationService.deleteRelation(params.id)
    } catch (error) {
      throw new NotFoundException(error) 
    }
  }

  /**
   * Retrieve parents from child relations.
   * @param KidArray - An array of child IDs.
   * Command through NATS only
   */
  @MessagePattern('FETCH_TOREF_LINK_KID')
  async fetchParentFromKidRelation(KidArray: string[]): Promise<string[]> {
    try {
      return await this.relationService.fetchParentFromKidRelation(KidArray)
    } catch (error) {
      throw new NotFoundException(error) 
    }
  }
}
