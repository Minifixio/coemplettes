import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm"

@Entity({name: "oauth"})
export class OAuth {
    @PrimaryColumn()
    user_id!: number

    @Column({ type: "varchar", nullable:true })
    access_token!: string

    @Column({ type: "int", nullable:true })
    expires_at!: number
    
    @Column({ type: "varchar", nullable:true })
    refresh_token!: string
}