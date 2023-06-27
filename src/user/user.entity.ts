import { BankAccountEntity } from "src/bank-account/bank-account.entity";
import { SavingEntity } from "src/saving/saving.entity";
import { TransactionEntity } from "src/transaction/transaction.entity";
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

    @Column({ type: String, nullable: true })
    refreshToken: string;

    @OneToMany(() => BankAccountEntity, (bankAccount) => bankAccount.user, { cascade: true })
    bankAccounts: BankAccountEntity[]

    @OneToMany(() => SavingEntity, (saveing) => saveing.user, { cascade: true })
    savings: SavingEntity[]


    @OneToMany(() => TransactionEntity, (transaction) => transaction.recipient, { cascade: true })
    transactions?: TransactionEntity[]

} 