import { DataSource } from 'typeorm';
import { db_password } from './credentials';
import { Shipper } from './entities/Shipper';
import { User } from './entities/User';


// Les entités sont référencées dans le dossier /entities
// On ne fait que traduire les données de la base de donnée en TypeScript
// Pour les types utilisés pour MariaDB, voir : https://orkhan.gitbook.io/typeorm/docs/entities#column-types-for-mysql-mariadb
export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port:5000,
    username:"admin",
    database: "COEMP",
    password:db_password,
    logging: true,
    entities: [User, Shipper]
})