import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FileDeletedListener {
  constructor(
    @Inject('NATS_SERVICE')
    private nats: ClientProxy,
  ) {}

  @OnEvent('file.deleted')
  handlefileDeletedEvent(event: any ): void {
    console.log("🚀 ~ file: fileDeleted.listener.ts:14 ~ FileDeletedListener ~ handlefileDeletedEvent ~ event", event)
    this.nats.emit(event.body.target, event);
  }
}
