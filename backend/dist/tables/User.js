"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Cart_1 = require("./Cart");
const Shipper_1 = require("./Shipper");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 25, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 25, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "pwdhash", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Shipper_1.Shipper, (shipper) => shipper.user),
    __metadata("design:type", Shipper_1.Shipper)
], User.prototype, "shipper", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cart_1.Cart, (cart) => cart.owner),
    __metadata("design:type", Array)
], User.prototype, "carts", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: "users" })
], User);
exports.User = User;
