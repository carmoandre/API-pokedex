import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import UserPokemons from "./UserPokemons";

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => UserPokemons, (userPokemons) => userPokemons.user)
    userPokemons: UserPokemons[];
}
