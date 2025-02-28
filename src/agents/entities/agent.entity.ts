import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Agent {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({length: 25})
    firstName: string;

    @Column({length: 30})
    lastName: string;

    @Column({length: 65, unique: true})
    email: string;

    @Column({length: 14})
    phoneNumber: string;

    @Column({length: 11})
    bvn: string;

    @Column({nullable: true})
    password: string;

    @CreateDateColumn({nullable: true})
    createdAt: Date;
}
