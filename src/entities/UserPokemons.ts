import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Pokemon from "./Pokemon";
import User from "./User";

@Entity("userPokemons")
export default class UserPokemons {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    pokemonId: number;

    @ManyToOne(() => User, (user) => user.userPokemons)
    user: User;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.userPokemons)
    pokemon: Pokemon;
}
