import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    username: string

    @Column({ type: 'text' })
    password: string

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[]
}