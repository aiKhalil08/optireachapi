import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerProfile } from './entities/customerProfile.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer, CustomerProfile])
    ],
    controllers: [CustomersController],
    providers: [CustomersService],
})
export class CustomersModule {}
