import { Base } from "src/utils/base";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class UserEntity extends Base {

    @Column({ type: String, unique: true })
    email: string

    @Column({ type: String, select: false })
    password: string

    @Column({ type: String, default: '' })
    name: string

    @Column({ type: String, default: 'uploads/default-avatar.png', name: 'avatar_path' })
    avatarPath: string

    @Column({ type: 'text', default: '' })
    address: string

    @OneToMany(() => UserEntity, user => user.id, { cascade: true })
    contacts: UserEntity[]

} 