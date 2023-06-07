import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm"
import { Cart } from "./Cart"
import { Delivery } from "./Delivery"
import { User } from "./User"

@Entity({name: "shippers"})
export class Shipper {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "int", nullable:false })
    user_id!: number

    @Column({ type: "int", nullable:false })
    capacity!: number

    // Indique si le livreur a une voiture ou non
    @Column({ type: "boolean", nullable:false })
    has_car!: boolean

    // Indique si le livreur peut aller au Drive ou non
    @Column({ type: "boolean", nullable:true })
    drive!: boolean

    // Indique si le livreur peut aller en magasin ou non
    @Column({ type: "boolean", nullable:true })
    shop!: boolean

    @Column({ type: "int", nullable:true })
    deliveries_count!: number

    @Column({ type: "int", nullable:false })
    price_max!: number

    @Column({ type: "varchar", nullable:true })
    disponibilities!: string

    @OneToMany(() => Delivery, (delivery) => delivery.shipper)
    deliveries!: Delivery[]

    @OneToOne(() => User, (user) => user.shipper)
    @JoinColumn(
        { name: 'user_id', referencedColumnName: 'id'}
    )
    user!: User
}