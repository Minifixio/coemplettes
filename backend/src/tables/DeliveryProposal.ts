import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Cart } from "./Cart"
import { Shipper } from "./Shipper"
import { Supermarket } from "./Supermarket"

@Entity({name: "delivery_proposals"})
export class DeliveryProposal {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ type: "int", nullable:false })
    shipper_id!: number

    @Column({ type: "int", nullable:true })
    size!: number

    // A voir sur la syntaxe : default: () => "CURRENT_TIMESTAMP"
    @Column({ type: "datetime", nullable:true, default: () => "CURRENT_TIMESTAMP" })
    creation_date!: Date 

    @Column({ type: "datetime", nullable:false })
    deadline!: Date

    /* pour un delivery_proposal encore en attente (donc non validé par le shipper sur l'app) : status=0 et delivery_id=null
    pour un delivery_proposal validé par le shipper sur l'app : status=1
    pour un delivery_proposal refusé par le shipper sur l'app : status revient à 0*/
    @Column({ type: "int", nullable:false })
    status!: number

    @Column({ type: "float", nullable:false })
    current_price!: number

    @Column({ type: "int", nullable:true })
    suggested_supermarket_id!: number

    // @Column({ type: "string", nullable:false })
    // timeSlot!: string

    @ManyToOne(type => Shipper, shipper => shipper)
    @JoinColumn(
        { name: 'shipper_id', referencedColumnName: 'user_id'}
    )
    shipper!: Shipper

    @OneToMany(() => Cart, (cart) => cart.delivery_proposal)
    carts!: Cart[] 

    @ManyToOne(type => Supermarket, suggested_supermarket => suggested_supermarket)
    @JoinColumn(
        { name: 'suggested_supermarket_id', referencedColumnName: 'id'}
    )
    suggested_supermarket!: Supermarket
}

function OneToOne(arg0: (type: any) => any, arg1: (supermarket: any) => any): (target: DeliveryProposal, propertyKey: "SuggestedSupermarket") => void {
    throw new Error("Function not implemented.")
}
