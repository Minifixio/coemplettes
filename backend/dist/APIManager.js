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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const express_1 = __importDefault(require("express"));
const port = 3000;
class API {
    // On passe en param le port et le tag qui sera dans l'URL d'appel de l'API
    constructor(port, tag) {
        this.app = {};
        console.log(`[${tag}] Initialisation de l\'api`);
        this.port = port;
        this.tag = tag;
        this.initialize();
    }
    initialize() {
        this.app = (0, express_1.default)();
        this.app.listen(port, () => {
            console.log(`Le serveur est live à l'adresse : https://localhost:${port}`);
        });
        this.app.get('/', (req, res) => {
            res.send('Backend CoEmplettes !');
        });
    }
    initializeGETparam(entryPointName, paramName, callback) {
        this.app.get(`/${entryPointName}/:${paramName}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield callback(req.params[paramName]);
        }));
    }
}
exports.API = API;
