import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerProfile } from "./customerProfile.entity";
import { Account } from "src/accounts/entities/account.entity";
import { TransactionOtp } from "src/transactions-otp/entity/create-transactions-otp.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 25})
    firstName: string;

    @Column({length: 30, nullable: true})
    middleName: string;

    @Column({length: 30})
    lastName: string;

    @Column({length: 65, unique: true, nullable: true})
    email: string;

    @Column({length: 14, unique: true})
    phoneNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => CustomerProfile, profile => profile.customer, {cascade: true})
    profile: CustomerProfile;

    @OneToOne(() => Account, account => account.customer)
    account: Account;

    @OneToMany(() => TransactionOtp, (transactionOtp) => transactionOtp.customer)
    transactionOtps: TransactionOtp[];

}
