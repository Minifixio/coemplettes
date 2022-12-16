"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIManager_1 = require("./APIManager");
const DBManager_1 = require("./DBManager");
const api = new APIManager_1.API(3000, 'api');
const db = new DBManager_1.DB();
