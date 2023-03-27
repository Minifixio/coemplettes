import express, { Express, NextFunction, Request, Response } from 'express';

import { DB } from './DBManager';
import { EntryPoint } from './models/EntryPoint';
import { Cart } from './tables/Cart';
import { DeliveryProposal } from './tables/DeliveryProposal';
import { Product } from './tables/Product';
import { Shipper } from './tables/Shipper';
import { User } from './tables/User';
import { AuthManager } from './AuthManager';
import { Locker } from './LockerManager';
import { AuthError, AuthErrors } from './models/AuthErrors';
import { CartItem } from './tables/CartItem';
import { GroupedCommands } from './GroupedCommands';

var bodyParser = require('body-parser')

interface RequestParams {
    [key: string]: string;
}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
    user_id: number;
}

export class API {

    port: number // Le port sur lequel on expose l'API
    tag:string | undefined // Tag (pas essentiel) : les URLs d'API seront du type {ip_machine}:3000/{tag}/...
    app = {} as Express // L'objet Express qui est notre objet API

    // Les entrypoints avec les différents noms d'entrée et les fonctions associés à chaque appel
    // Il y a aussi les méthodes utilisés : GET, POST...
    entryPoints: Array<EntryPoint> = [
        {method: "GET", entryPointName: "users", paramName: null, auth: true, callbackNoParam: () => DB.getUsers()},
        {method: "GET", entryPointName: "user", paramName: "id", auth: true, callbackParam: (id: number) => DB.getUserByID(id)},

        {method: "GET", entryPointName: "shippers", paramName: null, auth: true, callbackNoParam: () => DB.getShippers()},
        {method: "GET", entryPointName: "available_shippers", paramName: null, auth: false, callbackNoParam: () => DB.getAvailableShippers()},
        {method: "GET", entryPointName: "shipper", paramName: "id", auth: true, callbackParam: (id: number) => DB.getShipperByID(id)},

        {method: "GET", entryPointName: "products", paramName: "category_id", auth: true, callbackParam: (category_id: number) => DB.getProducts(category_id)},
        {method: "GET", entryPointName: "product", paramName: "id", auth: true, callbackParam: (id: number) => DB.getProductByID(id)},

        {method: "GET", entryPointName: "featured_products", paramName: null, auth: true, callbackNoParam: () => DB.getFeaturedProducts()},

        {method: "GET", entryPointName: "carts", paramName: "owner_id", auth: true, callbackParam: (owner_id: number) => DB.getCarts(owner_id)},
        {method: "GET", entryPointName: "cart", paramName: "id", auth: true, callbackParam: (id: number) => DB.getCartByID(id)},
        {method: "GET", entryPointName: "current_cart", paramName: "owner_id", auth: true, callbackParam: (owner_id: number) => DB.getCurrentCart(owner_id)},

        {method: "GET", entryPointName: "deliveries", paramName: "shipper_id", auth: true, callbackParam: (shipper_id: number) => DB.getDeliveries(shipper_id)},
        {method: "GET", entryPointName: "delivery", paramName: "id", auth: true, callbackParam: (id: number) => DB.getDeliveryByID(id)},
        {method: "GET", entryPointName: "current_delivery", paramName: "shipper_id", auth: true, callbackParam: (shipper_id: number) => DB.getCurrentDelivery(shipper_id)},
        {method: "GET", entryPointName: "delivery_summary", paramName: "shipper_id", auth: false, callbackParam: (shipper_id: number) => DB.getDeliverySummary(shipper_id)},
        {method: "GET", entryPointName: "delivery_deadline", paramName: "delivery_id", auth: true, callbackParam: (delivery_id: number) => DB.getDeliveryDeadline(delivery_id)},

        {method: "GET", entryPointName: "delivery_proposals", paramName: "shipper_id", auth: true, callbackParam: (shipper_id: number) => DB.getDeliveryProposals(shipper_id)},
        {method: "GET", entryPointName: "delivery_proposal", paramName: "id", auth: true, callbackParam: (id: number) => DB.getDeliveryProposalByID(id)},
        {method: "GET", entryPointName: "delivery_proposal_summary", paramName: "delivery_proposal_id", auth: true, callbackParam: (delivery_proposal_id: number) => DB.getDeliveryProposalSummary(delivery_proposal_id)},

        {method: "GET", entryPointName: "categories", paramName: null, auth: true, callbackNoParam: () => DB.getCategories()},

        {method: "GET", entryPointName: "lockers", paramName: null, auth: false, callbackNoParam: () => Locker.getLockersStates()},

        {method: "POST", entryPointName: "user", paramName: null, auth: true, callbackParam: (user: User) => DB.addUser(user)},
        {method: "POST", entryPointName: "shipper", paramName: null, auth: true, callbackParam: (shipper: Shipper) => DB.addShipper(shipper)},
        {method: "POST", entryPointName: "cart", paramName: null, auth: true, callbackParam: (data: {cart: Cart, cart_items: CartItem[]}) => DB.addCart(data.cart, data.cart_items)},
        {method: "POST", entryPointName: "delivery_proposal", paramName: null, auth: true, callbackParam: (delivery_proposal: DeliveryProposal) => DB.addDeliveryProposal(delivery_proposal)},
        {method: "POST", entryPointName: "product", paramName: null, auth: true, callbackParam: (product: Product) => DB.addProduct(product)},        
        {method: "POST", entryPointName: "cart_status", paramName: null, auth: true, callbackParam: (data: {cart_id: number, status: number}) => DB.updateCartStatus(data.cart_id, data.status)},  
        {method: "POST", entryPointName: "cart_cancel", paramName: null, auth: true, callbackParam: (data: {cart_id: number}) => DB.cancelCart(data.cart_id)},  

        {method: "POST", entryPointName: "delivery_proposal_accept", paramName: null, auth: false, callbackParam: (data: {delivery_proposal_id: number}) => DB.acceptDeliveryProposal(data.delivery_proposal_id)},  
        {method: "POST", entryPointName: "delivery_status", paramName: null, auth: true, callbackParam: (data: {delivery_id: number, status: number}) => DB.updateDeliveryStatus(data.delivery_id, data.status)},  
        {method: "POST", entryPointName: "delivery_start_shopping", paramName: null, auth: true, callbackParam: (data: {delivery_id: number}) => DB.startDeliveryShopping(data.delivery_id)},
        {method: "POST", entryPointName: "delivery_end_shopping", paramName: null, auth: true, callbackParam: (data: {delivery_id: number, carts: Cart[]}) => DB.endDeliveryShopping(data.delivery_id, data.carts)},
        {method: "POST", entryPointName: "delivery_deposit", paramName: null, auth: true, callbackParam: (data: {delivery_id: number}) => DB.depositDelivery(data.delivery_id)},
        // On passe un paramètre 'retreive' boolean. 
        // retreive = true => la commande a été récupérée normalement
        // retreive = false => la commande n'a pas pu être récupérée i.e problème !
        {method: "POST", entryPointName: "delivery_retreive", paramName: null, auth: true, callbackParam: (data: {delivery_id: number, retreived: boolean}) => DB.retreiveDelivery(data.delivery_id, data.retreived)},

        {method: "POST", entryPointName: "generate_grouped_commands", paramName: null, auth: false, callbackParam: () => GroupedCommands.createGroupedCommands()},  

        {method: "POST", entryPointName: "open_locker", paramName: null, auth: false, callbackParam: (data: {locker_id: number}) => Locker.openLocker(data.locker_id)},
    ]

