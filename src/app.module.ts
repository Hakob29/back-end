import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typeOrmConfig';
import { UserModule } from './user/user.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { SavingModule } from './saving/saving.module';
import { InvoiceModule } from './invoice/invoice.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(TypeOrmConfig.options),
    MediaModule,
    AuthModule,
    UserModule,
    BankAccountModule,
    SavingModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
