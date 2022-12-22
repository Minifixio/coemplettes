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

    @Column({ type: "int", nullable:true })
    weight!: number

    @Column({ type: "int", nullable:false })
    quantity!: number

    @ManyToOne(type => Cart, cart => cart)
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