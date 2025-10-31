import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { SecretCode, User } from '../../database/entities';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards';
<<<<<<< HEAD
import { S3Module } from 'src/shared/s3/s3.module';
=======
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f


@Module({
  imports: [
    TypeOrmModule.forFeature([User, SecretCode]),
    JwtModule.registerAsync({
<<<<<<< HEAD
      imports: [ConfigModule, S3Module],
=======
      imports: [ConfigModule],
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    })
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, AuthGuard],
})
export class AuthModule {}
