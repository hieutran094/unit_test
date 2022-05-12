import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('hero')
export class Hero {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'int' })
  power: number

  @Column('varchar', { name: 'universe', nullable: true, length: 50 })
  universe: string | null
}
