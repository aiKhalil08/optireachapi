import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerProfile } from "./customerProfile.entity";

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

    @Column({length: 11, unique: true})
    bvn: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => CustomerProfile, profile => profile.customer)
    profile: CustomerProfile;
}
