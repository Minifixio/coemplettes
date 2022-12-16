import { AppDataSource } from "./data-source";

export class DB {
    constructor() {
        this.initialize()
    }

    private initialize() {
        AppDataSource.initialize()
        .then(() => {
            console.log("Base de donnée initilaisée!")
        })
        .catch((error) => console.log(error))
    }
}

