import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MediaFiles, User, Posts, } from '../../database/entities';
import { FileHelper, PhotoValidator } from '../../helpers';
import { CreatePostDTO } from './dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
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
      post.mediaFiles = [];
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
        const photoEntity = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'post'),
          size: validated.size
        })
        post.mediaFiles.push(photoEntity)
      }
    }

    return this.postsRepository.save(post)
  }

  async getUserPosts(userId: number): Promise<Posts[]> {
    return this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['mediaFiles', 'comments', 'likes'],
    });
  }


  async deletePost(userId: number, postId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId }, relations: ['user']
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new NotFoundException('You are not allowed to delete this post');
    }

    await this.postsRepository.delete(post.id);

    return { "message": "post is removed" }
  }

}
