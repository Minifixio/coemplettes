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
    // le tag? signifie que ce dernier n'est pas indispensable à passer en paramètre
    constructor(port, tag) {
        this.app = {}; // L'objet Express qui est notre objet API
        // Les entrypoints avec les différents noms d'entrée et les fonctions associés à chaque appel
        // Il y a aussi les méthodes utilisés : GET, POST...
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
        this.initApp();
        this.initEntryPoints();
    }
    /**
     * On itilialise les entrypoints en mappant à chaque fois les fonctions associées à chaque entrypoint
     */
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
    /**
     * On itialise l'App
     */
    initApp() {
        // On crée un objet Express (API)
        this.app = (0, express_1.default)();
        // On le fait écouter sur le port en quesiton
        this.app.listen(port, () => {
            console.log(`Le serveur est live à l'adresse : https://localhost:${port}`);
        });
        // On dit que l'entrée '/' (par défaut) ous donne un message esxpliquant que l'application fonctionne
        this.app.get('/', (req, res) => {
            res.send('Backend CoEmplettes !');
        });
    }
    /**
     * Initialisation d'une entrée GET avec un paramètre
     * Un paramètre est un objet du genre 'id' pour un utilisateur
     * Il s'appelle lorsque l'on souhaite récupérer des données en rapport avec ce paramètre
     * Exemple : 'GET localhost:3000/user/12' pour récupérer les données de l'utilisateur 12
     */
    initGETwithParams(entryPointName, paramName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Init GET ${entryPointName} with param ${paramName}`);
            // Pour récupérer le paramètre dans Express la syntaxe est :
            // app.get(`/entryPointName/:paramName) avec les ':'
            this.app.get(`/${entryPointName}/:${paramName}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield callback(req.params[paramName]);
                res.send(data);
            }));
        });
    }
    /**
     * Initialisation d'une entrée GET sans paramètre
     */
    initGETnoParams(entryPointName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Init GET ${entryPointName} with no params`);
            this.app.get(`/${entryPointName}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield callback();
                res.send(data);
            }));
        });
    }
    /**
     * Initialisation d'une entrée POST
     */
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
