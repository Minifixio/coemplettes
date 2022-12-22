"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const credentials_1 = require("./credentials");
const shipper_1 = require("./entities/shipper");
const user_1 = require("./entities/user");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mariadb",
    host: "localhost",
    port: 5000,
    username: "admin",
    database: "COEMP",
    password: credentials_1.db_password,
    logging: true,
    entities: [user_1.User, shipper_1.Shipper]
});
