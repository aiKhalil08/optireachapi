import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AgentOtp } from "./agentOtp.entity";
import { AgentAccount } from "src/agents-account/entities/agentAccount.entity";
import { Transaction } from "src/transactions/entities/transaction.entity";


@Entity()
export class Agent {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 25})
    firstName: string;

    @Column({length: 30})
    lastName: string;

    @Column({length: 65, unique: true})
    email: string;

    @Column({length: 14, unique: true})
    phoneNumber: string;

    @Column({length: 11, unique: true})
    bvn: string;

    @Column({nullable: true})
    password: string;

    @Column({default: false, nullable: true})
    emailVerified: boolean;

    @Column({default: false, nullable: true})
    phoneVerified: boolean;

    @Column({nullable: true, default: 1})
    tier: number;

    @Column({default: "/uploads/avatar.png"})
    imageUrl: string;


    @CreateDateColumn({nullable: true})
    createdAt: Date;

    @OneToMany(() => AgentOtp, (otp) => otp.agent, {cascade: true})
    otps: AgentOtp[]

    @OneToMany(() => Transaction, (transaction) => transaction.agent)
    transactions: Transaction;

    @OneToOne(() => AgentAccount, (agentaccount) => agentaccount.agent)
    agentAccount: AgentAccount;

}
