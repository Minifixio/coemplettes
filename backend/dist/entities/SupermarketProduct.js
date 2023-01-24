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
exports.SupermarketProduct = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const Supermarket_1 = require("./Supermarket");
let SupermarketProduct = class SupermarketProduct {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SupermarketProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], SupermarketProduct.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], SupermarketProduct.prototype, "supermarket_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], SupermarketProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", nullable: false }),
    __metadata("design:type", Boolean)
], SupermarketProduct.prototype, "is_available", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Product_1.Product, product => product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id', referencedColumnName: 'id' }),
    __metadata("design:type", Product_1.Product)
], SupermarketProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Supermarket_1.Supermarket, supermarket => supermarket),
    (0, typeorm_1.JoinColumn)({ name: 'supermarket_id', referencedColumnName: 'id' }),
    __metadata("design:type", Supermarket_1.Supermarket)
], SupermarketProduct.prototype, "supermarket", void 0);
SupermarketProduct = __decorate([
    (0, typeorm_1.Entity)({ name: "supermarket_products" })
], SupermarketProduct);
exports.SupermarketProduct = SupermarketProduct;
