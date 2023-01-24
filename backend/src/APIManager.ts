import express, { Express, Request, Response } from 'express';
import { DB } from './DBManager';
import { EntryPoint } from './models/EntryPoint';

const port = 3000;

export class API {
    port: number
    tag:string | undefined
    app = {} as Express

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
    constructor(port:number, tag?:string) {
        console.log(`[${tag}] Initialisation de l\'api`)
        this.port=port
        this.tag=tag
        this.initeApp()
        this.initEntryPoints()
    }

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

    private initeApp() {
        this.app = express();
        this.app.listen(port, () => {
            console.log(`Le serveur est live à l'adresse : https://localhost:${port}`);
        });
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Backend CoEmplettes !');
        });
    }

    private async initGETwithParams(entryPointName: string, paramName: string, callback: ((c: any) => Promise<any>)) {
        console.log(`Init GET ${entryPointName} with param ${paramName}`)
        this.app.get(`/${entryPointName}/:${paramName}`, async (req: Request, res: Response) => {
            const data = await callback(req.params[paramName])
            res.send(data)
        })
    }

    private async initGETnoParams(entryPointName: string, callback: (() => Promise<any>)) {
        console.log(`Init GET ${entryPointName} with no params`)
        this.app.get(`/${entryPointName}`, async (req: Request, res: Response) => {
            const data = await callback()
            res.send(data)
        })
    }

    private async initPOST(entryPointName: string, callback: ((c: any) => Promise<any>)) {
        console.log(`Init POST ${entryPointName}`)
        this.app.post(`/${entryPointName}`, async (req: Request, res: Response) => {
            const data = await callback(req.body)
            res.send(data)
        })
    }
}


