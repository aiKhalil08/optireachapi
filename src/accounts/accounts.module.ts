import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { GendersModule } from 'src/genders/genders.module';
import { MaritalStatusesModule } from 'src/marital-statuses/marital-statuses.module';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        GendersModule,
        MaritalStatusesModule,
        LocationsModule
    ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
