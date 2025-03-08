import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,

        @InjectRepository(Account)
        private accountRepository: Repository<Account>
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
  async accountBalance(accountNumber: string){
      const customerBalance = await this.accountRepository.findOne({
          where:{accountNumber: accountNumber},
          relations: ['customer']
      })

      if(!customerBalance){
          return new NotFoundException("Customer account does not exist")
      }

      const customer = customerBalance.customer

      return {balance: customerBalance.balance,
        customerFirstName: customer.firstName,
        customerLastName: customer.lastName,
        customerNumber: customer.phoneNumber
      };
  }
      
}
