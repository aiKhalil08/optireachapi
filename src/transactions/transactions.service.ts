import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionClass } from './entities/transactionClass.entity';
import { TransactionType } from './entities/transactionType';
import { Account } from 'src/accounts/entities/account.entity';
import { AgentAccount } from 'src/agents-account/entities/agentAccount.entity';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @InjectRepository(TransactionClass)
    private transactionClassRepository: Repository<TransactionClass>,

    @InjectRepository(TransactionType)
    private transactionTypeRepository: Repository<TransactionType>,

    @InjectRepository(Account)
    private accountRepository: Repository<Account>,

    @InjectRepository(AgentAccount)
    private agentAccountRepository: Repository<AgentAccount>
  ){}

  async createWithdraw(createTransactionDto: CreateTransactionDto) {
    const existingCustomerAccount = await this.accountRepository.findOne({ where: {accountNumber: createTransactionDto.customerAccount}})

    //checking if the customer has an acount
    if(!existingCustomerAccount){
      throw new NotFoundException("Account does not exist")
    }

    //checking if the customer has enough cash to withdraw
    if(existingCustomerAccount.balance < createTransactionDto.amount){
      throw new BadRequestException("Insuficient balance to perform the withdrawal")
    }


    const existingAgentAccount = await this.agentAccountRepository.findOne({ where: {accountNumber: createTransactionDto.agentAccount}})

    if (!existingAgentAccount) {
        throw new NotFoundException("Agent account does not exist");
    }

     // Fetch Transaction Class (Debit)
    const transactionClass = await this.transactionClassRepository.findOne({
        where: { name: 'Debit' }
    });

    if (!transactionClass) {
        throw new NotFoundException("Transaction class not found");
    }

    // Fetch Transaction Type (Withdrawal)
    const transactionType = await this.transactionTypeRepository.findOne({
        where: { name: 'Withdrawal' }
    });

    if (!transactionType) {
    throw new NotFoundException("Transaction type not found");
    } 

    //  //deducting the transaction amount from the customer account
    existingCustomerAccount.balance = existingCustomerAccount.balance - createTransactionDto.amount
    
    
    

    // //adding the transaction amount to the agent acount
    existingAgentAccount.balance = existingAgentAccount.balance + createTransactionDto.amount

    await this.accountRepository.save(existingCustomerAccount);
    await this.agentAccountRepository.save(existingAgentAccount);

    //creating the transcation
    const transaction = new Transaction();
    transaction.amount = createTransactionDto.amount;
    transaction.account = existingCustomerAccount; // linking the agent that initiated the transaction
    transaction.agentAccount = existingAgentAccount; // linking the customer that inititaed the transaction
    transaction.transactionType = transactionType;
    transaction.transactionClass = transactionClass;
    transaction.details = {
    amount: createTransactionDto.amount,
    customerAccount: existingCustomerAccount.accountNumber,
    agentAccount: existingAgentAccount.accountNumber,
  };
   
    await this.transactionRepository.save(transaction);

    return transaction
  }
  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
