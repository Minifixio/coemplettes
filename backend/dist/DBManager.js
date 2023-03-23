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
const data_source_1 = require("./data-source");
const User_1 = require("./tables/User");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Shipper_1 = require("./tables/Shipper");
const Cart_1 = require("./tables/Cart");
const Delivery_1 = require("./tables/Delivery");
const DeliveryProposal_1 = require("./tables/DeliveryProposal");
const Product_1 = require("./tables/Product");
const Category_1 = require("./tables/Category");
const FeaturedProduct_1 = require("./tables/FeaturedProduct");
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
    /**
     * Pour toutes les fonctions de type get... voir la doc de TypeORM
     */
    static getUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.AppDataSource
                .getRepository(User_1.User)
                .createQueryBuilder("user")
                .where("user.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    static getShipperByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const res = yield this.AppDataSource
                .getRepository(User_1.User)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    static getShippers() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.AppDataSource
                .getRepository(Shipper_1.Shipper)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    static getCarts(owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const res = yield this.AppDataSource
                .getRepository(Category_1.Category)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    static getProducts(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const res = yield this.AppDataSource
                .getRepository(FeaturedProduct_1.FeaturedProduct)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values(user)
                .execute();
        });
    }
    static addShipper(shipper) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(Shipper_1.Shipper)
                .values(shipper)
                .execute();
        });
    }
    static addCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(Cart_1.Cart)
                .values(cart)
                .execute();
        });
    }
    static addDeliveryProposal(delivery_proposal) {
        return __awaiter(this, void 0, void 0, function* () {
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
