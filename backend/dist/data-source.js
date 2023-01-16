"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const credentials_1 = require("./credentials");
const Shipper_1 = require("./entities/Shipper");
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
    entities: [User_1.User, Shipper_1.Shipper]
});
