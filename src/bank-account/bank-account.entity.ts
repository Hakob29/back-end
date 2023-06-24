import { Base } from "src/utils/base";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { BankCardEntity } from "./bank-card.entity";
import { UserEntity } from "src/user/user.entity";
import { SavingEntity } from "src/saving/saving.entity";



@Entity('Bank-Account')
export class BankAccountEntity extends Base {

    @Column({ unique: true })
    number: string

    @Column({ default: 0 })
    balance: number

    @OneToOne(() => BankCardEntity, (card) => card.bankAccount, { cascade: true })
    @JoinColumn()
    card: BankCardEntity

    @ManyToOne(() => UserEntity, (user) => user.bankAccounts)
    user?: UserEntity

    @OneToOne(() => SavingEntity, (saving) => saving.bankAccount, { cascade: true })
    @JoinColumn()
    saving?: SavingEntity

}