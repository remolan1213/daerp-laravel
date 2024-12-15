var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm";
import Payroll from "./Payroll.js";
import WorkerRate from "./WorkerRate.js";
let PayrollData = class PayrollData {
    id;
    description;
    grossAmount;
    sharingPercentage;
    // @Column()
    // payrollId!: number;
    payroll;
    workerRate;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PayrollData.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], PayrollData.prototype, "description", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], PayrollData.prototype, "grossAmount", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], PayrollData.prototype, "sharingPercentage", void 0);
__decorate([
    ManyToOne(() => Payroll, (payroll) => payroll.payrollData, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Object)
], PayrollData.prototype, "payroll", void 0);
__decorate([
    ManyToOne(() => WorkerRate, (workerRate) => workerRate.payrollDatas, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Object)
], PayrollData.prototype, "workerRate", void 0);
PayrollData = __decorate([
    Entity()
], PayrollData);
export default PayrollData;
