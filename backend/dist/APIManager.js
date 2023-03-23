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
const AuthManager_1 = require("./AuthManager");
const LockerManager_1 = require("./LockerManager");
var bodyParser = require('body-parser');
class API {
    // On passe en param le port et le tag qui sera dans l'URL d'appel de l'API
    // le tag? signifie que ce dernier n'est pas indispensable à passer en paramètre
    constructor(port, tag) {
        this.app = {}; // L'objet Express qui est notre objet API
        // Les entrypoints avec les différents noms d'entrée et les fonctions associés à chaque appel
        // Il y a aussi les méthodes utilisés : GET, POST...
        this.entryPoints = [
            { method: "GET", entryPointName: "users", paramName: null, auth: true, callbackNoParam: () => DBManager_1.DB.getUsers() },
            { method: "GET", entryPointName: "user", paramName: "id", auth: true, callbackParam: (id) => DBManager_1.DB.getUserByID(id) },
            { method: "GET", entryPointName: "shippers", paramName: null, auth: true, callbackNoParam: () => DBManager_1.DB.getShippers() },
            { method: "GET", entryPointName: "shipper", paramName: "id", auth: true, callbackParam: (id) => DBManager_1.DB.getShipperByID(id) },
            { method: "GET", entryPointName: "products", paramName: "category_id", auth: true, callbackParam: (category_id) => DBManager_1.DB.getProducts(category_id) },
            { method: "GET", entryPointName: "product", paramName: "id", auth: true, callbackParam: (id) => DBManager_1.DB.getProductByID(id) },
            { method: "GET", entryPointName: "featured_products", paramName: null, auth: true, callbackNoParam: () => DBManager_1.DB.getFeaturedProducts() },
            { method: "GET", entryPointName: "carts", paramName: "owner_id", auth: true, callbackParam: (owner_id) => DBManager_1.DB.getCarts(owner_id) },
            { method: "GET", entryPointName: "cart", paramName: "id", auth: true, callbackParam: (id) => DBManager_1.DB.getCartByID(id) },
            { method: "GET", entryPointName: "current_cart", paramName: "owner_id", auth: false, callbackParam: (owner_id) => DBManager_1.DB.getCurrentCart(owner_id) },
            { method: "GET", entryPointName: "deliveries", paramName: "shipper_id", auth: true, callbackParam: (shipper_id) => DBManager_1.DB.getDeliveries(shipper_id) },
            { method: "GET", entryPointName: "delivery", paramName: "id", auth: true, callbackParam: (id) => DBManager_1.DB.getDeliveryByID(id) },
            { method: "GET", entryPointName: "delivery_summary", paramName: "shipper_id", auth: true, callbackParam: (shipper_id) => DBManager_1.DB.getDeliverySummary(shipper_id) },
            { method: "GET", entryPointName: "delivery_proposals", paramName: "shipper_id", auth: true, callbackParam: (shipper_id) => DBManager_1.DB.getDeliveryProposals(shipper_id) },
            { method: "GET", entryPointName: "delivery_proposal", paramName: "id", auth: true, callbackParam: (id) => DBManager_1.DB.getDeliveryProposalByID(id) },
            { method: "GET", entryPointName: "delivery_proposal_summary", paramName: "delivery_proposal_id", auth: true, callbackParam: (delivery_proposal_id) => DBManager_1.DB.getDeliveryProposalSummary(delivery_proposal_id) },
            { method: "GET", entryPointName: "categories", paramName: null, auth: true, callbackNoParam: () => DBManager_1.DB.getCategories() },
            { method: "GET", entryPointName: "lockers", paramName: null, auth: false, callbackNoParam: () => LockerManager_1.Locker.getLockersStates() },
            { method: "GET", entryPointName: "open_locker", paramName: "locker_id", auth: false, callbackParam: (locker_id) => LockerManager_1.Locker.openLocker(locker_id) },
            { method: "POST", entryPointName: "user", paramName: null, auth: true, callbackParam: (user) => DBManager_1.DB.addUser(user) },
            { method: "POST", entryPointName: "shipper", paramName: null, auth: true, callbackParam: (shipper) => DBManager_1.DB.addShipper(shipper) },
            { method: "POST", entryPointName: "cart", paramName: null, auth: true, callbackParam: (data) => DBManager_1.DB.addCart(data.cart, data.cart_items) },
            { method: "POST", entryPointName: "delivery_proposal", paramName: null, auth: true, callbackParam: (delivery_proposal) => DBManager_1.DB.addDeliveryProposal(delivery_proposal) },
            { method: "POST", entryPointName: "product", paramName: null, auth: true, callbackParam: (product) => DBManager_1.DB.addProduct(product) },
            { method: "POST", entryPointName: "cart_status", paramName: null, auth: true, callbackParam: (data) => DBManager_1.DB.updateCartStatus(data.cart_id, data.status) },
            { method: "POST", entryPointName: "delivery_status", paramName: null, auth: true, callbackParam: (data) => DBManager_1.DB.updateDeliveryStatus(data.delivery_id, data.status) },
            { method: "POST", entryPointName: "delivery_start_shopping", paramName: null, auth: true, callbackParam: (delivery_id) => DBManager_1.DB.startDeliveryShopping(delivery_id) },
            { method: "POST", entryPointName: "delivery_end_shopping", paramName: null, auth: true, callbackParam: (data) => DBManager_1.DB.endDeliveryShopping(data.delivery_id, data.carts) },
            { method: "POST", entryPointName: "delivery_deposit", paramName: null, auth: true, callbackParam: (delivery_id) => DBManager_1.DB.depositDelivery(delivery_id) },
            // On passe un paramètre 'retreive' boolean. 
            // retreive = true => la commande a été récupérée normalement
            // retreive = false => la commande n'a pas pu être récupérée i.e problème !
            { method: "POST", entryPointName: "delivery_retreive", paramName: null, auth: true, callbackParam: (data) => DBManager_1.DB.retreiveDelivery(data.delivery_id, data.retreived) },
        ];
        this.authMiddleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const accessToken = authHeader.split(' ')[1];
                const userId = req.query.user_id;
                console.log(`[API] Middleware > user_id : ${userId} & access_token : ${accessToken}\n`);
                if (userId) {
                    const user = yield DBManager_1.DB.getUserByID(userId);
                    if (!user) {
                        res.status(401).json({
                            "error": "user_unknown",
                            "error_message": "user_id inconnu"
                        });
                    }
                    else {
                        try {
                            yield AuthManager_1.AuthManager.checkAuth(userId, accessToken);
                            next();
                        }
                        catch (e) {
                            res.status(401).json(e);
                        }
                    }
                }
                else {
                    res.status(400).json({
                        "error": "user_id_missing",
                        "error_message": "user_id_missing non fourni"
                    });
                }
            }
            else {
                res.status(400).json({
                    "error": "auth_header_missing",
                    "error_message": "fournir un authorization header"
                });
            }
        });
        console.log(`[API] Initialisation de l\'api\n`);
        this.port = port;
        this.tag = tag;
        this.initApp();
        this.initAuth();
        this.initEntryPoints();
    }
    /**
     * On itialise l'App
     */
    initApp() {
        // On crée un objet Express (API)
        this.app = (0, express_1.default)();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        // On le fait écouter sur le port en quesiton
        this.app.listen(this.port, () => {
            console.log(`[API] Le serveur est live à l'adresse : https://localhost:${this.port}\n`);
        });
        // On dit que l'entrée '/' (par défaut) ous donne un message esxpliquant que l'application fonctionne
        this.app.get('/', (req, res) => {
            res.send('Backend CoEmplettes !');
        });
    }
    /**
     * On itilialise les entrypoints en mappant à chaque fois les fonctions associées à chaque entrypoint
     */
    initEntryPoints() {
        console.log('[API] Initilisation des entry-points!\n');
        this.entryPoints.forEach(ep => {
            if (ep.method === "GET") {
                if (ep.paramName && ep.callbackParam) {
                    this.initGETwithParams(ep.entryPointName, ep.paramName, ep.auth, ep.callbackParam);
                }
                else if (ep.callbackNoParam) {
                    this.initGETnoParams(ep.entryPointName, ep.auth, ep.callbackNoParam);
                }
            }
            else if (ep.method === "POST") {
                if (ep.callbackParam) {
                    this.initPOST(ep.entryPointName, ep.auth, ep.callbackParam);
                }
            }
        });
    }
    /**
     * Initialisation d'une entrée GET avec un paramètre
     * Un paramètre est un objet du genre 'id' pour un utilisateur
     * Il s'appelle lorsque l'on souhaite récupérer des données en rapport avec ce paramètre
     * Exemple : 'GET localhost:3000/user/12' pour récupérer les données de l'utilisateur 12
     */
    initGETwithParams(entryPointName, paramName, auth, callback) {
        console.log(`Init GET ${entryPointName} with param ${paramName}`);
        // Pour récupérer le paramètre dans Express la syntaxe est :
        // app.get(`/entryPointName/:paramName) avec les ':'
        if (auth) {
            this.app.get(`/${entryPointName}/:${paramName}`, this.authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield callback(req.params[paramName]);
                res.send(data);
            }));
        }
        else {
            this.app.get(`/${entryPointName}/:${paramName}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield callback(req.params[paramName]);
                res.send(data);
            }));
        }
    }
    /**
     * Initialisation d'une entrée GET sans paramètre
     */
    initGETnoParams(entryPointName, auth, callback) {
        console.log(`Init GET ${entryPointName} with no params`);
        if (auth) {
            this.app.get(`/${entryPointName}`, this.authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield callback();
                res.send(data);
            }));
        }
        else {
            this.app.get(`/${entryPointName}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield callback();
                res.send(data);
            }));
        }
    }
    /**
     * Initialisation d'une entrée POST
     */
    initPOST(entryPointName, auth, callback) {
        console.log(`[API] Init POST ${entryPointName}`);
        if (auth) {
            this.app.post(`/${entryPointName}`, this.authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
                console.log(req.body);
                const data = yield callback(req.body);
                res.sendStatus(200);
            }));
        }
        else {
            this.app.post(`/${entryPointName}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                console.log(req.body);
                const data = yield callback(req.body);
                res.sendStatus(200);
            }));
        }
    }
    initAuth() {
        console.log("[API] Initialisation du système d'autehntification\n");
        this.app.post('/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body.user;
            const password = req.body.password;
            console.log('[API] Register user :');
            console.log(user);
            console.log('\n');
            try {
                const userId = yield AuthManager_1.AuthManager.register(user, password);
                const tokens = yield AuthManager_1.AuthManager.getTokens(userId);
                res.status(200).json({ user_id: userId, tokens });
            }
            catch (e) {
                res.status(401).json(e);
            }
        }));
        this.app.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            console.log(`[API] Login user : ${email}\n`);
            try {
                const userId = yield AuthManager_1.AuthManager.login(email, password);
                const tokens = yield AuthManager_1.AuthManager.getTokens(userId);
                res.status(200).json({ user_id: userId, tokens });
            }
            catch (e) {
                res.status(401).json(e);
            }
        }));
        this.app.post('/refresh', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const refreshToken = req.body.refresh_token;
            console.log(`[API] Refresh user : ${email}\n`);
            try {
                const tokens = yield AuthManager_1.AuthManager.refreshAuth(email, refreshToken);
                res.status(200).json(tokens);
            }
            catch (e) {
                res.status(401).json(e);
            }
        }));
    }
}
exports.API = API;
