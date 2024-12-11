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
import CashAdvance from './CashAdvance.js';
let CashAdvanceDates = class CashAdvanceDates {
    id;
    dateRequested;
    dateGiven;
    cashAdvance;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CashAdvanceDates.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], CashAdvanceDates.prototype, "dateRequested", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], CashAdvanceDates.prototype, "dateGiven", void 0);
__decorate([
    ManyToOne(() => CashAdvance, cashAdvance => cashAdvance.id, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", CashAdvance)
], CashAdvanceDates.prototype, "cashAdvance", void 0);
CashAdvanceDates = __decorate([
    Entity()
], CashAdvanceDates);
export default CashAdvanceDates;
