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

    @Column({ type: "datetime", nullable:true })
    deposit_date!: Date
    
    // 0 = la commande a été attribuée au livreur qui l'a accepté 
    // 1 = la commande est en cours d'achat
    // 2 = la commande a été achetée, en attente de dépôt au locker
    // 3 = la commande a été déposée au Locker
    // 4 = la commande a été récupérée normalement par le user sans soucis
    // 5 = problème lors de la récupération
    @Column({ type: "int", nullable:true })
    status!: number

    @Column({ type: "int", nullable:true })
    suggested_supermarket_id!: number

    @ManyToOne(type => Shipper, shipper => shipper)
    @JoinColumn(
        { name: 'shipper_id', referencedColumnName: 'user_id'}
    )
    shipper!: Shipper

    @OneToMany(() => Cart, (cart) => cart.delivery)
    carts!: Cart[]
}