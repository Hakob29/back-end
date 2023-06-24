import { Module } from '@nestjs/common';
import { BankAccountController } from './bank-account.controller';
import { BankAccountService } from './bank-account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountEntity } from './bank-account.entity';
import { BankCardEntity } from './bank-card.entity';
import { UserEntity } from 'src/user/user.entity';
import { SavingEntity } from 'src/saving/saving.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BankAccountEntity, BankCardEntity, UserEntity, SavingEntity])
  ],
  controllers: [BankAccountController],
  providers: [BankAccountService]
})
export class BankAccountModule { }
