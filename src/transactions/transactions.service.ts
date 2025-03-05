import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionClass } from './entities/transactionClass.entity';
import { TransactionType } from './entities/transactionType';
import { Account } from 'src/accounts/entities/account.entity';
import { AgentAccount } from 'src/agents-account/entities/agentAccount.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionsService {

  // constructor(
  //   @InjectRepository(Transaction)
  //   private transactionRepository: Repository<Transaction>,

  //   @InjectRepository(TransactionClass)
  //   private transactionClassRepository: Repository<TransactionClass>,

  //   @InjectRepository(TransactionType)
  //   private transactionTypeRepository: Repository<TransactionType>,

  //   @InjectRepository(Account)
  //   private accountRepository: Repository<Account>,

  //   @InjectRepository(AgentAccount)
  //   private agentAccountRepository: Repository<AgentAccount>
  // ){}

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(AgentAccount)
    private readonly agentAccountRepository: Repository<AgentAccount>,

    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(TransactionClass)
    private readonly transactionClassRepository: Repository<TransactionClass>,

    @InjectRepository(TransactionType)
    private readonly transactionTypeRepository: Repository<TransactionType>,

    @InjectDataSource() 
    private dataSource: DataSource
  ) {}

  async createWithdraw(createTransactionDto: CreateTransactionDto) {
    // Start a database transaction
    const queryRunner = this.dataSource.createQueryRunner();
    
    // Establish a connection and begin the transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // Find customer account using the query runner's manager
        const existingCustomerAccount = await queryRunner.manager.findOne(Account, { 
            where: { accountNumber: createTransactionDto.customerAccount }
        });

        // Checking if the customer has an account
        if (!existingCustomerAccount) {
            throw new NotFoundException("Account does not exist");
        }

        // Calculate fee as 0.5% of the withdrawal amount
        const feeAmount = createTransactionDto.amount * 0.005;

        // Calculate total amount needed (withdrawal amount + 0.5% fee)
        const totalAmountNeeded = createTransactionDto.amount + feeAmount;

        // Checking if the customer has enough cash to withdraw
        if (existingCustomerAccount.balance < totalAmountNeeded) {
            throw new BadRequestException("Insufficient balance to perform the withdrawal (includes 0.5% fee)");
        }

        // Find agent account using the query runner's manager
        const existingAgentAccount = await queryRunner.manager.findOne(AgentAccount, { 
            where: { accountNumber: createTransactionDto.agentAccount }
        });

        if (!existingAgentAccount) {
            throw new NotFoundException("Agent account does not exist");
        }

        // Fetch Transaction Class (Debit) using query runner's manager
        const transactionClass = await queryRunner.manager.findOne(TransactionClass, {
            where: { name: 'Debit' }
        });

        if (!transactionClass) {
            throw new NotFoundException("Transaction class not found");
        }

        // Fetch Transaction Type (Withdrawal) using query runner's manager
        const transactionType = await queryRunner.manager.findOne(TransactionType, {
            where: { name: 'Withdrawal' }
        });

        if (!transactionType) {
            throw new NotFoundException("Transaction type not found");
        }

        // Deduct the transaction amount and fee from the customer account
        existingCustomerAccount.balance -= totalAmountNeeded;
        
        // Add the fee to the agent account
        existingAgentAccount.balance += totalAmountNeeded;

        // Save updated accounts using query runner's manager
        await queryRunner.manager.save(existingCustomerAccount);
        await queryRunner.manager.save(existingAgentAccount);

        // Create and save the transaction using query runner's manager
        const transaction = new Transaction();
        transaction.amount = createTransactionDto.amount;
        transaction.account = existingCustomerAccount;
        transaction.agentAccount = existingAgentAccount;
        transaction.transactionType = transactionType;
        transaction.transactionClass = transactionClass;
        transaction.details = {
            amount: createTransactionDto.amount,
            feePercentage: 0.5,
            feeAmount: feeAmount,
            totalAmountDeducted: totalAmountNeeded,
            customerAccount: existingCustomerAccount.accountNumber,
            agentAccount: existingAgentAccount.accountNumber,
        };
   
        await queryRunner.manager.save(transaction);

        // If all operations are successful, commit the transaction
        await queryRunner.commitTransaction();

        return transaction;
    } catch (error) {
        // If any error occurs, roll back the transaction
        await queryRunner.rollbackTransaction();
        
        // Re-throw the error to be handled by the global exception filter
        throw error;
    } finally {
        // Always release the query runner
        await queryRunner.release();
    }
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
