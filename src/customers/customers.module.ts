import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerProfile } from './entities/customerProfile.entity';
import { TransactionOtp } from 'src/transactions-otp/entity/create-transactions-otp.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer, CustomerProfile, TransactionOtp])
    ],
    controllers: [CustomersController],
    providers: [CustomersService],
})
export class CustomersModule {}
