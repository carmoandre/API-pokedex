import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import UserPokemons from "./UserPokemons";

@Entity("pokemons")
export default class Pokemon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    number: number;

    @Column()
    image: string;

    @Column()
    weight: number;

    @Column()
    height: number;

    @Column()
    baseExp: number;

    @Column()
    description: string;

    @Column()
    inMyPokemons: boolean;

    @OneToMany(() => UserPokemons, (userPokemons) => userPokemons.pokemon)
    userPokemons: UserPokemons[];
}
