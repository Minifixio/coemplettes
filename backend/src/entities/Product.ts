import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "products"})
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar", length: 50, nullable:false })
    name!: string

    @Column({ type: "varchar", length: 25, nullable:false })
    quantity_type!: string

    @Column({ type: "varchar", nullable:false })
    category_id!: number

    @Column({ type: "varchar", nullable:false })
    icon_link!: string

    @Column({ type: "int", nullable:false })
    average_price!: number
}