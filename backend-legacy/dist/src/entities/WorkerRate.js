var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Worker from "./Worker.js";
import PayrollData from "./PayrollData.js";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
let WorkerRate = class WorkerRate {
    id;
    rate;
    dateGranted;
    status;
    worker; // One-to-many relationship with Worker;
    payrollDatas;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WorkerRate.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], WorkerRate.prototype, "rate", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], WorkerRate.prototype, "dateGranted", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], WorkerRate.prototype, "status", void 0);
__decorate([
    ManyToOne(() => Worker, (worker) => worker.workerRates),
    __metadata("design:type", Object)
], WorkerRate.prototype, "worker", void 0);
__decorate([
    OneToMany(() => PayrollData, (payrollData) => payrollData.workerRate),
    __metadata("design:type", Array)
], WorkerRate.prototype, "payrollDatas", void 0);
WorkerRate = __decorate([
    Entity()
], WorkerRate);
export default WorkerRate;
