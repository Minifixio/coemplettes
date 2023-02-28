import { initAppDataSource } from "./data-source";
import { User } from "./tables/User";
import * as fs from 'fs';
import * as path from 'path';
import { Shipper } from "./tables/Shipper";
import { Cart } from "./tables/Cart";
import { Delivery } from "./tables/Delivery";
import { DeliveryProposal } from "./tables/DeliveryProposal";
import { Product } from "./tables/Product";
import { Category } from "./tables/Category";
import { DataSource } from "typeorm";
import { FeaturedProduct } from "./tables/FeaturedProduct";

export class DB {

    static AppDataSource: DataSource;

    static async initialize(dbPort: number) {
        console.log("Connexion à la base de donnée sur le port " + dbPort + "\n")
        this.AppDataSource = initAppDataSource(dbPort)
        await this.AppDataSource.initialize()
        .then(() => {
            console.log("Base de donnée initilaisée!\n")
        })
        .catch((error) => console.log(error))
    }

    // Fonction de test
    static async test() {
        const res = await this.AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.first_name = :first_name", { first_name: "John" })
        .getOne()
        return res
    }

    /**
     * Pour toutes les fonctions de type get... voir la doc de TypeORM
     */
    public static async getUserByID(id: number): Promise<User | null> {
        const res = await this.AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getShipperByID(id: number): Promise<Shipper | null> {
        const res = await this.AppDataSource
        .getRepository(Shipper)
        .createQueryBuilder("shipper")
        .where("shipper.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getCartByID(id: number): Promise<Cart | null> {
        const res = await this.AppDataSource
        .getRepository(Cart)
        .createQueryBuilder("cart")
        .where("cart.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getDeliveryByID(id: number): Promise<Delivery | null> {
        const res = await this.AppDataSource
        .getRepository(Delivery)
        .createQueryBuilder("delivery")
        .where("delivery.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getDeliveryProposalByID(id: number): Promise<DeliveryProposal | null> {
        const res = await this.AppDataSource
        .getRepository(DeliveryProposal)
        .createQueryBuilder("delivery_proposal")
        .where("delivery_proposal.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getProductByID(id: number): Promise<Product | null> {
        const res = await this.AppDataSource
        .getRepository(Product)
        .createQueryBuilder("product")
        .where("product.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getUsers(): Promise<User[] | null> {
        const res = await this.AppDataSource
        .getRepository(User)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getShippers(): Promise<Shipper[] | null> {
        const res = await this.AppDataSource
        .getRepository(Shipper)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getCarts(owner_id: number): Promise<Cart[] | null> {
        const res = await this.AppDataSource
        .getRepository(Cart)
        .createQueryBuilder("cart")
        .where("cart.owner_id = :owner_id", {owner_id: owner_id})
        .getMany()
        return res
    }

    public static async getDeliveries(shipper_id: number): Promise<Delivery[] | null> {
        const res = await this.AppDataSource
        .getRepository(Delivery)
        .createQueryBuilder("delivery")
        .where("delivery.shipper_id = :shipper_id", {shipper_id: shipper_id})
        .getMany()
        return res
    }

    public static async getDeliveryProposals(shipper_id: number): Promise<DeliveryProposal[] | null> {
        const res = await this.AppDataSource
        .getRepository(DeliveryProposal)
        .createQueryBuilder("delivery_proposal")
        .where("delivery_proposal.shipper_id = :shipper_id", {shipper_id: shipper_id})
        .getMany()
        return res
    }

    public static async getCategories(): Promise<Category[] | null> {
        const res = await this.AppDataSource
        .getRepository(Category)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getProducts(category_id: number): Promise<Product[] | null> {
        const res = await this.AppDataSource
        .getRepository(Product)
        .createQueryBuilder("product")
        .where("product.category_id = :category_id", {category_id: category_id})
        .getMany()
        return res
    }

    public static async getFeaturedProducts(): Promise<FeaturedProduct[] | null> {
        const res = await this.AppDataSource
        .getRepository(FeaturedProduct)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async addUser(user: User) {
        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .execute()
    }

    public static async addShipper(shipper: Shipper) {
        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Shipper)
        .values(shipper)
        .execute()
    }

    public static async addCart(cart: Cart) {
        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Cart)
        .values(cart)
        .execute()
    }

    public static async addDeliveryProposal(delivery_proposal: DeliveryProposal) {
        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(DeliveryProposal)
        .values(delivery_proposal)
        .execute()
    }

    public static async addProduct(product: Product) {
        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .execute()
    }


    // On lit un fichier JSON et on écrit ses données dans la BDD
    public static async writeFromJSON(tableName: string) {
        fs.readFile(path.join(__dirname, `../assets/json/${tableName}.json`), 'utf8', async (error, data: any) => {
            const parsedData = JSON.parse(data)[tableName]
            await this.AppDataSource
                .createQueryBuilder()
                .insert()
                .into(tableName)
                .values(parsedData)
                .execute()
        })
    }
}

