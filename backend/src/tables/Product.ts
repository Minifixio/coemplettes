import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "products"})
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar", length: 50, nullable:false })
    name!: string

    @Column({ type: "varchar", length: 255, nullable:false })
    brand!: string

    @Column({ type: "int", nullable:false })
    reference!: number

    @Column({ type: "varchar", length: 25, nullable:false })
    quantity_type!: string

    @Column({ type: "varchar", length: 100, nullable:false })
    description!: string

    @Column({ type: "int", nullable:true })
    category_id!: number

    @Column({ type: "varchar", nullable:true })
    icon_link!: string

    @Column({ type: "float", nullable:false })
    average_price!: number
}