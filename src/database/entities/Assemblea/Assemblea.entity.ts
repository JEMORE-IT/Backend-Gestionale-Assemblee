import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm'
import { Presenza } from '../Presenza/Presenza.entity'
import { Delega } from '../Delega/Delega.entity'
import { Riga } from '../Riga/Riga.entity'

@Entity()
@Unique('UK_Assemblea_Date', ['date'])
export class Assemblea {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'date', nullable: false, unique: true })
    date: Date

    @Column({ type: 'text', nullable: true })
    luogo: string

    @Column({ type: 'text', nullable: true })
    scopo: string

    @Column({ type: 'time', nullable: true })
    orarioCostituzione: string

    @Column({ type: 'time', nullable: true })
    orarioScioglimento: string

    @OneToMany(() => Presenza, (presenza) => presenza.assembly, { cascade: true, onDelete: 'CASCADE', nullable: false })
    presenze: Presenza[]

    @OneToMany(() => Delega, (delega) => delega.assembly, { cascade: true, onDelete: 'CASCADE', nullable: false })
    deleghe: Delega[]
    
    @OneToMany(() => Riga, (riga) => riga.assembly, { cascade: true, onDelete: 'CASCADE', nullable: false })
    righe: Riga[]
}
