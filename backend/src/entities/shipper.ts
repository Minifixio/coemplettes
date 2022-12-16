import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "shippers"})
export class Shipper {
    @PrimaryGeneratedColumn()
    id!: number
}