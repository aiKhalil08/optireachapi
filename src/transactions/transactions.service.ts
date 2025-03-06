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
import { TransferAccounts } from './entities/transfer-accounts.entity';
import { Banks } from './entities/banks.entity';
import { CreateTransferDto } from './dto/create-transfer.dto';

@Injectable()
export class TransactionsService {

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

    @InjectRepository(TransferAccounts)
    private readonly transferAccountRepository: Repository<TransferAccounts>,

    @InjectRepository(Banks)
    private readonly banksRepository: Repository<Banks>,

    @InjectDataSource() 
    private dataSource: DataSource
  ) {}

  //function to withdraw money
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

  //function to deposite money
  async createDeposite(createTransactionDto: CreateTransactionDto){
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

        // Find agent account using the query runner's manager
        const existingAgentAccount = await queryRunner.manager.findOne(AgentAccount, { 
            where: { accountNumber: createTransactionDto.agentAccount }
        });

        if (!existingAgentAccount) {
            throw new NotFoundException("Agent account does not exist");
        }

        
        // Checking if the agent has enough cash to withdraw
        if (existingAgentAccount.balance < createTransactionDto.amount) {
            throw new BadRequestException("Insufficient balance to perform the deposite ");
        }

        // Fetch Transaction Class (Credit) using query runner's manager
        const transactionClass = await queryRunner.manager.findOne(TransactionClass, {
            where: { name: 'Credit' }
        });

        if (!transactionClass) {
            throw new NotFoundException("Transaction class not found");
        }

        // Fetch Transaction Type (Withdrawal) using query runner's manager
        const transactionType = await queryRunner.manager.findOne(TransactionType, {
            where: { name: 'Deposit' }
        });

        if (!transactionType) {
            throw new NotFoundException("Transaction type not found");
        }

        // Add the fee to the agent account
        existingAgentAccount.balance -= createTransactionDto.amount;

        // Deduct the transaction amount and fee from the customer account
        existingCustomerAccount.balance += createTransactionDto.amount;
        
        

        // Save updated accounts using query runner's manager
        await queryRunner.manager.save(existingAgentAccount);
        await queryRunner.manager.save(existingCustomerAccount);
       

        // Create and save the transaction using query runner's manager
        const transaction = new Transaction();
        transaction.amount = createTransactionDto.amount;
        transaction.account = existingCustomerAccount;
        transaction.agentAccount = existingAgentAccount;
        transaction.transactionType = transactionType;
        transaction.transactionClass = transactionClass;
        transaction.details = {
            amount: createTransactionDto.amount,
            totalAmountDeducted: createTransactionDto.amount,
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

  async createTransfer(createTransferDto: CreateTransferDto){
    // Start a database transaction
    const queryRunner = this.dataSource.createQueryRunner();


    // Establish a connection and begin the transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
        //find if sender's account exist
        const existingSenderAccount = await queryRunner.manager.findOne(Account,{
          where: {accountNumber: createTransferDto.senderAccount}
        })

        // Find agent account using the query runner's manager
        const existingAgentAccount = await queryRunner.manager.findOne(AgentAccount, { 
            where: { accountNumber: createTransferDto.agentAccount }
        });

        if (!existingAgentAccount) {
            throw new NotFoundException("Agent account does not exist");
        }


        //checking if the sender has an account
        if(!existingSenderAccount){
          throw new NotFoundException("Account does not exist");
        }

        //calculating fee 
        const feeAmount = createTransferDto.amount * 0.005;

        const totalAmountNeeded = feeAmount + createTransferDto.amount;
        
        // Checking if the customer has enough cash to withdraw
        if (existingSenderAccount.balance < totalAmountNeeded) {
            throw new BadRequestException("Insufficient balance to perform the withdrawal (includes 0.5% fee)");
        }

        //finding the receiver's account
        const existingReceiverAccount = await queryRunner.manager.findOne(TransferAccounts, 
          {where: {accountNumber: createTransferDto.receiverAccount}}
        )

         if(!existingReceiverAccount){
          throw new NotFoundException("Account does not exist");
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
            where: { name: 'Transfer' }
        });

        if (!transactionType) {
            throw new NotFoundException("Transaction type not found");
        }

        existingSenderAccount.balance -= totalAmountNeeded;

        existingAgentAccount.balance += feeAmount;

         // Save updated accounts using query runner's manager
        await queryRunner.manager.save(existingSenderAccount);
        await queryRunner.manager.save(existingAgentAccount);

        // Create and save the transaction using query runner's manager
        const transaction = new Transaction();
        transaction.amount = createTransferDto.amount;
        transaction.account = existingSenderAccount;
        transaction.agentAccount = existingAgentAccount;
        transaction.transactionType = transactionType;
        transaction.transactionClass = transactionClass;
        transaction.details = {
            amount: createTransferDto.amount,
            feePercentage: 0.5,
            feeAmount: feeAmount,
            totalAmountDeducted: totalAmountNeeded,
            senderAccount: existingSenderAccount.accountNumber,
            agentAccount: existingAgentAccount.accountNumber,
            receiverAccount: existingReceiverAccount.accountNumber
        };

        await queryRunner.manager.save(transaction);

        // If all operations are successful, commit the transaction
        await queryRunner.commitTransaction();

        return transaction;

    }
    catch(error){
      await queryRunner.rollbackTransaction();

      throw error;
    }finally{
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
