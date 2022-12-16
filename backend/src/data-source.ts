import { DataSource } from 'typeorm';
import { db_password } from './credentials';
import { User } from './entities/user';

export const AppDataSource = new DataSource({
    type: "mariadb",
    url: "localhost",
    port:5000,
    username:"admin",
    password:db_password,
    entities: [User]
})