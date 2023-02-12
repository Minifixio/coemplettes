import { DataSource } from 'typeorm';
import { db_password } from './credentials';
import { Cart } from './entities/Cart';
import { CartItem } from './entities/CartItem';
import { Category } from './entities/Category';
import { Delivery } from './entities/Delivery';
import { DeliveryProposal } from './entities/DeliveryProposal';
import { Product } from './entities/Product';
import { Shipper } from './entities/Shipper';
import { Supermarket } from './entities/Supermarket';
import { SupermarketProduct } from './entities/SupermarketProduct';
import { User } from './entities/User';


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