    authMiddleware = async (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const accessToken = authHeader.split(' ')[1]
            const userId = req.query.user_id
            console.log(`[API] Middleware > user_id : ${userId} & access_token : ${accessToken}\n`)

            if (userId) {
                const user = await DB.getUserByID(userId)

                if (!user) {
                    res.status(401).json({
                        "error": "user_unknown",
                        "error_message": "user_id inconnu"
                    })
                } else {
                    try {
                        await AuthManager.checkAuth(userId, accessToken)
                        next()
                    } catch (e: any) {
                        res.status(401).json(e)
                    }
                }

            } else {
                res.status(400).json({
                    "error": "user_id_missing",
                    "error_message": "user_id_missing non fourni"
                })
            }
        } else {
            res.status(400).json({
                "error": "auth_header_missing",
                "error_message": "fournir un authorization header"
            })
        }
    }

    // On passe en param le port et le tag qui sera dans l'URL d'appel de l'API
    // le tag? signifie que ce dernier n'est pas indispensable à passer en paramètre
    constructor(port:number, tag?:string) {
        console.log(`[API] Initialisation de l\'api\n`)
        this.port=port
        this.tag=tag
        this.initApp()
        this.initAuth()
        this.initEntryPoints()
    }

    /**
     * On itialise l'App
     */
    private initApp() {

        // On crée un objet Express (API)
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())

        // On le fait écouter sur le port en quesiton
        this.app.listen(this.port, () => {
            console.log(`[API] Le serveur est live à l'adresse : https://localhost:${this.port}\n`);
        });

        // On dit que l'entrée '/' (par défaut) ous donne un message esxpliquant que l'application fonctionne
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Backend CoEmplettes !');
        });
    }

    /** 
     * On itilialise les entrypoints en mappant à chaque fois les fonctions associées à chaque entrypoint
     */
    private initEntryPoints() {
        console.log('[API] Initilisation des entry-points!\n')
        this.entryPoints.forEach(ep => {
            if (ep.method === "GET") {
                if (ep.paramName && ep.callbackParam) {
                    this.initGETwithParams(ep.entryPointName, ep.paramName, ep.auth, ep.callbackParam)
                } else if (ep.callbackNoParam) {
                    this.initGETnoParams(ep.entryPointName, ep.auth, ep.callbackNoParam)
                }
            } else if (ep.method === "POST") {
                if (ep.callbackParam) {
                    this.initPOST(ep.entryPointName, ep.auth, ep.callbackParam)
                }
            }
        })
    }

    /**
     * Initialisation d'une entrée GET avec un paramètre
     * Un paramètre est un objet du genre 'id' pour un utilisateur
     * Il s'appelle lorsque l'on souhaite récupérer des données en rapport avec ce paramètre
     * Exemple : 'GET localhost:3000/user/12' pour récupérer les données de l'utilisateur 12
     */
    private initGETwithParams(entryPointName: string, paramName: string, auth: boolean, callback: ((c: any) => Promise<any>)) {
        console.log(`Init GET ${entryPointName} with param ${paramName}`)
        // Pour récupérer le paramètre dans Express la syntaxe est :
        // app.get(`/entryPointName/:paramName) avec les ':'

        if (auth) {
            this.app.get(`/${entryPointName}/:${paramName}`, this.authMiddleware, async (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) => {
                const data = await callback(req.params[paramName])
                res.send(data)
            })
        } else {
            this.app.get(`/${entryPointName}/:${paramName}`, async (req, res) => {
                const data = await callback(req.params[paramName])
                res.send(data)
            })
        }
    }

    /**
     * Initialisation d'une entrée GET sans paramètre
     */
    private initGETnoParams(entryPointName: string, auth: boolean, callback: (() => Promise<any>)) {
        console.log(`Init GET ${entryPointName} with no params`)
        if (auth) {
            this.app.get(`/${entryPointName}`, this.authMiddleware, async (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) => {
                const data = await callback()
                res.send(data)
            })
        } else {
            this.app.get(`/${entryPointName}`, async (req, res) => {
                const data = await callback()
                res.send(data)
            })
        }

    }


    /**
     * Initialisation d'une entrée POST
     */
    private initPOST(entryPointName: string, auth: boolean, callback: ((c: any) => Promise<any>)) {
        console.log(`[API] Init POST ${entryPointName}`)
        if(auth) {
            this.app.post(`/${entryPointName}`, this.authMiddleware, async (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) => {
                console.log(req.body)
                const data = await callback(req.body)
                res.sendStatus(200)
            })
        } else {
            this.app.post(`/${entryPointName}`, async (req, res) => {
                console.log(req.body)
                const data = await callback(req.body)
                res.sendStatus(200)
            })
        }
    }

    private initAuth() {
        console.log("[API] Initialisation du système d'autehntification\n")
        this.app.post('/register', async (req: Request, res: Response) => {

            const user = req.body.user
            const password = req.body.password

            console.log('[API] Register user :')
            console.log(user)
            console.log('\n')

            try {
                const userId = await AuthManager.register(user, password)
                const tokens = await AuthManager.getTokens(userId)
                res.status(200).json({user_id: userId, tokens})
            } catch (e: any) {
                res.status(401).json(e)
            }

        })

        this.app.post('/login', async (req: Request, res: Response) => {
            const email = req.body.email
            const password = req.body.password

            console.log(`[API] Login user : ${email}\n`)

            try {
                const userId = await AuthManager.login(email, password)
                const tokens = await AuthManager.getTokens(userId) 
                res.status(200).json({user_id: userId, tokens})
            } catch (e: any) {
                res.status(401).json(e)
            }
        })
        
        this.app.post('/refresh', async (req: Request, res: Response) => {
            const email = req.body.email
            const refreshToken = req.body.refresh_token

            console.log(`[API] Refresh user : ${email}\n`)

            try {
                const tokens = await AuthManager.refreshAuth(email, refreshToken)
                res.status(200).json(tokens)
            } catch (e: any) {
                res.status(401).json(e)
            }
        })
    }
}


