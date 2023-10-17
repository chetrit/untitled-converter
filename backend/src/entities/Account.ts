import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm'

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column({ length: 32 })
    email!: string

  @Column({ length: 32, nullable: true })
    salt!: string

  @Column({ length: 64, nullable: true })
    password!: string

  @Column({ length: 32, nullable: true })
    firstName?: string

  @Column({ length: 32, nullable: true })
    lastName?: string

  @Column('date', { nullable: true })
    bornDate?: Date

  @CreateDateColumn()
    createdDate!: Date

  @UpdateDateColumn()
    modifiedDate!: Date
}
