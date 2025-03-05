import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Agent } from "./agent.entity";


@Entity()
export class AgentAccount{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 10, unique: true})
    accountNumber: string;

    @Column({length: 11, unique: true})
    bvn: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    balance: number;

    @OneToOne(() => Agent, agent => agent.agentAccount, {cascade: true})
    agent: Agent;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastTransactionAt: Date;

    @OneToMany(() => Transaction, transaction => transaction.agentAccount)
    transactions: Transaction;
}