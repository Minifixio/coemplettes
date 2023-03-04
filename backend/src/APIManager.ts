import express, { Express, NextFunction, Request, Response } from 'express';

import { DB } from './DBManager';
import { EntryPoint } from './models/EntryPoint';
import { Cart } from './tables/Cart';
import { DeliveryProposal } from './tables/DeliveryProposal';
import { Product } from './tables/Product';
import { Shipper } from './tables/Shipper';
import { User } from './tables/User';
import { AuthManager } from './AuthManager';
import { AuthError, AuthErrors } from './models/AuthErrors';

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
        {method: "GET", entryPointName: "users", paramName: null, callbackNoParam: () => DB.getUsers()},
        {method: "GET", entryPointName: "user", paramName: "id", callbackParam: (id: number) => DB.getUserByID(id)},

        {method: "GET", entryPointName: "shippers", paramName: null, callbackNoParam: () => DB.getShippers()},
        {method: "GET", entryPointName: "shipper", paramName: "id", callbackParam: (id: number) => DB.getShipperByID(id)},

        {method: "GET", entryPointName: "products", paramName: "category_id", callbackParam: (category_id: number) => DB.getProducts(category_id)},
        {method: "GET", entryPointName: "product", paramName: "id", callbackParam: (id: number) => DB.getProductByID(id)},

        {method: "GET", entryPointName: "featured_products", paramName: null, callbackNoParam: () => DB.getFeaturedProducts()},

        {method: "GET", entryPointName: "carts", paramName: "owner_id", callbackParam: (owner_id: number) => DB.getCarts(owner_id)},
        {method: "GET", entryPointName: "cart", paramName: "id", callbackParam: (id: number) => DB.getCartByID(id)},
        
        {method: "GET", entryPointName: "deliveries", paramName: "shipper_id", callbackParam: (shipper_id: number) => DB.getDeliveries(shipper_id)},
        {method: "GET", entryPointName: "delivery", paramName: "id", callbackParam: (id: number) => DB.getDeliveryByID(id)},

        {method: "GET", entryPointName: "delivery_proposals", paramName: "shipper_id", callbackParam: (shipper_id: number) => DB.getDeliveryProposals(shipper_id)},
        {method: "GET", entryPointName: "delivery_proposal", paramName: "id", callbackParam: (id: number) => DB.getDeliveryProposalByID(id)},

        {method: "GET", entryPointName: "categories", paramName: null, callbackNoParam: () => DB.getCategories()},

        {method: "POST", entryPointName: "user", paramName: null, callbackParam: (user: User) => DB.addUser(user)},
        {method: "POST", entryPointName: "shipper", paramName: null, callbackParam: (shipper: Shipper) => DB.addShipper(shipper)},
        {method: "POST", entryPointName: "cart", paramName: null, callbackParam: (cart: Cart) => DB.addCart(cart)},
        {method: "POST", entryPointName: "delivery_proposal", paramName: null, callbackParam: (delivery_proposal: DeliveryProposal) => DB.addDeliveryProposal(delivery_proposal)},
        {method: "POST", entryPointName: "product", paramName: null, callbackParam: (product: Product) => DB.addProduct(product)},
    ]

    authMiddleware = async (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const accessToken = authHeader.split(' ')[1]
            const userId = req.query.user_id
            if (userId) {
                const user = await DB.getUserByID(userId)

                if (!user) {
                    res.status(401).json({
                        "error": "user_unknown",
                        "error_message": "user_id inconnu"
                    })
                } else {
                    const validAccess = await AuthManager.checkAuth(userId, accessToken)

                    if (validAccess) {
                        next()
                    } else {
                        res.status(401).json({
                            "error": "invalid_access_token",
                            "error_message": "access_token invalide"
                        })
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
        console.log(`[${tag}] Initialisation de l\'api\n`)
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
            console.log(`Le serveur est live à l'adresse : https://localhost:${this.port}\n`);
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
        console.log('Initilisation des entry-points!\n')
        this.entryPoints.forEach(ep => {
            if (ep.method === "GET") {
                if (ep.paramName && ep.callbackParam) {
                    this.initGETwithParams(ep.entryPointName, ep.paramName, ep.callbackParam)
                } else if (ep.callbackNoParam) {
                    this.initGETnoParams(ep.entryPointName, ep.callbackNoParam)
                }
            } else if (ep.method === "POST") {
                if (ep.callbackParam) {
                    this.initPOST(ep.entryPointName, ep.callbackParam)
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
    private initGETwithParams(entryPointName: string, paramName: string, callback: ((c: any) => Promise<any>)) {
        console.log(`Init GET ${entryPointName} with param ${paramName}`)
        // Pour récupérer le paramètre dans Express la syntaxe est :
        // app.get(`/entryPointName/:paramName) avec les ':'
        this.app.get(`/${entryPointName}/:${paramName}`, this.authMiddleware, async (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) => {
            const data = await callback(req.params[paramName])
            res.send(data)
        })
    }

    /**
     * Initialisation d'une entrée GET sans paramètre
     */
    private initGETnoParams(entryPointName: string, callback: (() => Promise<any>)) {
        console.log(`Init GET ${entryPointName} with no params`)
        this.app.get(`/${entryPointName}`, this.authMiddleware, async (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) => {
            const data = await callback()
            res.send(data)
        })
    }


    /**
     * Initialisation d'une entrée POST
     */
    private initPOST(entryPointName: string, callback: ((c: any) => Promise<any>)) {
        console.log(`Init POST ${entryPointName}`)
        this.app.post(`/${entryPointName}`, this.authMiddleware, async (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) => {
            console.log(req.body)
            const data = await callback(req.body)
            res.sendStatus(200)
        })
    }

    private initAuth() {
        console.log("Initialisation du système d'autehntification\n")
        this.app.post('/register', async (req: Request, res: Response) => {

            const user = req.body.user
            const password = req.body.password

            console.log('Register user :')
            console.log(user)
            console.log('\n')

            try {
                const userId = await AuthManager.register(user, password)
                const tokens = await AuthManager.getTokens(userId)
                res.status(200).json(tokens)
            } catch (e: any) {
                res.status(401).json(e)
            }

        })

        this.app.post('/login', async (req: Request, res: Response) => {
            const email = req.body.email
            const password = req.body.password

            console.log(`Login user : ${email}\n`)

            try {
                const userId = await AuthManager.login(email, password)
                const tokens = await AuthManager.generateAuth(userId)
                res.send(tokens)
            } catch (e: any) {
                res.status(401).json(e)
            }
        })
        
        this.app.post('/refresh', async (req: Request, res: Response) => {
            const email = req.body.email
            const refreshToken = req.body.refresh_token

            console.log(`Refresh user : ${email}\n`)

            try {
                const tokens = await AuthManager.refreshAuth(email, refreshToken)
                res.send(tokens)
            } catch (e: any) {
                res.status(401).json(e)
            }
        })
    }
}


