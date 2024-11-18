import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm'
import { Presenza } from '../Presenza/Presenza.entity'
import { Delega } from '../Delega/Delega.entity'
import { Voto } from '../Voto/Voto.entity'

@Unique('unique_name', ['name'])
@Entity()
export class Socio {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'boolean', nullable: false, default: true})
    active: boolean

    @Column({type: 'varchar', nullable: false })
    name: string

    @OneToMany(() => Presenza, (presenza) => presenza.presenza, { cascade : false, nullable: false  })
    attendance: Presenza[]

    @OneToMany(() => Delega, (delega) => delega.delegato, { cascade : false, nullable: false  })
    delegheRicevute: Delega[]

    @OneToMany(() => Delega, (delega) => delega.delegante, { cascade : false, nullable: false  })
    delegheDate: Delega[]

    @OneToMany(() => Voto, (voto) => voto.member, { cascade : false, nullable: false  })
    votes: Voto[]
}