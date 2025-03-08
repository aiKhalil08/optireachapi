import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerProfile } from './entities/customerProfile.entity';
import { TransactionOtp } from 'src/transactions-otp/entity/create-transactions-otp.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { TransactionsOtpService } from 'src/transactions-otp/transactions-otp.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer, CustomerProfile, TransactionOtp, Account])
    ],
    controllers: [CustomersController],
    providers: [CustomersService,TransactionsOtpService],
})
export class CustomersModule {}
