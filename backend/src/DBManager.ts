import { AppDataSource } from "./data-source";
import { User } from "./entities/User";

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
}

