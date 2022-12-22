import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "products"})
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar", length: 25, nullable:false })
    product_type!: string

    @Column({ type: "int", nullable:false })
    average_price!: number
}