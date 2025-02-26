import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Agent } from './agent.entity';
@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Agent, (agent) => agent.otps, { onDelete: 'CASCADE' })
  agent: Agent;

  @Column()
  otp: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ default: false })
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
