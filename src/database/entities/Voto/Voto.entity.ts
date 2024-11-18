import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Socio } from '../Socio/Socio.entity'
import { Assemblea } from '../Assemblea/Assemblea.entity'
import { Riga } from '../Riga/Riga.entity'

export enum VoteType {
    favorevole = 1,
    contrario = 2,
    astenuto = 0
}

@Entity()
export class Voto {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    vote: VoteType

    @ManyToOne(() => Socio, (socio) => socio.votes, { cascade : false, nullable: false })
    member: Socio

    @ManyToOne(() => Riga, (riga) => riga.votes, { cascade : false , nullable: false })
    riga: Riga
}