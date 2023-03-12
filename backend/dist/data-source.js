"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppDataSource = void 0;
const typeorm_1 = require("typeorm");
const credentials_1 = require("./credentials");
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
        entities: [__dirname + "/tables/*.js"]
    });
    return AppDataSource;
}
exports.initAppDataSource = initAppDataSource;
