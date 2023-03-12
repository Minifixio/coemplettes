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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const data_source_1 = require("./data-source");
const User_1 = require("./tables/User");
const Shipper_1 = require("./tables/Shipper");
const Cart_1 = require("./tables/Cart");
const Delivery_1 = require("./tables/Delivery");
const DeliveryProposal_1 = require("./tables/DeliveryProposal");
const Product_1 = require("./tables/Product");
const Category_1 = require("./tables/Category");
const FeaturedProduct_1 = require("./tables/FeaturedProduct");
const OAuth_1 = require("./tables/OAuth");
const CartItem_1 = require("./tables/CartItem");
class DB {
    static initialize(dbPort) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Connexion à la base de donnée sur le port " + dbPort + "\n");
            this.AppDataSource = (0, data_source_1.initAppDataSource)(dbPort);
            yield this.AppDataSource.initialize()
                .then(() => {
                console.log("Base de donnée initilaisée!\n");
            })
                .catch((error) => console.log(error));
        });
    }
    // Fonction de test
    static test() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.AppDataSource
                .getRepository(User_1.User)
                .createQueryBuilder("user")
                .where("user.first_name = :first_name", { first_name: "John" })
                .getOne();
            return res;
        });
    }
    static addUserAuth(accessToken, refreshToken, userId, expiresAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const oauth = {
                user_id: userId,
                access_token: accessToken,
                expires_at: expiresAt,
                refresh_token: refreshToken
            };
            console.log("[DBManager] Ajout d\'informations d\'auth pour le user n°'" + userId);
            console.log(oauth);
            console.log('\n');
            yield this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(OAuth_1.OAuth)
                .values(oauth)
                .execute();
        });
    }
    static storeAccessToken(token, userId, expiresAt) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Sauvegarde de l'access token dans la BDD");
            return yield this.AppDataSource
                .createQueryBuilder()
                .update(OAuth_1.OAuth)
                .set({ access_token: token, expires_at: expiresAt })
                .where("user_id = :user_id", { user_id: userId })
                .execute();
        });
    }
    static storeRefreshToken(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Sauvegarde du refresh token dans la BDD");
            return yield this.AppDataSource
                .createQueryBuilder()
                .update(OAuth_1.OAuth)
                .set({ refresh_token: token })
                .where("user_id = :user_id", { user_id: userId })
                .execute();
        });
    }
    static getAuthInfos(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des infos d'auth pour le user n°" + userId + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(OAuth_1.OAuth)
                .createQueryBuilder("oauth")
                .where("oauth.user_id = :id", { id: userId })
                .getOne();
            return res;
        });
    }
    /**
     * Pour toutes les fonctions de type get... voir la doc de TypeORM
     */
    static getUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des infos d'user n°" + id + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(User_1.User)
                .createQueryBuilder("user")
                .where("user.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des infos pour : " + email + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(User_1.User)
                .createQueryBuilder("user")
                .where("user.email = :email", { email: email })
                .getOne();
            return res;
        });
    }
    static getShipperByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des infos de shipper n°" + id + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(Shipper_1.Shipper)
                .createQueryBuilder("shipper")
                .where("shipper.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    static getCartByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des infos de la cart n°" + id + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(Cart_1.Cart)
                .createQueryBuilder("cart")
                .where("cart.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    static getDeliveryByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des infos de la delivery n°" + id + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(Delivery_1.Delivery)
                .createQueryBuilder("delivery")
                .where("delivery.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    static getDeliveryProposalByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des infos de la delivery proposal n°" + id + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(DeliveryProposal_1.DeliveryProposal)
                .createQueryBuilder("delivery_proposal")
                .where("delivery_proposal.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    static getProductByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des infos du produit n°" + id + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(Product_1.Product)
                .createQueryBuilder("product")
                .where("product.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération de tous les users dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(User_1.User)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    static getShippers() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération de tous les shippers dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(Shipper_1.Shipper)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    static getCarts(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des carts pour le user n°" + owner_id + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(Cart_1.Cart)
                .createQueryBuilder("cart")
                .where("cart.owner_id = :owner_id", { owner_id: owner_id })
                .getMany();
            return res;
        });
    }
    static getDeliveries(shipper_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des deliveries pour le shipper n°" + shipper_id + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(Delivery_1.Delivery)
                .createQueryBuilder("delivery")
                .where("delivery.shipper_id = :shipper_id", { shipper_id: shipper_id })
                .getMany();
            return res;
        });
    }
    static getDeliveryProposals(shipper_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des delivery proposals pour le shipper n°" + shipper_id + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(DeliveryProposal_1.DeliveryProposal)
                .createQueryBuilder("delivery_proposal")
                .where("delivery_proposal.shipper_id = :shipper_id", { shipper_id: shipper_id })
                .getMany();
            return res;
        });
    }
    static getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des categories dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(Category_1.Category)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    static getProducts(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des produits pour la catégorie n°" + category_id + " dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(Product_1.Product)
                .createQueryBuilder("product")
                .where("product.category_id = :category_id", { category_id: category_id })
                .getMany();
            return res;
        });
    }
    static getFeaturedProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des produits phares dans la BDD");
            const res = yield this.AppDataSource
                .getRepository(FeaturedProduct_1.FeaturedProduct)
                .createQueryBuilder("featured_product")
                .leftJoinAndSelect("featured_product.product", "product")
                .getMany();
            return res;
        });
    }
    static getTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Récupération des tokens pour le user n°" + userId + " dans la BDD");
            const req = yield this.AppDataSource
                .getRepository(OAuth_1.OAuth)
                .createQueryBuilder("oauth")
                .where("oauth.user_id = :user_id", { user_id: userId })
                .getOne();
            if (req) {
                return { accessToken: req.access_token, refreshToken: req.refresh_token };
            }
            else {
                return null;
            }
        });
    }
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Ajout du user :");
            console.log(user);
            const req = yield this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values(user)
                .returning("id")
                .execute();
            const id = req.identifiers[0].id;
            return id;
        });
    }
    static addShipper(shipper) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Ajout du shipper :");
            console.log(shipper);
            yield this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(Shipper_1.Shipper)
                .values(shipper)
                .execute();
        });
    }
    static addCart(cart, cartItems) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Ajout de la cart :");
            console.log(cart);
            cart.status = 0;
            const req = yield this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(Cart_1.Cart)
                .values(cart)
                .returning("id")
                .execute();
            const cartId = req.identifiers[0].id;
            cartItems.map(item => { item.cart_id = cartId; });
            yield this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(CartItem_1.CartItem)
                .values(cartItems)
                .execute();
        });
    }
    static addDeliveryProposal(delivery_proposal) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Ajout de la delivery proposal :");
            console.log(delivery_proposal);
            yield this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(DeliveryProposal_1.DeliveryProposal)
                .values(delivery_proposal)
                .execute();
        });
    }
    static addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[DBManager] Ajout du produit :");
            console.log(product);
            yield this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(Product_1.Product)
                .values(product)
                .execute();
        });
    }
    // On lit un fichier JSON et on écrit ses données dans la BDD
    static writeFromJSON(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            fs.readFile(path.join(__dirname, `../assets/json/${tableName}.json`), 'utf8', (error, data) => __awaiter(this, void 0, void 0, function* () {
                const parsedData = JSON.parse(data)[tableName];
                yield this.AppDataSource
                    .createQueryBuilder()
                    .insert()
                    .into(tableName)
                    .values(parsedData)
                    .execute();
            }));
        });
    }
}
exports.DB = DB;
