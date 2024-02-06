import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { AssociationService } from 'src/Association/association.service'
import { RelationInterface } from './interface/relation.interface'
import { RelationDocument } from './Schema/relation.schema'
import { LinkRelationEnum } from './Enum/relation.enum'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

/// Service responsible for managing operations related to RELATIONS
@Injectable()
export class RelationService {
    constructor(
        @InjectModel('Relations')
        private relationModel: Model<RelationDocument>,
        @Inject(forwardRef(() => AssociationService))
        private assoService: AssociationService
    ) {}

    /**
     * Creation of a new relation 
     * @param body - RelationInterface 
     */
    async createRelation(body: RelationInterface):Promise<RelationDocument> {
        try {
            // Check if the association exists
            const assoExists = await this.assoService.getAssoByID(body.asso_id)

            if(!assoExists) throw new BadRequestException('Association does not exist')
            //return the new relation created 
            return await this.relationModel.create({...body})
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve relations by user ID 
     * @param param - user ID  
     */
    async getRelationsByUserId(fromRefUserId: string): Promise<RelationDocument[]> {
        try {
            return await this.relationModel.find({fromRef_id : fromRefUserId})
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Retrieve the list of relations by asso ID
     * @param param - association ID 
     */
    async getAllRelationsByAsso(assoId: string): Promise<RelationDocument[]> {
        try {
            return this.relationModel.find({asso_id: assoId})
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Retrieve a relation by its ID 
     * @param param - relation ID 
     */
    async getRelationById(relationId: string): Promise<RelationDocument>{
        try {
            return await this.relationModel.findById(relationId)
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }

    /**
     * Modification od a relation 
     * @param param - relation ID 
     * @param body - RelationInterface 
     */
    async updateRelation(relationId: string, body: RelationInterface): Promise<RelationDocument> {
        try {
            return await this.relationModel.findByIdAndUpdate(
                relationId, 
                body,
                {new : true}
                )
        } catch (error) {
            throw new NotFoundException(error) 
        }
    }


    /**
     * Delete a relation 
     * @param param - relation ID 
     */
    async deleteRelation(relationId: string): Promise<RelationDocument> {
        try {
            return this.relationModel.findByIdAndDelete(relationId)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Retrieve parents from a userKid ID
     * @param param - array of user (type kid)
     */
    async fetchParentFromKidRelation(kidsIds: string[]): Promise<string[]> {
        try {
            // Check if kidsIds is not an array, and if so, throw an error
            if (!Array.isArray(kidsIds)) {
                throw new Error('kidsIds should be an array')
            }
            // Use Promise.all to concurrently process queries for each kidId
            const parents = await Promise.all(
                // The map function generates an array of promises, each resolving to an array of related relations
                kidsIds.map((kidId) =>
                    this.relationModel
                        // Each promise performs a query to find relations
                        // where the kidId is the 'fromRef_id' and the link is 'kid'
                        .find({
                            fromRef_id: kidId,
                            link: LinkRelationEnum.kid
                        })
                        // 'select' is used to project only the 'toRef_id' field
                        .select('toRef_id')
                        // 'distinct' ensures that only unique 'toRef_id' values are retrieved
                        .distinct('toRef_id')
                )
            )
            // Flatten the array of arrays containing 'toRef_id' values into a single array of parent IDs
            // This is done using the 'flatMap' function
            // The result is an array of parent IDs corresponding to the kid IDs provided
            return parents.flatMap((id) => id)

        } catch (error) {
            throw new NotFoundException(error)
        }
    }
}
