import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Worker from "./Worker";  

@Entity()
export default class BankAccount {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    accountNumber!: string;

    @Column()
    bankName!: string;
 
    @Column()
    accountStatus!: string;

    @ManyToOne(() => Worker, worker => worker, { onDelete: 'CASCADE' })
    worker!: Worker[]; 
}