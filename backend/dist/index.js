"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIManager_1 = require("./APIManager");
const DBManager_1 = require("./DBManager");
const GroupedCommands_1 = require("./GroupedCommands");
const dotenv = __importStar(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
dotenv.config();
let dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield DBManager_1.DB.initialize(dbPort);
        const api = new APIManager_1.API(3000, 'api');
        cronCommands();
    });
}
function cronCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        // Do not cron commands in development
        if (process.env.developmentCRON === 'true') {
            GroupedCommands_1.GroupedCommands.cron();
        }
        else {
            node_cron_1.default.schedule('* * * * *', () => {
                console.log('running a task every minute');
            });
        }
    });
}
main();
