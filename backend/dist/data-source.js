"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppDataSource = void 0;
const typeorm_1 = require("typeorm");
const credentials_1 = require("./credentials");
const Cart_1 = require("./tables/Cart");
const CartItem_1 = require("./tables/CartItem");
const Category_1 = require("./tables/Category");
const Delivery_1 = require("./tables/Delivery");
const DeliveryProposal_1 = require("./tables/DeliveryProposal");
const Product_1 = require("./tables/Product");
const Shipper_1 = require("./tables/Shipper");
const Supermarket_1 = require("./tables/Supermarket");
const SupermarketProduct_1 = require("./tables/SupermarketProduct");
const User_1 = require("./tables/User");
// Les entités sont référencées dans le dossier /entities
// On ne fait que traduire les données de la base de donnée en TypeScript
// Pour les types utilisés pour MariaDB, voir : https://orkhan.gitbook.io/typeorm/docs/entities#column-types-for-mysql-mariadb
function initAppDataSource(dbPort) {
    const AppDataSource = new typeorm_1.DataSource({
        type: "mariadb",
        host: "localhost",
        port: dbPort,
        username: "admin",
        database: "COEMP",
        password: credentials_1.db_password,
        logging: true,
        entities: [User_1.User, Shipper_1.Shipper, Product_1.Product, Category_1.Category, Cart_1.Cart, CartItem_1.CartItem, Delivery_1.Delivery, DeliveryProposal_1.DeliveryProposal, Supermarket_1.Supermarket, SupermarketProduct_1.SupermarketProduct]
    });
    return AppDataSource;
}
exports.initAppDataSource = initAppDataSource;
