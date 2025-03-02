import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Gender } from "src/genders/entities/gender.entity";
import { MaritalStatus } from "src/marital-statuses/entities/marital-status.entity";
import { State } from "src/locations/entities/state.entity";
import { LGA } from "src/locations/entities/lga.entity";

@Entity()
export class CustomerProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dob: Date;

    @Column({length: 11})
    nin: string;

    @Column({length: 100})
    motherMaidenName: string;

    @ManyToOne(() => Gender, (gender) => gender.customerProfiles, {cascade: true})
    gender: Gender;

    @ManyToOne(() => MaritalStatus, (maritalStatus) => maritalStatus.customerProfiles, {cascade: true})
    maritalStatus: MaritalStatus;

    @ManyToOne(() => State, (state) => state.customerProfiles, {cascade: true})
    stateOfOrigin: State;

    @ManyToOne(() => LGA, (lga) => lga.customerProfiles, {cascade: true})
    lga: LGA;

    @OneToOne(() => Customer, customer => customer.profile)
    @JoinColumn()
    customer: Customer;
}