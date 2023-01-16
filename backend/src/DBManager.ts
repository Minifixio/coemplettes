import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import * as fs from 'fs';
import * as path from 'path';

export class DB {
    constructor() {
    }

    public async initialize() {
        await AppDataSource.initialize()
        .then(() => {
            console.log("Base de donnée initilaisée!")
        })
        .catch((error) => console.log(error))
    }

    public async test() {
        const res = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.first_name = :first_name", { first_name: "John" })
        .getOne()
        return res
    }

    public async writeFromJSON(tableName: string) {
        fs.readFile(path.join(__dirname, `../assets/json/${tableName}.json`), 'utf8', async (error, data: any) => {
            const parsedData = JSON.parse(data)[tableName]
            await AppDataSource
                .createQueryBuilder()
                .insert()
                .into(tableName)
                .values(parsedData)
                .execute()
        })
    }
}

