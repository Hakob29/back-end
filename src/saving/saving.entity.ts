import { BankAccountEntity } from "src/bank-account/bank-account.entity";
import { Base } from "src/utils/base";
import { Entity, OneToOne } from "typeorm";


@Entity("Saving")
export class SavingEntity extends Base {

    @OneToOne(() => BankAccountEntity, (bankAccount) => bankAccount.saving)
    bankAccount: BankAccountEntity
}