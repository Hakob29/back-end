import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typeOrmConfig';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(TypeOrmConfig.options),
    MediaModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
