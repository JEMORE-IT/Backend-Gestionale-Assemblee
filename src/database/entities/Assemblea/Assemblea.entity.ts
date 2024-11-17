import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Presenza } from '../Presenza/Presenza.entity'
import { Delega } from '../Delega/Delega.entity'

@Entity()
export class Assemblea {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type : 'date', nullable: false })
    date: Date

    @OneToMany(() => Presenza, (presenza) => presenza.assembly, { cascade : true, onDelete : 'CASCADE', nullable: false })
    presenze: Presenza[]

    @OneToMany(() => Delega, (delega) => delega.assembly, { cascade : true, onDelete : 'CASCADE', nullable: false })
    deleghe: Delega[]
}