import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { streamToBuffer } from '@jorgeferrero/stream-to-buffer';
import * as sharp from 'sharp';
import { Readable } from 'stream';


@Injectable()
export class ProductWorker {

    resizes = [
        /* { 
            width: 40, 
            height: 40,
            name: "mini",
            fit: 'cover',
        }, */
        {
            width: 150,
            height: 150,
            name: "product",
            fit: 'cover',
        }
    ]

    resized = [];

    constructor(private filesService: FilesService) { }

    async proceed(event: any) {
        this.resized = [];
        const response = await Promise.all(
            this.resizes.map(async (resize) => {
                const buffer = await this.resizeEvent(resize, event.file.id);
                return await this.filesService.writeFileStream(
                    Readable.from(buffer),
                    this.getPayload(
                        this.getFilename(resize),
                        event.file.id,
                        resize
                    )
                );
            })
        )

        const originFile = await this.filesService.findInfo(event.file.id);
        return [originFile].concat(response as any[]);
    }


    getPayload(filenameResize: string,parentId: string, resize: any ) {
        return {
            filename: filenameResize,
            metadata: {
                parent: parentId,
                resize: {
                    width: resize.width,
                    height: resize.height,
                    format: 'jpeg',
                    name: resize.name,
                    fit: resize.fit
                }
            }
        };
    }

    getFilename(resize: any): string {
        return `${resize.name}_${resize.width}x${resize.height != null ? resize.height : 'auto'}_${Date.now()}.jpeg`;
    }

    async resizeEvent(resize: any, fileId: string): Promise<Buffer> {
        return await sharp(await streamToBuffer(await this.filesService.readStream(fileId)))
            .resize(resize.width, resize.height, {
                fit: resize.fit
            })
            .jpeg({quality:70 })
            .toBuffer();
    }
}