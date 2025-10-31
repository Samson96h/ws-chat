import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { IDBConfig } from './models';
<<<<<<< HEAD
<<<<<<< HEAD
import { jwtConfig, dbConfig, awsConfig } from './configs';
=======
import { jwtConfig, dbConfig } from './configs';
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
import { jwtConfig, dbConfig, awsConfig } from './configs';
>>>>>>> 9b84eb2 (update 13.2)
import { validationSchema } from './validation';
import { ChatModule } from './resource/chat/chat.module';
import { AuthModule } from './resource/auth/auth.module';
import { UsersModule } from './resource/users/users.module';
import { PostsModule } from './resource/posts/posts.module';
import { Chat, MediaFiles, Message, SecretCode, User, Posts, Comments, Likes } from './database/entities';
import { CommentsModule } from './resource/comments/comments.module';
import { LikesModule } from './resource/likes/likes.module';
<<<<<<< HEAD
<<<<<<< HEAD
import { S3Module } from './shared/s3/s3.module';
import { IAwsConfig } from './models/config/aws-config';
=======
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
import { S3Module } from './shared/s3/s3.module';
import { IAwsConfig } from './models/config/aws-config';
>>>>>>> 9b84eb2 (update 13.2)


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
<<<<<<< HEAD
      load: [jwtConfig, dbConfig, awsConfig],
=======
      load: [jwtConfig, dbConfig],
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
      load: [jwtConfig, dbConfig, awsConfig],
>>>>>>> 9b84eb2 (update 13.2)
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
<<<<<<< HEAD

=======
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======

>>>>>>> 9b84eb2 (update 13.2)
    }),
    ChatModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
<<<<<<< HEAD
<<<<<<< HEAD
    LikesModule,
    S3Module,
=======
    LikesModule
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
    LikesModule,
    S3Module,
>>>>>>> 9b84eb2 (update 13.2)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
