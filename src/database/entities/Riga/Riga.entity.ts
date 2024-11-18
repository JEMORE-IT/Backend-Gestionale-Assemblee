import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Assemblea } from '../Assemblea/Assemblea.entity'
import { Voto } from '../Voto/Voto.entity'

@Entity()
export class Riga {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', nullable: false })
    text: string
    
    @ManyToOne(() => Assemblea, (assemblea) => assemblea.righe, { cascade : false , nullable: false })
    assembly: Assemblea
    
    @OneToMany(() => Voto, (voto) => voto.riga, { cascade : false, nullable: false  })
    votes: Voto[]
}