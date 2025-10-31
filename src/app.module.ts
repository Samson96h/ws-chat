import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { IDBConfig } from './models';
<<<<<<< HEAD
import { jwtConfig, dbConfig, awsConfig } from './configs';
=======
import { jwtConfig, dbConfig } from './configs';
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
import { validationSchema } from './validation';
import { ChatModule } from './resource/chat/chat.module';
import { AuthModule } from './resource/auth/auth.module';
import { UsersModule } from './resource/users/users.module';
import { PostsModule } from './resource/posts/posts.module';
import { Chat, MediaFiles, Message, SecretCode, User, Posts, Comments, Likes } from './database/entities';
import { CommentsModule } from './resource/comments/comments.module';
import { LikesModule } from './resource/likes/likes.module';
<<<<<<< HEAD
import { S3Module } from './shared/s3/s3.module';
import { IAwsConfig } from './models/config/aws-config';
=======
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/'),
      serveRoot: '/public/',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: validationSchema,
<<<<<<< HEAD
      load: [jwtConfig, dbConfig, awsConfig],
=======
      load: [jwtConfig, dbConfig],
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig: IDBConfig = configService.get('DB_CONFIG') as IDBConfig;
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [User, SecretCode, Chat, Message, Posts, MediaFiles, Comments, Likes],
          synchronize: true,
        };
      },
<<<<<<< HEAD

=======
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
    }),
    ChatModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
<<<<<<< HEAD
    LikesModule,
    S3Module,
=======
    LikesModule
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
