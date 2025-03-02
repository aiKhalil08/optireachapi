import { Module } from '@nestjs/common';
import { MaritalStatusesService } from './marital-statuses.service';
import { MaritalStatusesController } from './marital-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaritalStatus } from './entities/marital-status.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([MaritalStatus])
    ],
    controllers: [MaritalStatusesController],
    providers: [MaritalStatusesService],
})
export class MaritalStatusesModule {}
