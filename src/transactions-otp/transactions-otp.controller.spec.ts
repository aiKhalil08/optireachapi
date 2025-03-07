import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsOtpController } from './transactions-otp.controller';

describe('TransactionsOtpController', () => {
  let controller: TransactionsOtpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsOtpController],
    }).compile();

    controller = module.get<TransactionsOtpController>(TransactionsOtpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
