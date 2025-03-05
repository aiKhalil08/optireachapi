import { Account } from "src/accounts/entities/account.entity";
import { Agent } from "src/agents/entities/agent.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransactionClass } from "./transactionClass.entity";
import { TransactionType } from "./transactionType";
import { AgentAccount } from "src/agents/entities/agentAccount,entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    amount: number;

    @Column({type: 'text', nullable: true})
    narration: string;

    @Column({type: 'json'})
    details: JSON;

    @CreateDateColumn()
    createdAt: Date;
    
    @ManyToOne(() => AgentAccount, (agentaccount) => agentaccount.transactions)
    agentAccount: AgentAccount;

    @ManyToOne(() => Account, account => account.transactions)
    account: Account;

    @ManyToOne(() => TransactionClass, transactionClass => transactionClass.transactions)
    transactionClass: TransactionClass;

    @ManyToOne(() => TransactionType, transactionType => transactionType.transactions)
    transactionType: TransactionType;
}
