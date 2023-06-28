import { Base } from "src/utils/base";
import { Column, Entity, OneToOne } from "typeorm";
import { BankAccountEntity } from "./bank-account.entity";
import { EnumPaymentSystem, EnumTypeCard } from "./bank-account.type";


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

    @Column({ enum: EnumPaymentSystem })
    paymentSystem: EnumPaymentSystem

    @Column({ type: String })
    bankName: string

    @OneToOne(() => BankAccountEntity, (bankAccount) => bankAccount.card)
    bankAccount: BankAccountEntity
}