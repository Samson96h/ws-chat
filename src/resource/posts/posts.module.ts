import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/database/entities/posts.entity';
import { MediaFiles, User } from 'src/database/entities';
import { AuthModule } from '../auth/auth.module';
<<<<<<< HEAD
import { S3Module } from 'src/shared/s3/s3.module';

@Module({
  imports:[TypeOrmModule.forFeature([Posts, User, MediaFiles]), AuthModule,S3Module],
=======

@Module({
  imports:[TypeOrmModule.forFeature([Posts, User, MediaFiles]), AuthModule],
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
