import { API } from './APIManager'
import { DB } from './DBManager'

async function main() {
    const api = new API(3000, 'api')
    const db = new DB()
    await db.initialize()
    db.writeFromJSON("products") 
}

main()