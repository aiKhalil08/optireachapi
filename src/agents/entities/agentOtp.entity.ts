import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "./agent.entity";

@Entity()
export class AgentOtp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 6})
    token: string;

    @Column({enum: ['email', 'sms']})
    type: 'email' | 'sms';

    @Column()
    expiresAt: Date;

    @Column({default: false})
    isUsed: boolean;

    @Column({nullable: true})
    usedAt: Date;

    @ManyToOne(() => Agent, (agent) => agent.otps)
    agent: Agent;
}