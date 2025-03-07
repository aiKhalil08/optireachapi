import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsOtpService } from './transactions-otp.service';

describe('TransactionsOtpService', () => {
  let service: TransactionsOtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsOtpService],
    }).compile();

    service = module.get<TransactionsOtpService>(TransactionsOtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
