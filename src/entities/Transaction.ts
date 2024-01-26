import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    value: number

    @Column()
    date: Date

    @Column()
    type: string

    @ManyToOne(()=> User, user => user.transactions)
    @JoinColumn({name: 'user_id'})
    user: User
}