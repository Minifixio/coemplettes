import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User"

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

    @Column({ type: "float", nullable:true })
    loc_long!: number

    @Column({ type: "float", nullable:true })
    loc_lat!: number

    @OneToOne(type => User, user => user)
    @JoinColumn(
        { name: 'user_id', referencedColumnName: 'id'}
    )
    user!: User
}