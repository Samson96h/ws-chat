import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { IDBConfig } from './models';
import { jwtConfig, dbConfig, awsConfig } from './configs';
import { validationSchema } from './validation';
import { ChatModule } from './resource/chat/chat.module';
import { AuthModule } from './resource/auth/auth.module';
import { UsersModule } from './resource/users/users.module';
import { PostsModule } from './resource/posts/posts.module';
import { Chat, MediaFiles, Message, SecretCode, User, Posts, Comments, Likes } from './database/entities';
import { CommentsModule } from './resource/comments/comments.module';
import { LikesModule } from './resource/likes/likes.module';
import { S3Module } from './shared/s3/s3.module';
import { IAwsConfig } from './models/config/aws-config';


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
      load: [jwtConfig, dbConfig, awsConfig],
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

    }),
    ChatModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
