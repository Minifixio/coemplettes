"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const credentials_1 = require("./credentials");
const Cart_1 = require("./entities/Cart");
const CartItem_1 = require("./entities/CartItem");
const Category_1 = require("./entities/Category");
const Delivery_1 = require("./entities/Delivery");
const DeliveryProposal_1 = require("./entities/DeliveryProposal");
const Product_1 = require("./entities/Product");
const Shipper_1 = require("./entities/Shipper");
const Supermarket_1 = require("./entities/Supermarket");
const SupermarketProduct_1 = require("./entities/SupermarketProduct");
const User_1 = require("./entities/User");
// Les entités sont référencées dans le dossier /entities
// On ne fait que traduire les données de la base de donnée en TypeScript
// Pour les types utilisés pour MariaDB, voir : https://orkhan.gitbook.io/typeorm/docs/entities#column-types-for-mysql-mariadb
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mariadb",
    host: "localhost",
    port: 5000,
    username: "admin",
    database: "COEMP",
    password: credentials_1.db_password,
    logging: true,
    entities: [User_1.User, Shipper_1.Shipper, Product_1.Product, Category_1.Category, Cart_1.Cart, CartItem_1.CartItem, Delivery_1.Delivery, DeliveryProposal_1.DeliveryProposal, Supermarket_1.Supermarket, SupermarketProduct_1.SupermarketProduct]
});
