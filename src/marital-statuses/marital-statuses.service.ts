import { Injectable } from '@nestjs/common';
import { CreateMaritalStatusDto } from './dto/create-marital-status.dto';
import { UpdateMaritalStatusDto } from './dto/update-marital-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaritalStatus } from './entities/marital-status.entity';

@Injectable()
export class MaritalStatusesService {

  constructor(
    @InjectRepository(MaritalStatus)
    private maritalstatusesReposirory: Repository<MaritalStatus>
  ){}

  create(createMaritalStatusDto: CreateMaritalStatusDto) {
    return 'This action adds a new maritalStatus';
  }

  findAll() {
    return this.maritalstatusesReposirory.find({
      select: ['id','name']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} maritalStatus`;
  }

  update(id: number, updateMaritalStatusDto: UpdateMaritalStatusDto) {
    return `This action updates a #${id} maritalStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} maritalStatus`;
  }
}
