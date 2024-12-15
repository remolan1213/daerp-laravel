import Worker from "./Worker";
import PayrollData from "./PayrollData";
import { Column, Entity, Relation, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class WorkerRate {
    @PrimaryGeneratedColumn()
    id!: number;    

    @Column()
    rate!: number;

    @Column()
    dateGranted!: string;

    @Column()
    status!: string;

    @ManyToOne(() => Worker, (worker) => worker.workerRates)
    worker!: Relation<Worker>; // One-to-many relationship with Worker;

    @OneToMany(() => PayrollData, (payrollData) => payrollData.workerRate)
    payrollDatas!: PayrollData[];
}