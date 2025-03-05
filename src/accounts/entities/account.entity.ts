import { Customer } from "src/customers/entities/customer.entity";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 10, unique: true})
    accountNumber: string;

    @Column({length: 11, unique: true})
    bvn: string;

    @Column({
    type: 'decimal', 
    precision: 10, 
    scale: 2, // Keep 2 decimal places
    transformer: {
        to: (value: number) => value, // Keep the original value
        from: (value: any) => Number(value) // Ensure it's a number
    }
    })
    balance: number;

    @OneToOne(() => Customer, customer => customer.account, {cascade: true})
    @JoinColumn()
    customer: Customer;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastTransactionAt: Date;

    @OneToMany(() => Transaction, transaction => transaction.account)
    transactions: Transaction[];
}
