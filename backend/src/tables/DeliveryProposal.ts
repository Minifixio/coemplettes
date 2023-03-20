import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Shipper } from "./Shipper"

@Entity({name: "delivery_proposals"})
export class DeliveryProposal {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "int", nullable:false })
    shipper_id!: number

    @Column({ type: "int", nullable:true })
    size!: number

    // A voir sur la syntaxe : default: () => "CURRENT_TIMESTAMP"
    @Column({ type: "datetime", nullable:true, default: () => "CURRENT_TIMESTAMP" })
    creation_date!: number

    @Column({ type: "datetime", nullable:false })
    deadline!: number

    @Column({ type: "array", nullable:false })
    carts!: number[]

    /* pour un delivery_proposal encore en attente (donc non validé par le shipper sur l'app) : status=0 et delivery_id=null
    pour un delivery_proposal validé par le shipper sur l'app : status=1
    pour un delivery_proposal refusé par le shipper sur l'app */
    @Column({ type: "int", nullable:false })
    status!: number

    @Column({ type: "string", nullable:false })
    timeSlot!: string

    @ManyToOne(type => Shipper, shipper => shipper)
    @JoinColumn(
        { name: 'shipper_id', referencedColumnName: 'id'}
    )
    shipper!: Shipper

}