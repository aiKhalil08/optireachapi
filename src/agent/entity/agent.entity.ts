import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Otp } from './otp.entity';

@Entity()
export class Agent {
  @PrimaryGeneratedColumn('uuid') // Generates a unique UUID for each agent
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  bvn: string;

  @Column({nullable: true})
  password?: string;

  @OneToMany(() => Otp, (otp) => otp.agent, { cascade: true }) 
  otps: Otp[];

 @BeforeInsert()
 @BeforeUpdate()
    async hashPassword() {
        if (this.password) {  // ✅ Hash only if a password is provided
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }
}
