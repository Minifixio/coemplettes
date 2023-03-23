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
exports.Delivery = void 0;
const typeorm_1 = require("typeorm");
const Cart_1 = require("./Cart");
const Shipper_1 = require("./Shipper");
let Delivery = class Delivery {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Delivery.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], Delivery.prototype, "shipper_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: false }),
    __metadata("design:type", Date
    // 0 = la commande a été attribuée au livreur qui l'a accepté 
    // 1 = la commande est en cours d'achat
    // 2 = la commande a été achetée, en attente de dépôt au locker
    // 3 = la commande a été déposée au Locker
    // 4 = la commande a été récupérée normalement par le user sans soucis
    // 5 = problème lors de la récupération
    )
], Delivery.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Delivery.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Shipper_1.Shipper, shipper => shipper),
    (0, typeorm_1.JoinColumn)({ name: 'shipper_id', referencedColumnName: 'user_id' }),
    __metadata("design:type", Shipper_1.Shipper)
], Delivery.prototype, "shipper", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cart_1.Cart, (cart) => cart.delivery),
    __metadata("design:type", Array)
], Delivery.prototype, "carts", void 0);
Delivery = __decorate([
    (0, typeorm_1.Entity)({ name: "deliveries" })
], Delivery);
exports.Delivery = Delivery;
