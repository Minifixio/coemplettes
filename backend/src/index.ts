import { API } from './APIManager'
import { DB } from './DBManager'
import { GroupedCommands } from './GroupedCommands'
import * as dotenv from 'dotenv'
import cron from 'node-cron';
dotenv.config()

let dbPort: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

async function main() {
    await DB.initialize(dbPort)
    const api = new API(3000, 'api')
    cronCommands()
}

async function cronCommands() {
    // Do not cron commands in development
    if (process.env.developmentCRON === 'true') {
        GroupedCommands.cron();
    }else{
        cron.schedule('* * * * *', () => {
            console.log('running a task every minute')
        });
    }
    
}

main()
