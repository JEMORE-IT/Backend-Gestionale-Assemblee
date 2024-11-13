import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Assemblea } from '../Assemblea/Assemblea.entity'
import { Socio } from '../Socio/Socio.entity'

export enum PresenceType {
    presente = 1,
    assente,
    online,
    delega
}

@Entity()
export class Presenza {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    presenza: PresenceType

    @ManyToOne(() => Assemblea, (assemblea) => assemblea.presenze, { cascade : false})
    assembly: Assemblea

    @ManyToOne(() => Socio, (socio) => socio.attendance, { cascade : false})
    member: Socio
}