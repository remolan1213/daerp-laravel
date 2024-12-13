var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, } from "typeorm";
import Worker from "./Worker.js"; // Import Worker
let BankAccount = class BankAccount {
    id;
    accountNumber;
    bankName;
    accountStatus;
    worker;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BankAccount.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], BankAccount.prototype, "accountNumber", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], BankAccount.prototype, "bankName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], BankAccount.prototype, "accountStatus", void 0);
__decorate([
    ManyToOne(() => Worker, (worker) => worker.bankAccounts, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false,
    }),
    __metadata("design:type", Object)
], BankAccount.prototype, "worker", void 0);
BankAccount = __decorate([
    Entity(),
    Unique("unique_account_number", ["accountNumber"])
], BankAccount);
export default BankAccount;
