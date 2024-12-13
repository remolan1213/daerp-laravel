var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique, } from "typeorm";
import BankAccount from "./BankAccount.js";
import CashAdvance from "./CashAdvance.js";
import PayrollData from "./PayrollData.js";
let Worker = class Worker {
    id;
    idNumber;
    department;
    firstName;
    lastName;
    middleName;
    cashAdvances;
    payrolls;
    bankAccounts;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Worker.prototype, "id", void 0);
__decorate([
    Column({ length: 20 }),
    __metadata("design:type", String)
], Worker.prototype, "idNumber", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Worker.prototype, "department", void 0);
__decorate([
    Column({ length: 25 }),
    __metadata("design:type", String)
], Worker.prototype, "firstName", void 0);
__decorate([
    Column({ length: 25 }),
    __metadata("design:type", String)
], Worker.prototype, "lastName", void 0);
__decorate([
    Column({ length: 25 }),
    __metadata("design:type", String)
], Worker.prototype, "middleName", void 0);
__decorate([
    OneToMany(() => CashAdvance, (cashAdvance) => cashAdvance.worker),
    __metadata("design:type", Array)
], Worker.prototype, "cashAdvances", void 0);
__decorate([
    OneToMany(() => PayrollData, (payrollData) => payrollData.worker),
    __metadata("design:type", Array)
], Worker.prototype, "payrolls", void 0);
__decorate([
    OneToMany(() => BankAccount, (bankAccount) => bankAccount.worker),
    __metadata("design:type", Array)
], Worker.prototype, "bankAccounts", void 0);
Worker = __decorate([
    Entity(),
    Unique("unique_id_number", ["idNumber"])
], Worker);
export default Worker;
