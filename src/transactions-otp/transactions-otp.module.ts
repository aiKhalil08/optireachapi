import { Module } from '@nestjs/common';
import { TransactionsOtpController } from './transactions-otp.controller';
import { TransactionsOtpService } from './transactions-otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionOtp } from './entity/create-transactions-otp.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Account } from 'src/accounts/entities/account.entity';

@Module({
  imports: [
          TypeOrmModule.forFeature([Customer,TransactionOtp, Account])
      ],
  controllers: [TransactionsOtpController],
  providers: [TransactionsOtpService]
})
export class TransactionsOtpModule {}
