import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Banks } from "./banks.entity";
import { Transaction } from "./transaction.entity";


@Entity()
export class TransferAccounts{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({length: 10, unique: true})
    accountNumber: string;

    @OneToOne(() => Banks, bank => bank.transferAccount)
    @JoinColumn()
    bank: Banks;
}