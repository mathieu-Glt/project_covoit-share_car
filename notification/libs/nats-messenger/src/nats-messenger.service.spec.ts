import { Test, TestingModule } from '@nestjs/testing';
import { NatsMessengerService } from './nats-messenger.service';

describe('NatsMessengerService', () => {
  let service: NatsMessengerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NatsMessengerService],
    }).compile();

    service = module.get<NatsMessengerService>(NatsMessengerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
