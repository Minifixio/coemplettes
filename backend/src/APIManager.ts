import express, { Express, Request, Response } from 'express';
import { DB } from './DBManager';
import { EntryPoint } from './models/EntryPoint';

const port = 3000;

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
        {method: "GET", entryPointName: "carts", paramName: null, callbackNoParam: () => DB.getCarts()},
        {method: "GET", entryPointName: "cart", paramName: "id", callbackParam: (id: number) => DB.getCartByID(id)},
        {method: "GET", entryPointName: "deliveries", paramName: null, callbackNoParam: () => DB.getDeliveries()},
        {method: "GET", entryPointName: "delivery", paramName: "id", callbackParam: (id: number) => DB.getDeliveryByID(id)},
        {method: "GET", entryPointName: "products", paramName: null, callbackNoParam: () => DB.getProducts()},
        {method: "GET", entryPointName: "product", paramName: "id", callbackParam: (id: number) => DB.getProductByID(id)},
        {method: "GET", entryPointName: "categories", paramName: null, callbackNoParam: () => DB.getCategories()},
    ]

    // On passe en param le port et le tag qui sera dans l'URL d'appel de l'API
    // le tag? signifie que ce dernier n'est pas indispensable à passer en paramètre
    constructor(port:number, tag?:string) {
        console.log(`[${tag}] Initialisation de l\'api`)
        this.port=port
        this.tag=tag
        this.initApp()
        this.initEntryPoints()
    }

    /** 
     * On itilialise les entrypoints en mappant à chaque fois les fonctions associées à chaque entrypoint
     */
    private initEntryPoints() {
        console.log('Initilisation des entry-points!')
        this.entryPoints.forEach(ep => {
            if (ep.method === "GET") {
                if (ep.paramName && ep.callbackParam) {
                    this.initGETwithParams(ep.entryPointName, ep.paramName, ep.callbackParam)
                } else if (ep.callbackNoParam) {
                    this.initGETnoParams(ep.entryPointName, ep.callbackNoParam)
                }
            } else if (ep.method === "POST") {
                if (ep.callbackNoParam) {
                    this.initPOST(ep.entryPointName, ep.callbackNoParam)
                }
            }
        })
    }

    /**
     * On itialise l'App
     */
    private initApp() {

        // On crée un objet Express (API)
        this.app = express();

        // On le fait écouter sur le port en quesiton
        this.app.listen(port, () => {
            console.log(`Le serveur est live à l'adresse : https://localhost:${port}`);
        });

        // On dit que l'entrée '/' (par défaut) ous donne un message esxpliquant que l'application fonctionne
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Backend CoEmplettes !');
        });
    }

    /**
     * Initialisation d'une entrée GET avec un paramètre
     * Un paramètre est un objet du genre 'id' pour un utilisateur
     * Il s'appelle lorsque l'on souhaite récupérer des données en rapport avec ce paramètre
     * Exemple : 'GET localhost:3000/user/12' pour récupérer les données de l'utilisateur 12
     */
    private async initGETwithParams(entryPointName: string, paramName: string, callback: ((c: any) => Promise<any>)) {
        console.log(`Init GET ${entryPointName} with param ${paramName}`)
        // Pour récupérer le paramètre dans Express la syntaxe est :
        // app.get(`/entryPointName/:paramName) avec les ':'
        this.app.get(`/${entryPointName}/:${paramName}`, async (req: Request, res: Response) => {
            const data = await callback(req.params[paramName])
            res.send(data)
        })
    }

    /**
     * Initialisation d'une entrée GET sans paramètre
     */
    private async initGETnoParams(entryPointName: string, callback: (() => Promise<any>)) {
        console.log(`Init GET ${entryPointName} with no params`)
        this.app.get(`/${entryPointName}`, async (req: Request, res: Response) => {
            const data = await callback()
            res.send(data)
        })
    }


    /**
     * Initialisation d'une entrée POST
     */
    private async initPOST(entryPointName: string, callback: ((c: any) => Promise<any>)) {
        console.log(`Init POST ${entryPointName}`)
        this.app.post(`/${entryPointName}`, async (req: Request, res: Response) => {
            const data = await callback(req.body)
            res.send(data)
        })
    }
}


