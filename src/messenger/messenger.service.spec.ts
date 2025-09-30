import { Test, TestingModule } from '@nestjs/testing';
import { MessengerService } from './messenger.service';
import { LlmModule } from 'src/llm/llm.module';

describe('MessengerService', () => {
  let service: MessengerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessengerService],
      imports: [LlmModule],
    }).compile();

    service = module.get<MessengerService>(MessengerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
