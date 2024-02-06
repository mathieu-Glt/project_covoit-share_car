import { Expose } from 'class-transformer';
import sharp from 'sharp';

export class FileInfoInterface {

    @Expose()
    _id?: string;

    @Expose()
    length: number;

    @Expose()
    chunkSize: number;

    @Expose()
    filename: string;

    @Expose()
    contentType: string;

    @Expose()
    metadata: { 
            source?: 'ext';
            parent?: string;
            originalname?: string;
            personnalData?: boolean;
            resize?: {
                width: number;
                height: number;
                format: string;
                fit: sharp.FitEnum;
            }


    }
}