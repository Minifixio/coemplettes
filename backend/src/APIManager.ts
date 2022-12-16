import express, { Express, Request, Response } from 'express';

const port = 3000;


export class API {
    port: number
    tag:string
    app = {} as Express

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
}


