import { DataSource } from 'typeorm';
import { db_password } from './credentials';
import { Cart } from './tables/Cart';
import { CartItem } from './tables/CartItem';
import { Category } from './tables/Category';
import { Delivery } from './tables/Delivery';
import { DeliveryProposal } from './tables/DeliveryProposal';
import { Product } from './tables/Product';
import { Shipper } from './tables/Shipper';
import { Supermarket } from './tables/Supermarket';
import { SupermarketProduct } from './tables/SupermarketProduct';
import { User } from './tables/User';


// Les entités sont référencées dans le dossier /entities
// On ne fait que traduire les données de la base de donnée en TypeScript
// Pour les types utilisés pour MariaDB, voir : https://orkhan.gitbook.io/typeorm/docs/entities#column-types-for-mysql-mariadb
export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3036,
    username:"admin",
    database: "COEMP",
    password:db_password,
    logging: true,
    entities: [User, Shipper, Product, Category, Cart, CartItem, Delivery, DeliveryProposal, Supermarket, SupermarketProduct]
})