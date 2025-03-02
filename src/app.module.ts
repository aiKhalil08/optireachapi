import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AgentsModule } from './agents/agents.module';
import { Agent } from './agents/entities/agent.entity';
import { AgentOtp } from './agents/entities/agentOtp.entity';
import { AuthModule } from './auth/auth.module';
import { MaritalStatusesModule } from './marital-statuses/marital-statuses.module';
import { GendersModule } from './genders/genders.module';
import { LocationsModule } from './locations/locations.module';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.entity';
import { CustomerProfile } from './customers/entities/customerProfile.entity';
import { Gender } from './genders/entities/gender.entity';
import { MaritalStatus } from './marital-statuses/entities/marital-status.entity';
import { State } from './locations/entities/state.entity';
import { LGA } from './locations/entities/lga.entity';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: +<string>process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Agent, AgentOtp, Customer, CustomerProfile, Gender, MaritalStatus, State, LGA, Account],
        synchronize: true,
        options: {
            trustServerCertificate: true,
            encrypt: true
        },
    } as TypeOrmModuleOptions),
    AgentsModule,
    AuthModule,
    CustomersModule,
    LocationsModule,
    GendersModule,
    MaritalStatusesModule,
    AccountsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
