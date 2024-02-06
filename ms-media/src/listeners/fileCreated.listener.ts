import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';
import { FileInfoInterface } from 'src/files/interfaces/fileInfo.interface';
import { AvatarWorker } from 'src/workers/avatar.worker';
import { ProductWorker } from 'src/workers/product.worker';



@Injectable()
export class FileCreatedListener {
    constructor(
        private avatarWorker: AvatarWorker,
        private productWorker: ProductWorker,

        @Inject('NATS_SERVICE')
        private nats: ClientProxy,
    ) { }

    @OnEvent('file.created')
    async handlefileCreatedEvent(event: any): Promise<FileInfoInterface[]> {
        let medias: FileInfoInterface[];
        switch (event.body.target) {
            case 'PROFILE_PICS':
                medias = await this.avatarWorker.proceed(event);
                this.nats.emit(event.body.target, { medias: JSON.stringify(medias), targetId: event.body.targetId });
                return medias;
            case 'EVENT_PICS':
                medias = await this.productWorker.proceed(event);
                this.nats.emit(event.body.target, { medias: JSON.stringify(medias), targetId: event.body.targetId });
                return medias;
        }

    }
}