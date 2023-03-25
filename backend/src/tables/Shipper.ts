import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm"
import { Delivery } from "./Delivery"

@Entity({name: "shippers"})
export class Shipper {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "int", nullable:false })
    user_id!: number

    @Column({ type: "int", nullable:false })
    capacity!: number

    @Column({ type: "boolean", nullable:false })
    has_car!: boolean

    @Column({ type: "int", nullable:true })
    deliveries_count!: number

    @Column({ type: "int", nullable:false })
    price_max!: number

    @Column({ type: "varchar", nullable:true })
    drive!: string

    @Column({ type: "boolean", nullable:true })
    shop!: boolean

    @Column({ type: "varchar", nullable:true })
    disponibilities!: string

    @OneToMany(() => Delivery, (delivery) => delivery.shipper)
    deliveries!: Delivery[]
}