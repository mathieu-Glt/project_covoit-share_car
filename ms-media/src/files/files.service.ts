import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { GridFSBucketReadStream } from 'mongodb';
import mongoose, { Connection, connection as mongooseConnection } from 'mongoose';
import { FileInfoInterface } from './interfaces/fileInfo.interface';
import { MongoGridFS } from "../utils/mongo-gridfs.util";
import { deleteFileInterface } from './interfaces/deleteFile.interface';

@Injectable()
export class FilesService {
    private fileModel: MongoGridFS;

    constructor(@InjectConnection() private readonly connection: Connection) {
        // @ts-ignore
        this.fileModel = new MongoGridFS(this.connection.db, 'fs');
    }

    async readStream(id: string): Promise<GridFSBucketReadStream> {
        // @ts-ignore
        return await this.fileModel.readFileStream(id);
    }
    async writeFileStream(stream, payload) {
        return await this.fileModel.writeFileStream(stream, payload)
    }

    async uploadFile(path: string, options: any, deleteFile = true) {
        return this.fileModel.uploadFile(path, options, deleteFile);
    }

    async findInfo(id: string): Promise<FileInfoInterface> {
        const result = await this.fileModel
            .findById(id).catch(err => { throw new HttpException('File not found', HttpStatus.NOT_FOUND) })
            .then(result => result)

        return {
            _id: result._id.toString(),
            filename: result.filename,
            length: result.length,
            chunkSize: result.chunkSize,
            contentType: result.contentType,
            metadata: result.metadata
        }
    }


    async findInfoByFileName(filename: string): Promise<FileInfoInterface> {
        const result = await this.fileModel
            .findOne({ filename }).catch(err => { throw new HttpException('File not found', HttpStatus.NOT_FOUND) })
            .then(result => result)

        return {
            _id: result._id.toString(),
            filename: result.filename,
            length: result.length,
            chunkSize: result.chunkSize,
            contentType: result.contentType,
            metadata: result.metadata
        }
    }

    async findChildFilesFromParent(id: string): Promise<any[]> {
        try {
            return await this.fileModel.find({ 'metadata.parent': new mongoose.Types.ObjectId(id) })
        } catch (error) {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND)

        }
    }

    async deleteFile(id: string, parent = false): Promise<boolean> {
        try {
            if (parent == true ) {
                const childs = await this.findChildFilesFromParent(id);
                for (const child of childs) {
                    this.fileModel.delete(child._id as string)
                }
            }
            await this.fileModel.delete(id)
            return true
        } catch (error) {
            console.log(error)
            throw new HttpException('File not found', HttpStatus.NOT_FOUND)
        }
    }
}