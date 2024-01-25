import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'number'})
    value: number

    @Column({type:'date'})
    date: Date

    @Column({type:'text'})
    type: string

    @ManyToOne(()=> User, user => user.transactions)
    @JoinColumn({name: 'user_id'})
    user: User
}