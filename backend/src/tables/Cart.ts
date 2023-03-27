import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, OneToMany } from "typeorm"
import { Delivery } from "./Delivery"
import { User } from "./User"
import { DeliveryProposal } from "./DeliveryProposal"
import { CartItem } from "./CartItem"

@Entity({name: "carts"})
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "int", nullable:false })
    owner_id!: number

    @Column({ type: "int", nullable:true })
    delivery_id!: number

    @Column({ type: "int", nullable:true })
    delivery_proposal_id!: number

    // A voir sur la syntaxe : default: () => "CURRENT_TIMESTAMP"
    @Column({ type: "datetime", nullable:false, default: () => "CURRENT_TIMESTAMP" })
    creation_date!: Date

    @Column({ type: "datetime", nullable:false })
    deadline!: Date
    
    /* pour un cart non attribué : status=0 et delivery_proposal_id=null
        pour un cart attribué mais en attente de validation : status=1
        pour un cart validé : status=2 */
    @Column({ type: "int", nullable:false })
    status!: number
    
    @Column({ type: "float", nullable:true })
    average_price!: number

    // Le prix final rentré par le livreur une fois la commande effectuée
    // Il peut être différent de average_price dans la mesure ou average_price est une approximation
    // Ce sera le prix à payer par le user
    @Column({ type: "float", nullable:true })
    price_to_pay!: number

    @Column({ type: "int", nullable:true }) // le numéro du locker qui sera attribué une fois la Delivery déposée
    locker_id!: number

    @ManyToOne(type => User, owner => owner)
    @JoinColumn(
        { name: 'owner_id', referencedColumnName: 'id'}
    )
    owner!: User

    @ManyToOne(type => Delivery, delivery => delivery)
    @JoinColumn(
        { name: 'delivery_id', referencedColumnName: 'id'}
    )
    delivery!: Delivery

    @ManyToOne(type => DeliveryProposal, deliveryProposal => deliveryProposal)
    @JoinColumn(
        { name: 'delivery_proposal_id', referencedColumnName: 'id'}
    )
    delivery_proposal!: DeliveryProposal

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    items!: CartItem[]

    distanceJourCourant!: number
}
