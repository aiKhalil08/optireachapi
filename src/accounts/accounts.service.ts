import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { CustomerProfile } from 'src/customers/entities/customerProfile.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import { MaritalStatus } from 'src/marital-statuses/entities/marital-status.entity';
import { State } from 'src/locations/entities/state.entity';
import { LGA } from 'src/locations/entities/lga.entity';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,

        @InjectRepository(Gender)
        private genderRepository: Repository<Gender>,

        @InjectRepository(MaritalStatus)
        private maritalStatusRepository: Repository<MaritalStatus>,

        @InjectRepository(State)
        private stateRepository: Repository<State>,

        @InjectRepository(LGA)
        private lgaRepository: Repository<LGA>
    ) {}

    async create(createAccountDto: CreateAccountDto) {
        // try {
            const existingAccount = await this.accountRepository.findOne({ where: { bvn: createAccountDto.bvn } });

            if (existingAccount) {
                throw new ConflictException('Account already exists');
            }

            // create account
            const account = new Account();
            account.accountNumber = this._generateUniqueAccountNumber();
            account.bvn = createAccountDto.bvn;
            account.balance = 0;

            // create customer. customer's details are gotten from the bvn
            const phoneNumber = '+2348012345678';
            const email = "some.one@gmail.com";

            const customer = new Customer();
            customer.firstName = createAccountDto.firstName;
            customer.lastName = createAccountDto.lastName;
            customer.email = email;
            customer.phoneNumber = phoneNumber;

            // create customer profile
            const customerProfile = new CustomerProfile();
            customerProfile.nin = createAccountDto.nin;
            customerProfile.dob = new Date(createAccountDto.dob);
            customerProfile.motherMaidenName = createAccountDto.motherMaidenName;

            // assign gender
            const selectedGender = await this.genderRepository.findOne({ where: { id: +createAccountDto.gender}})

            if (!selectedGender) {
                throw new NotFoundException("Invalid gender");
            }

            customerProfile.gender = selectedGender;

            // assign marital status
            const maritalStatus = await this.maritalStatusRepository.findOne({ where: { id: +createAccountDto.maritalStatus}})

            if (!maritalStatus) {
                throw new NotFoundException("Invalid marital status");
            }

            customerProfile.maritalStatus = maritalStatus;

            // assign state of origin
            const stateOfOrigin = await this.stateRepository.findOne({ where: { id: +createAccountDto.stateOfOrigin}})

            if (!stateOfOrigin) {
                throw new NotFoundException("Invalid state of origin");
            }

            customerProfile.stateOfOrigin = stateOfOrigin;

            // assign state of origin
            const lga = await this.lgaRepository.findOne({ where: { id: +createAccountDto.lga}})

            if (!lga) {
                throw new NotFoundException("Invalid local governmeq");
            }

            customerProfile.lga = lga;

            customer.profile = customerProfile;
            account.customer = customer;

            this.accountRepository.save(account);
            return account;
        // } catch (e) {
        //     console.log(e);
        //     throw e;
        // }
    }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
    private _generateUniqueAccountNumber(): string {
        function generate() {
            return "2" + [1,2,3,4,5,6,7,8,9].map(_ => Math.floor(Math.random() * 9)).join('');
        }

        let accountNumber = generate();
        let isAccountNumberUnique = false;

        do {
            // check if account number already exists
            isAccountNumberUnique = !!this.accountRepository.findOne({ where: { accountNumber } });
        } while (!isAccountNumberUnique);

        return accountNumber;
    }
}
