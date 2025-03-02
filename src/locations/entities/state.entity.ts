import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LGA } from "./lga.entity";
import { CustomerProfile } from "src/customers/entities/customerProfile.entity";

@Entity()
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @OneToMany(() => LGA, (lga) => lga.state)
    lgas: LGA[];

    @OneToMany(() => CustomerProfile, (profile) => profile)
    customerProfiles: CustomerProfile[];
}