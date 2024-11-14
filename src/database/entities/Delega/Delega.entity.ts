import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm'
import { Assemblea } from '../Assemblea/Assemblea.entity'
import { Socio } from '../Socio/Socio.entity'

@Entity()
@Unique(["assembly", "delegante"])
export class Delega {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Assemblea, (assemblea) => assemblea.deleghe, { cascade : false})
    assembly: Assemblea

    @ManyToOne(() => Socio, (socio) => socio.delegheDate)
    delegante: Socio

    @ManyToOne(() => Socio, (socio) => socio.delegheRicevute)
    delegato: Socio
}