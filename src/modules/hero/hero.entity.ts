import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('hero')
export class Hero {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'int' })
  power: number
}
