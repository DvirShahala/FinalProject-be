import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryColumn({length: 30})
    email: string;

    @Column({length: 30})
    fullName: string;

    @Column({length: 30})
    password: string;

}
