import { Inject, Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class GendersService {
  constructor(
    @InjectRepository(Gender)
    private genderRepository: Repository<Gender>,

    @Inject(REQUEST)
    private readonly request: any
  ) {}

  create(createGenderDto: CreateGenderDto) {
    return 'This action adds a new gender';
  }

  findAll() {
    console.log(this.request.user);
    return this.genderRepository.find({
      select: ['id', 'name']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} gender`;
  }

  update(id: number, updateGenderDto: UpdateGenderDto) {
    return `This action updates a #${id} gender`;
  }

  remove(id: number) {
    return `This action removes a #${id} gender`;
  }
}
