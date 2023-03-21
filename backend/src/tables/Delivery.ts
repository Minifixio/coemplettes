import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Cart } from "./Cart"
import { Shipper } from "./Shipper"

@Entity({name: "deliveries"})
export class Delivery {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "int", nullable:false })
    shipper_id!: number

    @Column({ type: "datetime", nullable:false })
    deadline!: Date
    
    @Column({ type: "int", nullable:true })
    status!: number

    @ManyToOne(type => Shipper, shipper => shipper)
    @JoinColumn(
        { name: 'shipper_id', referencedColumnName: 'user_id'}
    )
    shipper!: Shipper

    @OneToMany(() => Cart, (cart) => cart.delivery)
    carts!: Cart[]
}