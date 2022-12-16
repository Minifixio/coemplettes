"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const data_source_1 = require("./data-source");
class DB {
    constructor() {
        this.initialize();
    }
    initialize() {
        data_source_1.AppDataSource.initialize()
            .then(() => {
            console.log("Base de donnée initilaisée!");
        })
            .catch((error) => console.log(error));
    }
}
exports.DB = DB;
