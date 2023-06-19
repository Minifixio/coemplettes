import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Cart } from "./Cart"
import { Product } from "./Product"

@Entity({name: "cart_items"})
export class CartItem {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "int", nullable:false })
    cart_id!: number

    @Column({ type: "int", nullable:false })
    product_id!: number

    @Column({ type: "int", nullable:false })
    quantity!: number

    // Indique si l'item a pu être acheté ou pas
    // 0 = le produit n'a pas encore été acheté (i.e le livreur n'a pas encore fait sa livraison)
    // 1 = le produit a pu être acheté par le livreur
    // 2 = le produit n'a pas pu être trouvé par le livreur
    @Column({ type: "int", nullable:false })
    status!: number

    @ManyToOne(() => Cart, (cart) => cart.items)
    @JoinColumn(
        { name: 'cart_id', referencedColumnName: 'id'}
    )
    cart!: Cart

    @ManyToOne(type => Product, product => product)
    @JoinColumn(
        { name: 'product_id', referencedColumnName: 'id'}
    )
    product!: Product
}