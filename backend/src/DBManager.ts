import * as fs from 'fs';
import * as path from 'path'
import bcrypt from 'bcrypt';

import { DataSource } from "typeorm";

import { initAppDataSource } from "./data-source";
import { User } from "./tables/User";
import { Shipper } from "./tables/Shipper";
import { Cart } from "./tables/Cart";
import { Delivery } from "./tables/Delivery";
import { DeliveryProposal } from "./tables/DeliveryProposal";
import { Product } from "./tables/Product";
import { Category } from "./tables/Category";
import { FeaturedProduct } from "./tables/FeaturedProduct";
import { OAuth } from './tables/OAuth';
import { TokenResponse } from './models/TokenResponse';
import { UserDefault } from './models/UserDefault';
import { CartItem } from './tables/CartItem';
import { Locker } from './LockerManager';

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

    static async addUserAuth(accessToken: string, refreshToken: string, userId: number, expiresAt: number) {

        const oauth: OAuth = {
            user_id: userId,
            access_token: accessToken,
            expires_at: expiresAt,
            refresh_token: refreshToken
        }

        console.log("[DBManager] Ajout d\'informations d\'auth pour le user n°'" + userId)
        console.log(oauth)
        console.log('\n')

        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(OAuth)
        .values(oauth)
        .execute()
    }

    static async storeAccessToken(token: string, userId: number, expiresAt: number) {
        console.log("[DBManager] Sauvegarde de l'access token dans la BDD")
        return await this.AppDataSource
        .createQueryBuilder()
        .update(OAuth)
        .set({access_token: token, expires_at: expiresAt})
        .where("user_id = :user_id", {user_id: userId})
        .execute()
    }

    static async storeRefreshToken(token: string, userId: number){
        console.log("[DBManager] Sauvegarde du refresh token dans la BDD")
        return await this.AppDataSource
        .createQueryBuilder()
        .update(OAuth)
        .set({refresh_token: token})
        .where("user_id = :user_id", {user_id: userId})
        .execute()
    }

    static async getAuthInfos(userId: number) {
        console.log("[DBManager] Récupération des infos d'auth pour le user n°" + userId + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(OAuth)
        .createQueryBuilder("oauth")
        .where("oauth.user_id = :id", { id: userId })
        .getOne()
        return res
    }

    /**
     * Pour toutes les fonctions de type get... voir la doc de TypeORM
     */
    public static async getUserByID(id: number): Promise<User | null> {
        console.log("[DBManager] Récupération des infos d'user n°" + id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getUserByEmail(email: string): Promise<User | null> {
        console.log("[DBManager] Récupération des infos pour : " + email + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.email = :email", { email: email })
        .getOne()
        return res
    }

    public static async getShipperByID(userId: number): Promise<Shipper | null> {
        console.log("[DBManager] Récupération des infos de shipper pour le user_id n°" + userId + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Shipper)
        .createQueryBuilder("shipper")
        .where("shipper.user_id = :user_id", { user_id: userId })
        .getOne()
        return res
    }

    public static async getCartByID(id: number): Promise<Cart | null> {
        console.log("[DBManager] Récupération des infos de la cart n°" + id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Cart)
        .createQueryBuilder("cart")
        .where("cart.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getDeliveryByID(id: number): Promise<Delivery | null> {
        console.log("[DBManager] Récupération des infos de la delivery n°" + id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Delivery)
        .createQueryBuilder("delivery")
        .where("delivery.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getDeliveryDeadline(id: number): Promise<Date | null> {
        console.log("[DBManager] Récupération de la deadline de la delivery n°" + id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Cart)
        .createQueryBuilder("cart")
        .where("cart.delivery_id = :id", { id: id })
        .orderBy('cart.deadline', 'DESC')
        .getOne()
        return (res?.deadline ? res?.deadline : null)
    }

    public static async getDeliveryProposalByID(id: number): Promise<DeliveryProposal | null> {
        console.log("[DBManager] Récupération des infos de la delivery proposal n°" + id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(DeliveryProposal)
        .createQueryBuilder("delivery_proposal")
        .where("delivery_proposal.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getProductByID(id: number): Promise<Product | null> {
        console.log("[DBManager] Récupération des infos du produit n°" + id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Product)
        .createQueryBuilder("product")
        .where("product.id = :id", { id: id })
        .getOne()
        return res
    }

    public static async getUsers(): Promise<User[] | null> {
        console.log("[DBManager] Récupération de tous les users dans la BDD")
        const res = await this.AppDataSource
        .getRepository(User)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getShippers(): Promise<Shipper[]> {
        console.log("[DBManager] Récupération de tous les shippers dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Shipper)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getAvailableShippers(): Promise<Shipper[]> {
        console.log("[DBManager] Récupération de tous les shippers disponibles dans la BDD")
        let shippers = await this.AppDataSource
        .getRepository(Shipper)
        .createQueryBuilder("shipper")
        .leftJoinAndSelect("shipper.deliveries", "deliveries")
        .getMany()

        shippers = shippers.filter((shipper) => {
            return shipper.deliveries.filter((delivery) => {
                return delivery.status !== 0 && delivery.status !== 1 && delivery.status !== 2 && delivery.status !== 3
                }).length !== 0
        })

        return shippers
    }

    public static async getCarts(owner_id: number): Promise<Cart[] | null> {
        console.log("[DBManager] Récupération des carts pour le user n°" + owner_id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Cart)
        .createQueryBuilder("cart")
        .where("cart.owner_id = :owner_id", {owner_id: owner_id})
        .getMany()
        return res
    }

    public static async getCurrentCart(owner_id: number): Promise<Cart | null> {
        console.log("[DBManager] Récupération de la cart courante pour le user n°" + owner_id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Cart)
        .createQueryBuilder("cart")
        .leftJoinAndSelect("cart.delivery", "delivery")
        .leftJoinAndSelect("delivery.shipper", "shipper")
        .leftJoinAndSelect("shipper.user", "user")
        .leftJoinAndSelect("cart.delivery_proposal", "delivery_proposal")
        .where("cart.owner_id = :owner_id", {owner_id: owner_id})
        .getOne()
        return res
    }

    public static async getUnattributedCarts(): Promise<Cart[]> {
        console.log("[DBManager] Récupération des carts non attribués dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Cart)
        .createQueryBuilder("cart")
        .where("cart.status = :status", {status: 0})
        .orderBy("cart.deadline", "ASC") // les carts les plus urgentes en premier
        .getMany()
        return res
    }
    
    public static async getTimeSlots() {
        console.log("[DBManager] Récupération des crénaux horaires dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Shipper)
        .createQueryBuilder("timeSlot")
        .select("shipper.disponibilities, shipper.id, shipper.price_max")
        .where("shipper.disponibilities <> :disponibilities", {disponibilities: null})
        .getMany()
        return res
    }

    public static async getDeliveries(shipper_id: number): Promise<Delivery[] | null> {
        console.log("[DBManager] Récupération des deliveries pour le shipper n°" + shipper_id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Delivery)
        .createQueryBuilder("delivery")
        .leftJoinAndSelect("delivery.shipper", "shipper")
        .where("delivery.shipper_id = :shipper_id", {shipper_id: shipper_id})
        .getMany()
        return res
    }

    public static async getCurrentDelivery(shipper_id: number): Promise<Delivery | null> {
        console.log("[DBManager] Récupération de la delivery courante pour le shipper n°" + shipper_id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Delivery)
        .createQueryBuilder("delivery")
        .leftJoinAndSelect("delivery.shipper", "shipper")
        .where("delivery.shipper_id = :shipper_id", {shipper_id: shipper_id})
        .getOne()
        return res
    }

    public static async getDeliverySummary(shipper_id: number): Promise<Delivery | null> {
        console.log("[DBManager] Récupération du recap de la livraison pour le shipper n°" + shipper_id + " dans la BDD")
        const delivery = await this.AppDataSource
        .getRepository(Delivery)
        .createQueryBuilder("delivery")
        .where("delivery.shipper_id = :shipper_id", {shipper_id: shipper_id})
        .where("delivery.status != :status", {status: 4})
        .leftJoinAndSelect("delivery.shipper", "shipper")
        .leftJoinAndSelect("delivery.carts", "cart")
        .leftJoinAndSelect("cart.items", "item")
        .leftJoinAndSelect("item.product", "product")
        .leftJoinAndSelect("shipper.user", "user")
        .getOne()

        return delivery
    }

    public static async getDeliveryProposalSummary(deliveryProposalId: number): Promise<DeliveryProposal | null> {
        console.log("[DBManager] Récupération du recap de la proposition livraison n°" + deliveryProposalId + " dans la BDD")
        const deliveryProposals = await this.AppDataSource
        .getRepository(DeliveryProposal)
        .createQueryBuilder("delivery_proposal")
        .where("delivery_proposal.id = :id", {id: deliveryProposalId})
        .leftJoinAndSelect("delivery_proposal.shipper", "shipper")
        .leftJoinAndSelect("delivery_proposal.carts", "cart")
        .leftJoinAndSelect("cart.items", "item")
        .leftJoinAndSelect("item.product", "product")
        .leftJoinAndSelect("shipper.user", "user")
        .orderBy('delivery_proposal.creation_date', 'ASC')
        .getOne()

        return deliveryProposals
    }

    public static async getDeliveryProposals(shipper_id: number): Promise<DeliveryProposal[] | null> {
        console.log("[DBManager] Récupération des delivery proposals pour le shipper n°" + shipper_id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(DeliveryProposal)
        .createQueryBuilder("delivery_proposal")
        .where("delivery_proposal.shipper_id = :shipper_id", {shipper_id: shipper_id})
        .getMany()
        return res
    }

    public static async getDeliveryProposalsNextID(): Promise<number> {
        console.log("[DBManager] Récupération de l'ID max des delivery proposals")
        const res = await this.AppDataSource
        .getRepository(DeliveryProposal)
        .createQueryBuilder("delivery_proposal")
        .orderBy('delivery_proposal.id', 'DESC')
        .getOne()
        return (res?.id ? res?.id : 0)
    }

    public static async getCategories(): Promise<Category[] | null> {
        console.log("[DBManager] Récupération des categories dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Category)
        .createQueryBuilder()
        .getMany()
        return res
    }

    public static async getProducts(category_id: number): Promise<Product[] | null> {
        console.log("[DBManager] Récupération des produits pour la catégorie n°" + category_id + " dans la BDD")
        const res = await this.AppDataSource
        .getRepository(Product)
        .createQueryBuilder("product")
        .where("product.category_id = :category_id", {category_id: category_id})
        .getMany()
        return res
    }

    public static async getFeaturedProducts(): Promise<FeaturedProduct[] | null> {
        console.log("[DBManager] Récupération des produits phares dans la BDD")
        const res = await this.AppDataSource
        .getRepository(FeaturedProduct)
        .createQueryBuilder("featured_product")
        .leftJoinAndSelect("featured_product.product", "product")
        .getMany()
        return res
    }

    public static async getTokens(userId: number): Promise<TokenResponse | null> {
        console.log("[DBManager] Récupération des tokens pour le user n°" + userId + " dans la BDD")
        const req = await this.AppDataSource
        .getRepository(OAuth)
        .createQueryBuilder("oauth")
        .where("oauth.user_id = :user_id", {user_id: userId})
        .getOne()
        
        if(req) {
            return {accessToken: req.access_token, refreshToken: req.refresh_token}
        } else {
            return null
        }

    }

    public static async addUser(user: UserDefault) {
        console.log("[DBManager] Ajout du user :")
        console.log(user)
        const req = await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .returning("id")
        .execute()

        const id: number = req.identifiers[0].id
        return id
    }

    public static async addShipper(shipper: Shipper) {
        console.log("[DBManager] Ajout du shipper :")
        console.log(shipper)

        const shipperFound = await this.AppDataSource
        .getRepository(Shipper)
        .createQueryBuilder("shipper")
        .where("shipper.user_id = :user_id", { user_id: shipper.user_id })
        .getOne()

        if (shipperFound === null) {
            await this.AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Shipper)
            .values(shipper)
            .execute()
        } else {
            await this.AppDataSource
            .createQueryBuilder()
            .update(Shipper)
            .set(shipper)
            .where("user_id = :user_id", { user_id: shipper.user_id })
            .execute()
        }


    }

    public static async addCart(cart: Cart, cartItems: CartItem[]) {
        console.log("[DBManager] Ajout de la cart :")
        console.log(cart)
        cart.status=0;

        // Le calcul du average_price de la cart se fait désormais côté application

        // On supprime les cart précédentes de l'utilisateur
        // On part du principe que chaque utilistaeur à une seule cart active à cahque fois
        const currentCart = await this.getCurrentCart(cart.owner_id)
        await this.AppDataSource
        .createQueryBuilder()
        .delete()
        .from(CartItem)
        .where("cart_id = :cart_id", { cart_id: currentCart ? currentCart.id : 0 })
        .execute()
        await this.AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Cart)
        .where("owner_id = :owner_id", { owner_id: cart.owner_id })
        .execute()

        const req = await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Cart)
        .values(cart)
        .returning("id")
        .execute()

        const cartId: number = req.identifiers[0].id
        cartItems.map(item => {item.cart_id = cartId; item.status = 0})

        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(CartItem)
        .values(cartItems)
        .execute()
    }

    public static async addDeliveryProposals(deliveryProposals: DeliveryProposal[]) {
        console.log("[DBManager] Ajout des delivery proposals : ", deliveryProposals)

        for(let deliveryProposal of deliveryProposals) {
            await this.AppDataSource.getRepository(DeliveryProposal).save(deliveryProposal)
        }
    }

    public static async addDeliveryProposal(delivery_proposal: DeliveryProposal) {
        console.log("[DBManager] Ajout de la delivery proposal :")
        console.log(delivery_proposal)
        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(DeliveryProposal)
        .values(delivery_proposal)
        .execute()
    }


    public static async addProduct(product: Product) {
        console.log("[DBManager] Ajout du produit :")
        console.log(product)
        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .execute()
    }

    public static async updateCartStatus(cartId: number, status: number) {
        console.log("[DBManager] Mise à jour du status de la cart n°" + cartId + " dans la BDD")
        await this.AppDataSource
        .createQueryBuilder()
        .update(Cart)
        .set({status: status})
        .where("id = :id", {id: cartId})
        .execute()
    }

    public static async cancelCart(cartId: number) {
        console.log("[DBManager] Suppression de la cart n°" + cartId + " dans la BDD")

        // On supprime d'abord les cart_item
        await this.AppDataSource
        .createQueryBuilder()
        .delete()
        .from(CartItem)
        .where("cart_id = :cart_id", {cart_id: cartId})
        .execute()

        await this.AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Cart)
        .where("id = :id", {id: cartId})
        .execute()
    }

    public static async acceptDeliveryProposal(deliveryProposalId: number) {
        console.log("[DBManager] Acceptation de la delivery proposal n°" + deliveryProposalId + " dans la BDD")

        const deliveryProposal = (await this.AppDataSource.getRepository(DeliveryProposal).find({
            relations: {
                carts: true,
            },
            where: {
                id: deliveryProposalId
            },
            take: 1
        }))[0]

        if (deliveryProposal === undefined) {
            return
        }

        await this.AppDataSource
        .createQueryBuilder()
        .update(Cart)
        .set({delivery_proposal_id: null, status: 1})
        .where("delivery_proposal_id = :id", {id: deliveryProposalId})
        .execute()

        // On supprime toutes les delivery proposals précédentes de l'utilisateur lors de l'accéptation d'une delivery proposal
        await this.AppDataSource
        .createQueryBuilder()
        .delete()
        .from(DeliveryProposal)
        .where("shipper_id = :id", {id: deliveryProposal.shipper_id})
        .execute()

        let delivery = new Delivery()
        delivery.carts = deliveryProposal.carts
        delivery.shipper_id = deliveryProposal.shipper_id
        delivery.deadline = deliveryProposal.carts.map(cart => cart.deadline).reduce((a, b) => a < b ? a : b)
        delivery.status = 0
        await this.AppDataSource.getRepository(Delivery).save(delivery)
    }

    public static async updateDeliveryStatus(deliveryId: number, status: number) {
        console.log("[DBManager] Mise à jour du status de la livraison n°" + deliveryId + " dans la BDD")
        await this.AppDataSource
        .createQueryBuilder()
        .update(Delivery)
        .set({status: status})
        .where("id = :id", {id: deliveryId})
        .execute()
    }

    public static async startDeliveryShopping(deliveryId: number) {
        console.log("[DBManager] Début de l'achat pour la commande " + deliveryId + " !")
        await this.updateDeliveryStatus(deliveryId, 1)
    }

    /**
     * Permet d'update les carts, les prix, les status des cart_items suite à l'achat
     * @param deliveryId 
     * @param carts les carts mises à jour i.e avec le status des carts items mis à jour et le price_to_pay mis à jour
     */
    public static async endDeliveryShopping(deliveryId: number, carts: Cart[]) {
        console.log("[DBManager] Fin de l'achat pour la commande " + deliveryId + " !")
        await this.updateDeliveryStatus(deliveryId, 2)

        console.log("[DBManager] Mis à jour des prix finaux pour la commande " + deliveryId + " !")
        // On met à jour les price_to_pay envoyés par le livreur
        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Cart)
        .values(carts)
        .orUpdate(
            ["status", "price_to_pay"],
            ["id"],
            {
                skipUpdateIfNoValuesChanged: true,
            }
        )
        .execute()

        console.log("[DBManager] Mis à jour des status des cart_items pour la commande " + deliveryId + " !")
        const items = carts.reduce((acc, cur) => acc.concat(cur.items), [] as CartItem[])
        // On met à jour les status des items (trouvés ou pas) envoyés par le livreur
        await this.AppDataSource
        .createQueryBuilder()
        .insert()
        .into(CartItem)
        .values(items)
        .orUpdate(
            ["status"],
            ["id"],
            {
                skipUpdateIfNoValuesChanged: true,
            }
        )
        .execute()
    }

    static async depositDelivery(deliveryId: number) {
        const availableLockerId = Locker.getAvailableLocker()
        console.log("[DBManager] Dépôt de la commande " + deliveryId + " au locker n°" + availableLockerId)
        await this.AppDataSource
        .createQueryBuilder()
        .update(Delivery)
        .set({status: 3, locker_id: availableLockerId})
        .where("id = :id", {id: deliveryId})
        .execute()
    }

    static async retreiveDelivery(deliveryId: number, retreived: boolean) {
        if (retreived) {
            console.log("[DBManager] Récupération correcte de la commande " + deliveryId)
            await this.updateDeliveryStatus(deliveryId, 4)

            // On peut supprimer les carts associés à cette delivery
            await this.AppDataSource
                .createQueryBuilder()
                .delete()
                .from(Cart)
                .where("delivery_id = :delivery_id", { delivery_id: deliveryId})

        } else {
            console.log("[DBManager] Problème lors de la récupération de la commande " + deliveryId)
            await this.updateDeliveryStatus(deliveryId, 5)
        }
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

