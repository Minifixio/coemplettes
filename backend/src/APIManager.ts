import express, { Express, Request, Response } from 'express';

const port = 3000;

export class API {
    port: number
    tag:string
    app = {} as Express

    // On passe en param le port et le tag qui sera dans l'URL d'appel de l'API
    constructor(port:number, tag:string) {
        console.log(`[${tag}] Initialisation de l\'api`)
        this.port=port
        this.tag=tag
        this.initialize()
    }

    private initialize() {
        this.app = express();
        this.app.listen(port, () => {
            console.log(`Le serveur est live à l'adresse : https://localhost:${port}`);
        });
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Backend CoEmplettes !');
        });
    }

    private initializeGETparam(entryPointName: string, paramName: string, callback: ((c: any) => Promise<any>)) {
        this.app.get(`/${entryPointName}/:${paramName}`, async (req: Request, res: Response) => {
            const data = await callback(req.params[paramName])
        })
    }
}


