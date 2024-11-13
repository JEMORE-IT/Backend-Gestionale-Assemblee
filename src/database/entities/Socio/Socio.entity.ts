import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm'
import { Presenza } from '../Presenza/Presenza.entity'

@Unique('unique_name', ['name'])
@Entity()
export class Socio {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'boolean', nullable: false, default: true})
    active: boolean

    @Column({type: 'varchar', nullable: false })
    name: string

    @OneToMany(() => Presenza, (presenza) => presenza.presenza, { cascade : false })
    attendance: Presenza[]
}