import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm'
import { Assemblea } from '../Assemblea/Assemblea.entity'
import { Socio } from '../Socio/Socio.entity'

@Entity()
@Unique(["assembly", "delegante"])
export class Delega {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Assemblea, (assemblea) => assemblea.deleghe, { cascade : false , nullable: false })
    assembly: Assemblea

    @ManyToOne(() => Socio, (socio) => socio.delegheDate, { cascade : false , nullable: false })
    delegante: Socio

    @ManyToOne(() => Socio, (socio) => socio.delegheRicevute, { cascade : false , nullable: false })
    delegato: Socio
}