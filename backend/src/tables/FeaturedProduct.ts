import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { Product } from "./Product"

@Entity({name: "featured_products"})
export class FeaturedProduct {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "int" })
    product_id!: string

    @OneToOne(() => Product, (product) => product.id)
    @JoinColumn({ name: "product_id" })
    product!: Product
}