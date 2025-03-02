import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { LGA } from './entities/lga.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([State, LGA])
    ],
    controllers: [LocationsController],
    providers: [LocationsService],
    exports: [TypeOrmModule.forFeature([State, LGA])]
})
export class LocationsModule {}
