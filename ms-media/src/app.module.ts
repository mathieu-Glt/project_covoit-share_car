import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './files/files.module';
import { FilesService } from './files/files.service';
import { FileCreatedListener } from './listeners/fileCreated.listener';
import { FsUtil } from './utils/fs.util';
import { AvatarWorker } from './workers/avatar.worker';
import { ProductWorker } from './workers/product.worker';
import { FileDeletedListener } from './listeners/fileDeleted.listener';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClientsModule.register([
      {
        name: 'NATS_SERVICE', transport: Transport.NATS,
        options: {
          servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
        }
      },
    ]),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DNS),
    FilesModule,

  ],
  controllers: [],
  providers: [FileCreatedListener, FileDeletedListener, AvatarWorker, ProductWorker, FilesService,  FsUtil],
})
export class AppModule { }
