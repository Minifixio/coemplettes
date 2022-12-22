import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
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
    state!: number

    @ManyToOne(type => Shipper, shipper => shipper)
    @JoinColumn(
        { name: 'shipper_id', referencedColumnName: 'id'}
    )
    shipper!: Shipper
}