import { Base } from "src/utils/base";
import { Column, Entity, OneToOne } from "typeorm";
import { BankAccountEntity } from "./bank-account.entity";


enum EnumTypeCard {
    MASTER = "Master",
    MIR = "Mir",
    VISA = "Visa",
    MAESTRO = "Maestro"
}
@Entity("Bank_card")
export class BankCardEntity extends Base {

    @Column({ type: String, unique: true })
    number: string

    @Column({ type: String })
    expDate: string

    @Column({ type: Number })
    cvc: number

    @Column({ enum: EnumTypeCard })
    type: EnumTypeCard

    @OneToOne(() => BankAccountEntity, (bankAccount) => bankAccount.card)
    bankAccount: BankAccountEntity
}