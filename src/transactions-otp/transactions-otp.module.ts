import { Module } from '@nestjs/common';
import { TransactionsOtpController } from './transactions-otp.controller';
import { TransactionsOtpService } from './transactions-otp.service';

@Module({
  controllers: [TransactionsOtpController],
  providers: [TransactionsOtpService]
})
export class TransactionsOtpModule {}
