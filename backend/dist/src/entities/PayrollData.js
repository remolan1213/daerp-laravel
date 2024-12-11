var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Payroll from './Payroll.js';
let PayrollData = class PayrollData {
    id;
    description;
    grossmount;
    workerpercentage;
    sharingpercentage;
    payroll;
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
], PayrollData.prototype, "grossmount", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], PayrollData.prototype, "workerpercentage", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], PayrollData.prototype, "sharingpercentage", void 0);
__decorate([
    ManyToOne(() => Payroll, payroll => payroll.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Payroll)
], PayrollData.prototype, "payroll", void 0);
PayrollData = __decorate([
    Entity()
], PayrollData);
export default PayrollData;
