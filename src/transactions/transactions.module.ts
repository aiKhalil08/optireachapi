import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionClass } from './entities/transactionClass.entity';
import { TransactionType } from './entities/transactionType';
import { Transaction } from './entities/transaction.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction, TransactionClass, TransactionType])
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule {}
