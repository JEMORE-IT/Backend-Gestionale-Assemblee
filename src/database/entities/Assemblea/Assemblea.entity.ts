import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Presenza } from '../Presenza/Presenza.entity'

@Entity()
export class Assemblea {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type : 'date', nullable: false })
    date: Date

    @OneToMany(() => Presenza, (presenza) => presenza.assembly, { cascade : true, onDelete : 'CASCADE' })
    presenze: Presenza[]
}