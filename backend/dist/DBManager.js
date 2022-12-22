"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const data_source_1 = require("./data-source");
const user_1 = require("./entities/user");
class DB {
    constructor() {
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.initialize()
                .then(() => {
                console.log("Base de donnée initilaisée!");
            })
                .catch((error) => console.log(error));
        });
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(user_1.User)
                .createQueryBuilder("user")
                .where("user.first_name = :first_name", { first_name: "John" })
                .getOne();
            return res;
        });
    }
}
exports.DB = DB;
