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
const APIManager_1 = require("./APIManager");
const DBManager_1 = require("./DBManager");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = new APIManager_1.API(3000, 'api');
        const db = new DBManager_1.DB();
        yield db.initialize();
        const test = yield db.test();
        console.log(test);
    });
}
main();
