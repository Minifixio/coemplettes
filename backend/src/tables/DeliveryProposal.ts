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

    @ManyToOne(type => Shipper, shipper => shipper)
    @JoinColumn(
        { name: 'shipper_id', referencedColumnName: 'id'}
    )
    shipper!: Shipper

}