import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Agent {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({length: 25})
    firstName: string;

    @Column({length: 30})
    lastName: string;

    @Column({length: 55})
    email: string;
}
