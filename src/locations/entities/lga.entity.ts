import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { State } from "./state.entity";
import { CustomerProfile } from "src/customers/entities/customerProfile.entity";

@Entity()
@Unique(["name", "state"])
export class LGA {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => State, (state) => state.lgas)
    state: State;

    @OneToMany(() => CustomerProfile, (profile) => profile)
    customerProfiles: CustomerProfile[];
}