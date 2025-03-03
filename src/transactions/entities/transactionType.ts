import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class TransactionType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string

    @Column({length: 255})
    description: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Transaction, transaction => transaction.transactionClass)
    transactions: Transaction[];
}