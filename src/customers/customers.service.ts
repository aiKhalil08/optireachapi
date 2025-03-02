import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
    // constructor(
    //     @InjectRepository(C)
    //     private customerRepository: 
    // ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    // try {
    //     const existingAccount = await this.customerRepository.findOne({ where: { email: createCustomerDto.email } });
    // } catch (e) {

    // }
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
