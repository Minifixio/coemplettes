import { API } from './APIManager'
import { DB } from './DBManager'
import { CronJobs }  from './CronManager'
import * as dotenv from 'dotenv'
dotenv.config()

let dbPort: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
let devCRON = process.env.developmentCRON ? process.env.developmentCRON : false

async function main() {
    await DB.initialize(dbPort)
    const api = new API(3000, 'api')
    if (devCRON) {CronJobs.initCron()}
}

main()
