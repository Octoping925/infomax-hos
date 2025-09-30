import { Test, TestingModule } from '@nestjs/testing';
import { LlmService } from './llm.service';
import { GeminiCaller } from './GeminiCaller';

describe('LlmService', () => {
  let service: LlmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmService, { provide: 'LlmCaller', useClass: GeminiCaller }],
    }).compile();

    service = module.get<LlmService>(LlmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
