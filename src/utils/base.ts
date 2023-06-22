import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('base')
export abstract class Base {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @CreateDateColumn({ type: Date, name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ type: Date, name: 'updated_at' })
    updatedAt: Date
}