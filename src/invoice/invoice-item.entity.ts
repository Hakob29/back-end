import { Base } from "src/utils/base";
import { Column, Entity, ManyToOne } from "typeorm";
import { InvoiceEntity } from "./invoice.entity";


@Entity('Invoice_item')
export class InvoiceItemEntity extends Base {

    @Column({ unique: true })
    name: string

    @Column({ type: Number })
    duration: number

    @Column({ type: Number })
    rate: number

    @Column({ type: Number })
    amount: number

    @ManyToOne(() => InvoiceEntity, invoice => invoice.items)
    invoice: InvoiceEntity
}