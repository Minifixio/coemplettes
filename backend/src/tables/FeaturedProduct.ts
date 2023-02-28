import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "featured_products"})
export class FeaturedProduct {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "int" })
    product_id!: string
}