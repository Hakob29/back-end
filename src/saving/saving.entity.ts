import { BankAccountEntity } from "src/bank-account/bank-account.entity";
import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";


@Entity("Saving")
export class SavingEntity extends Base {

    @Column({ type: String })
    color: string

    @Column({ type: String })
    name: string


    @OneToOne(() => BankAccountEntity, (bankAccount) => bankAccount.saving)
    bankAccount: BankAccountEntity


    @ManyToOne(() => UserEntity, (user) => user.savings)
    user: UserEntity
}