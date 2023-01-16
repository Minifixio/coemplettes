"use strict";
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
}
exports.API = API;
