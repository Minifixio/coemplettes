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
const User_1 = require("./entities/User");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Shipper_1 = require("./entities/Shipper");
const Cart_1 = require("./entities/Cart");
const Delivery_1 = require("./entities/Delivery");
const DeliveryProposal_1 = require("./entities/DeliveryProposal");
const Product_1 = require("./entities/Product");
const Category_1 = require("./entities/Category");
class DB {
    constructor() {
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.initialize()
                .then(() => {
                console.log("Base de donnée initilaisée!");
            })
                .catch((error) => console.log(error));
        });
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(User_1.User)
                .createQueryBuilder("user")
                .where("user.first_name = :first_name", { first_name: "John" })
                .getOne();
            return res;
        });
    }
    getUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(User_1.User)
                .createQueryBuilder("user")
                .where("user.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    getShipperByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(Shipper_1.Shipper)
                .createQueryBuilder("shipper")
                .where("shipper.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    getCartByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(Cart_1.Cart)
                .createQueryBuilder("cart")
                .where("cart.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    getDeliveryByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(Delivery_1.Delivery)
                .createQueryBuilder("delivery")
                .where("delivery.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    getDeliveryProposalByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(DeliveryProposal_1.DeliveryProposal)
                .createQueryBuilder("delivery_proposal")
                .where("delivery_proposal.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    getProductByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(Product_1.Product)
                .createQueryBuilder("product")
                .where("product.id = :id", { id: id })
                .getOne();
            return res;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(User_1.User)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    getShippers() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(Shipper_1.Shipper)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    getCarts() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(Cart_1.Cart)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    getDeliveries() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(Delivery_1.Delivery)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    getDeliveryProposals() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(DeliveryProposal_1.DeliveryProposal)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(Category_1.Category)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield data_source_1.AppDataSource
                .getRepository(Product_1.Product)
                .createQueryBuilder()
                .getMany();
            return res;
        });
    }
    writeFromJSON(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            fs.readFile(path.join(__dirname, `../assets/json/${tableName}.json`), 'utf8', (error, data) => __awaiter(this, void 0, void 0, function* () {
                const parsedData = JSON.parse(data)[tableName];
                yield data_source_1.AppDataSource
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
