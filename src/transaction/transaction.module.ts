import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity';
import { UserEntity } from 'src/user/user.entity';
import { InvoiceEntity } from 'src/invoice/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, UserEntity, InvoiceEntity])
  ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule { }
