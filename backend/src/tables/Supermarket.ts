import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "supermarkets"})
export class Supermarket {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar", length: 100, nullable:false })
    name!: string

    @Column({ type: "float", nullable:true })
    loc_long!: number

    @Column({ type: "float", nullable:true })
    loc_lat!: number

    @Column({ type: "varchar", length: 200, nullable:true })
    business_hours!: string

    @Column({ type: "int", nullable:false })
    postal_code!: number
}