import { Customer } from "src/customers/entities/customer.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";


@Entity()
export class TransactionOtp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 6 })
    token: string;

    @Column()
    expiresAt: Date;

    @Column({ default: false })
    isUsed: boolean;

    @Column({ nullable: true })
    usedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.transactionOtps)
    customer: Customer;

    @CreateDateColumn()
    createdAt: Date;
}
