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
exports.DeliveryProposal = void 0;
const typeorm_1 = require("typeorm");
const Cart_1 = require("./Cart");
const Shipper_1 = require("./Shipper");
let DeliveryProposal = class DeliveryProposal {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], DeliveryProposal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], DeliveryProposal.prototype, "shipper_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], DeliveryProposal.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true, default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], DeliveryProposal.prototype, "creation_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: false }),
    __metadata("design:type", Date
    /* pour un delivery_proposal encore en attente (donc non validé par le shipper sur l'app) : status=0 et delivery_id=null
    pour un delivery_proposal validé par le shipper sur l'app : status=1
    pour un delivery_proposal refusé par le shipper sur l'app : status revient à 0*/
    )
], DeliveryProposal.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], DeliveryProposal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", nullable: false }),
    __metadata("design:type", Number)
], DeliveryProposal.prototype, "current_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], DeliveryProposal.prototype, "suggested_supermarket_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Shipper_1.Shipper, shipper => shipper),
    (0, typeorm_1.JoinColumn)({ name: 'shipper_id', referencedColumnName: 'user_id' }),
    __metadata("design:type", Shipper_1.Shipper)
], DeliveryProposal.prototype, "shipper", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cart_1.Cart, (cart) => cart.delivery_proposal),
    __metadata("design:type", Array)
], DeliveryProposal.prototype, "carts", void 0);
DeliveryProposal = __decorate([
    (0, typeorm_1.Entity)({ name: "delivery_proposals" })
], DeliveryProposal);
exports.DeliveryProposal = DeliveryProposal;
