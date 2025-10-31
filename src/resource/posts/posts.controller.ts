import { Controller, Get, Post, Body, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { AuthUser } from '../../decorators';
import type { IRequestUser } from '../chat/types';
import { AuthGuard } from 'src/guards';
import { ParamIdDTO } from 'src/dto/param-id.dto';
<<<<<<< HEAD
<<<<<<< HEAD
import { PhotoValidationPipe } from 'src/shared/photoValidator/photo-validation.pipe';
=======
import { memoryStorage } from 'multer';
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
import { PhotoValidationPipe } from 'src/shared/photoValidator/photo-validation.pipe';
>>>>>>> 9b84eb2 (update 13.2)


@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

@UseInterceptors(FilesInterceptor('photo'))
@Post()
async createPost(
  @AuthUser() user: IRequestUser,
  @Body() dto: CreatePostDTO,
<<<<<<< HEAD
<<<<<<< HEAD
  @UploadedFiles(PhotoValidationPipe) files: Express.Multer.File[]
=======
  @UploadedFiles() files: Express.Multer.File[]
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
  @UploadedFiles(PhotoValidationPipe) files: Express.Multer.File[]
>>>>>>> 9b84eb2 (update 13.2)
) {
  return this.postsService.createPost(user.id, dto, files);
}

  @Get()
  async getUserPosts(@AuthUser() user: IRequestUser) {
    return this.postsService.getUserPosts(user.id)
  }


  @Delete(':id')
  async deletePost(@AuthUser() user: IRequestUser, @Param() param: ParamIdDTO){
    return this.postsService.deletePost(user.id, param.id)
  }
}
