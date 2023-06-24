import { Controller } from '@nestjs/common';
import { InvoiceEntity } from './invoice.entity';

@Controller('invoice')
export class InvoiceController {
    constructor(
        private readonly invoiceEntity: InvoiceEntity
    ) { }
}
