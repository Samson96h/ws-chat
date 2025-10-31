import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User, MediaFiles } from '../../database/entities'
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';
<<<<<<< HEAD
import { S3Module } from 'src/shared/s3/s3.module';


@Module({
  imports:[TypeOrmModule.forFeature([MediaFiles,User ]), AuthModule,S3Module],
=======


@Module({
  imports:[TypeOrmModule.forFeature([MediaFiles,User ]), AuthModule],
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
