import { Injectable } from '@nestjs/common';


@Injectable()
export class FormatterUtil {
    constructor() {}


    getOrigin(file:any) {
        return {
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            id: file.id,
            filename: file.filename,
            metadata: file.metadata,
            bucketName: file.bucketName,
            chunkSize: file.chunkSize,
            size: file.size,
            uploadDate: file.uploadDate,
            contentType: file.contentType,
        }
    }
}