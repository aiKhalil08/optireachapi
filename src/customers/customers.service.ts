import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>
    ) {}

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

  //function to retrieve a single customer balance
      async accountBalance(id: string){
          const customer = await this.customerRepository.findOne({
              where:{id:id},
              relations: ['account']
          })
  
          if(!customer){
              return new NotFoundException("Customer account does not exist")
          }

         const customerBalance = customer.account
  
          return {balance: customerBalance.balance};
      }
      
}
