import { InvoiceEntity } from "src/invoice/invoice.entity";
import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { EnumTransactionStatus } from "./transaction.type";


@Entity('Transaction')
export class TransactionEntity extends Base {

    @ManyToOne(() => UserEntity, (user) => user.transactions)
    recipient: UserEntity


    @OneToOne(() => InvoiceEntity, (invoice) => invoice.transaction)
    invoice: InvoiceEntity


    @Column({ type: "enum", enum: EnumTransactionStatus })
    status: EnumTransactionStatus
}