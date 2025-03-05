import { Test, TestingModule } from '@nestjs/testing';
import { AgentsAccountService } from './agents-account.service';

describe('AgentsAccountService', () => {
  let service: AgentsAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentsAccountService],
    }).compile();

    service = module.get<AgentsAccountService>(AgentsAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
