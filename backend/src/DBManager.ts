import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import * as fs from 'fs';
import * as path from 'path';
import { Shipper } from "./entities/Shipper";
import { Cart } from "./entities/Cart";
import { Delivery } from "./entities/Delivery";
import { DeliveryProposal } from "./entities/DeliveryProposal";
import { Product } from "./entities/Product";
import { Category } from "./entities/Category";

export class DB {
    constructor() {
    }

    public async initialize() {
        await AppDataSource.initialize()
        .then(() => {
            console.log("Base de donnée initilaisée!")
        })
        .catch((error) => console.log(error))
    }

    public async test() {
        const res = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.first_name = :first_name", { first_name: "John" })
        .getOne()
        return res
    }

    public static async getUserByID(id: number): Promise<User | null> {
        const res = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getShipperByID(id: number): Promise<Shipper | null> {
        const res = await AppDataSource
        .getRepository(Shipper)
        .createQueryBuilder("shipper")
        .where("shipper.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getCartByID(id: number): Promise<Cart | null> {
        const res = await AppDataSource
        .getRepository(Cart)
        .createQueryBuilder("cart")
        .where("cart.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getDeliveryByID(id: number): Promise<Delivery | null> {
        const res = await AppDataSource
        .getRepository(Delivery)
        .createQueryBuilder("delivery")
        .where("delivery.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getDeliveryProposalByID(id: number): Promise<DeliveryProposal | null> {
        const res = await AppDataSource
        .getRepository(DeliveryProposal)
        .createQueryBuilder("delivery_proposal")
        .where("delivery_proposal.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getProductByID(id: number): Promise<Product | null> {
        const res = await AppDataSource
        .getRepository(Product)
        .createQueryBuilder("product")
        .where("product.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getUsers(): Promise<User[] | null> {
        const res = await AppDataSource
        .getRepository(User)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getShippers(): Promise<Shipper[] | null> {
        const res = await AppDataSource
        .getRepository(Shipper)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getCarts(): Promise<Cart[] | null> {
        const res = await AppDataSource
        .getRepository(Cart)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getDeliveries(): Promise<Delivery[] | null> {
        const res = await AppDataSource
        .getRepository(Delivery)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getDeliveryProposals(): Promise<DeliveryProposal[] | null> {
        const res = await AppDataSource
        .getRepository(DeliveryProposal)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getCategories(): Promise<Category[] | null> {
        const res = await AppDataSource
        .getRepository(Category)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getProducts(): Promise<Product[] | null> {
        const res = await AppDataSource
        .getRepository(Product)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async writeFromJSON(tableName: string) {
        fs.readFile(path.join(__dirname, `../assets/json/${tableName}.json`), 'utf8', async (error, data: any) => {
            const parsedData = JSON.parse(data)[tableName]
            await AppDataSource
                .createQueryBuilder()
                .insert()
                .into(tableName)
                .values(parsedData)
                .execute()
        })
    }
}

