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
const DBManager_1 = require("./DBManager");
const port = 3000;
class API {
    // On passe en param le port et le tag qui sera dans l'URL d'appel de l'API
    constructor(port, tag) {
        this.app = {};
        this.entryPoints = [
            { method: "GET", entryPointName: "users", paramName: null, callbackNoParam: () => DBManager_1.DB.getUsers() },
            { method: "GET", entryPointName: "user", paramName: "id", callbackParam: (id) => DBManager_1.DB.getUserByID(id) },
            { method: "GET", entryPointName: "shippers", paramName: null, callbackNoParam: () => DBManager_1.DB.getShippers() },
            { method: "GET", entryPointName: "shipper", paramName: "id", callbackParam: (id) => DBManager_1.DB.getShipperByID(id) },
            { method: "GET", entryPointName: "carts", paramName: null, callbackNoParam: () => DBManager_1.DB.getCarts() },
            { method: "GET", entryPointName: "cart", paramName: "id", callbackParam: (id) => DBManager_1.DB.getCartByID(id) },
            { method: "GET", entryPointName: "deliveries", paramName: null, callbackNoParam: () => DBManager_1.DB.getDeliveries() },
            { method: "GET", entryPointName: "delivery", paramName: "id", callbackParam: (id) => DBManager_1.DB.getDeliveryByID(id) },
            { method: "GET", entryPointName: "products", paramName: null, callbackNoParam: () => DBManager_1.DB.getProducts() },
            { method: "GET", entryPointName: "product", paramName: "id", callbackParam: (id) => DBManager_1.DB.getProductByID(id) },
            { method: "GET", entryPointName: "categories", paramName: null, callbackNoParam: () => DBManager_1.DB.getCategories() },
        ];
        console.log(`[${tag}] Initialisation de l\'api`);
        this.port = port;
        this.tag = tag;
        this.initeApp();
        this.initEntryPoints();
    }
    initEntryPoints() {
        console.log('Initilisation des entry-points!');
        this.entryPoints.forEach(ep => {
            if (ep.method === "GET") {
                if (ep.paramName && ep.callbackParam) {
                    this.initGETwithParams(ep.entryPointName, ep.paramName, ep.callbackParam);
                }
                else if (ep.callbackNoParam) {
                    this.initGETnoParams(ep.entryPointName, ep.callbackNoParam);
                }
            }
            else if (ep.method === "POST") {
                if (ep.callbackNoParam) {
                    this.initPOST(ep.entryPointName, ep.callbackNoParam);
                }
            }
        });
    }
    initeApp() {
        this.app = (0, express_1.default)();
        this.app.listen(port, () => {
            console.log(`Le serveur est live à l'adresse : https://localhost:${port}`);
        });
        this.app.get('/', (req, res) => {
            res.send('Backend CoEmplettes !');
        });
    }
    initGETwithParams(entryPointName, paramName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Init GET ${entryPointName} with param ${paramName}`);
            this.app.get(`/${entryPointName}/:${paramName}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield callback(req.params[paramName]);
                res.send(data);
            }));
        });
    }
    initGETnoParams(entryPointName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Init GET ${entryPointName} with no params`);
            this.app.get(`/${entryPointName}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield callback();
                res.send(data);
            }));
        });
    }
    initPOST(entryPointName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Init POST ${entryPointName}`);
            this.app.post(`/${entryPointName}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield callback(req.body);
                res.send(data);
            }));
        });
    }
}
exports.API = API;
