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
import Worker from './Worker.js';
let WorkerNames = class WorkerNames {
    id;
    firstname;
    lastname;
    middlename;
    worker;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WorkerNames.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], WorkerNames.prototype, "firstname", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], WorkerNames.prototype, "lastname", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], WorkerNames.prototype, "middlename", void 0);
__decorate([
    ManyToOne(() => Worker, worker => worker.names, { onDelete: 'CASCADE', lazy: true }),
    __metadata("design:type", Promise)
], WorkerNames.prototype, "worker", void 0);
WorkerNames = __decorate([
    Entity()
], WorkerNames);
export default WorkerNames;
