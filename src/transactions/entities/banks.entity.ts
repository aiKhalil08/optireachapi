import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransferAccounts } from "./transfer-accounts.entity";

@Entity()
export class Banks{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    logo: string;

    @OneToOne(() => TransferAccounts, transferAccount => transferAccount.bank)
    transferAccount: TransferAccounts;
}