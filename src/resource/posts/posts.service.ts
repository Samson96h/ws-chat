import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MediaFiles, User, Posts, } from '../../database/entities';
<<<<<<< HEAD
<<<<<<< HEAD
import { S3Service } from 'src/shared/s3/s3.service';
import { CreatePostDTO } from './dto';
import { Repository } from 'typeorm';


import { v4 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  constructor(
    private readonly s3Service: S3Service,
=======
import { FileHelper, PhotoValidator } from '../../helpers';
=======
import { S3Service } from 'src/shared/s3/s3.service';
>>>>>>> 9b84eb2 (update 13.2)
import { CreatePostDTO } from './dto';
import { Repository } from 'typeorm';


import { v4 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  constructor(
<<<<<<< HEAD
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
    private readonly s3Service: S3Service,
>>>>>>> 9b84eb2 (update 13.2)
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>
  ) { }

  async createPost(userId: number, dto: CreatePostDTO, files?: Express.Multer.File[]): Promise<Posts> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const post = this.postsRepository.create({ description: dto.description, user });

    if (files) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9b84eb2 (update 13.2)
      user.mediaFiles = [];

      for (const file of files) {
        const type = file.originalname.split('.').pop();
        const filePath = `Samson/Post/${type}/${uuid()}.${file.originalname}`;

<<<<<<< HEAD
        const photoEntity = this.mediaRepository.create({
          path: filePath,
          size: file.size,
        });

        await this.s3Service.putObject(file.buffer, filePath, file.mimetype);
        user.mediaFiles.push(photoEntity);
      }
    }


    return this.postsRepository.save(post);
=======
      post.mediaFiles = [];
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
=======
>>>>>>> 9b84eb2 (update 13.2)
        const photoEntity = this.mediaRepository.create({
          path: filePath,
          size: file.size,
        });

        await this.s3Service.putObject(file.buffer, filePath, file.mimetype);
        user.mediaFiles.push(photoEntity);
      }
    }

<<<<<<< HEAD
    return this.postsRepository.save(post)
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======

    return this.postsRepository.save(post);
>>>>>>> 9b84eb2 (update 13.2)
  }

  async getUserPosts(userId: number): Promise<Posts[]> {
    return this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['mediaFiles', 'comments', 'likes'],
    });
  }


  async deletePost(userId: number, postId: number) {
    const post = await this.postsRepository.findOne({
<<<<<<< HEAD
<<<<<<< HEAD
      where: { id: postId },
      relations: ['user', 'mediaFiles'],
=======
      where: { id: postId }, relations: ['user']
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
      where: { id: postId },
      relations: ['user', 'mediaFiles'],
>>>>>>> 9b84eb2 (update 13.2)
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new NotFoundException('You are not allowed to delete this post');
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9b84eb2 (update 13.2)
    if (post.mediaFiles && post.mediaFiles.length > 0) {
      for (const file of post.mediaFiles) {
        await this.s3Service.deleteObject(file.path);
      }
    }
<<<<<<< HEAD
    await this.postsRepository.delete(post.id);

    return { message: 'Post is removed' };
  }


}
=======
=======
>>>>>>> 9b84eb2 (update 13.2)
    await this.postsRepository.delete(post.id);

    return { message: 'Post is removed' };
  }

<<<<<<< HEAD
}
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======

}
>>>>>>> 9b84eb2 (update 13.2)
