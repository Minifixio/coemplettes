import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany } from "typeorm"
import { Delivery } from "./Delivery"
import { User } from "./User"

@Entity({name: "carts"})
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "int", nullable:false })
    owner_id!: number

    @Column({ type: "int", nullable:false })
    delivery_id!: number

    // A voir sur la syntaxe : default: () => "CURRENT_TIMESTAMP"
    @Column({ type: "datetime", nullable:false, default: () => "CURRENT_TIMESTAMP" })
    creation_date!: Date

    @Column({ type: "datetime", nullable:false })
    deadline!: Date
    
    @Column({ type: "int", nullable:false })
    status!: number

    @ManyToMany(type => User, owner => owner)
    @JoinColumn(
        { name: 'owner_id', referencedColumnName: 'id'}
    )
    owner!: User

    @ManyToOne(type => Delivery, delivery => delivery)
    @JoinColumn(
        { name: 'delivery_id', referencedColumnName: 'id'}
    )
    delivery!: Delivery
}