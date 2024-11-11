import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Assemblea {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type : 'date', nullable: false })
    date: Date
}