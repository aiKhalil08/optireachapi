import { Test, TestingModule } from '@nestjs/testing';
import { AgentsAccountController } from './agents-account.controller';

describe('AgentsAccountController', () => {
  let controller: AgentsAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentsAccountController],
    }).compile();

    controller = module.get<AgentsAccountController>(AgentsAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
