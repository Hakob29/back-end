import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './invoice.entity';
import { InvoiceFileEntity } from './invoice-file.entity';
import { InvoiceItemEntity } from './invoice-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity, InvoiceFileEntity, InvoiceItemEntity])
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService]
})
export class InvoiceModule { }
