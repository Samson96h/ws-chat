import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User, MediaFiles } from '../../database/entities'
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';


@Module({
  imports:[TypeOrmModule.forFeature([MediaFiles,User ]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
