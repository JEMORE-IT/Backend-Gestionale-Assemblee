import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Unique('unique_name', ['name'])
@Entity()
export class Socio {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', nullable: true })
    name: string
}