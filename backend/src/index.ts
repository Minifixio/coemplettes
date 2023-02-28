import { API } from './APIManager'
import { DB } from './DBManager'
import * as dotenv from 'dotenv'
dotenv.config()

let dbPort: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

async function main() {
    await DB.initialize(dbPort)
    const api = new API(3000, 'api')
}

main()