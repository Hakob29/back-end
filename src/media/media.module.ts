import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule { }
