import { Module } from '@nestjs/common';
import { SavingController } from './saving.controller';
import { SavingService } from './saving.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingEntity } from './saving.entity';
import { BankAccountEntity } from 'src/bank-account/bank-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavingEntity, BankAccountEntity])],
  controllers: [SavingController],
  providers: [SavingService]
})
export class SavingModule { }
