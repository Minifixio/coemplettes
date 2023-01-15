import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "category"})
export class Category {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar", length: 50, nullable:false })
    name!: string
}