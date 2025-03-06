import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionClass } from './entities/transactionClass.entity';
import { TransactionType } from './entities/transactionType';
import { Transaction } from './entities/transaction.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { AgentAccount } from 'src/agents-account/entities/agentAccount.entity';
import { Banks } from './entities/banks.entity';
import { TransferAccounts } from './entities/transfer-accounts.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction, TransactionClass, TransactionType, Account, AgentAccount,Banks,TransferAccounts])
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule {}
