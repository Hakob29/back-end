import { Base } from "src/utils/base";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { InvoiceItemEntity } from "./invoice-item.entity";
import { InvoiceFileEntity } from "./invoice-file.entity";
import { TransactionEntity } from "src/transaction/transaction.entity";


@Entity('Invoice')
export class InvoiceEntity extends Base {

    @OneToMany(() => InvoiceItemEntity, item => item.invoice)
    items?: InvoiceItemEntity[]

    @OneToMany(() => InvoiceItemEntity, file => file.invoice)
    files?: InvoiceFileEntity[]

    @OneToOne(() => InvoiceEntity, (invoice) => invoice.transaction)
    transaction: TransactionEntity
}