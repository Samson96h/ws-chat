<<<<<<< HEAD
import { Controller, Get, Post, Param, Delete, UseGuards, UseInterceptors, Body, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { PhotoValidationPipe } from 'src/shared/photoValidator/photo-validation.pipe';
=======
import { Controller, Get, Post,Param, Delete, UseGuards, UseInterceptors, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
import type { IRequestUser } from '../chat/types';
import { UsersService } from './users.service';
import { AuthUser } from '../../decorators';
import { AuthGuard } from 'src/guards';
import { ParamIdDTO } from '../../dto';
import { UpdateUserDTO } from './dto';
<<<<<<< HEAD
=======
import { ApiTags } from '@nestjs/swagger';
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @UseInterceptors(FilesInterceptor('photo'))
  @Post()
<<<<<<< HEAD
  async updateUser(
    @AuthUser() user: IRequestUser,
    @Body() dto: UpdateUserDTO,
    @UploadedFiles(PhotoValidationPipe) files: Express.Multer.File[]) {
=======
  async updateUser(@AuthUser() user: IRequestUser, @Body() dto: UpdateUserDTO, files?: Express.Multer.File[]) {
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
    return this.usersService.updateUser(user.id, dto, files)
  }


<<<<<<< HEAD
  @Delete('photo/:fileName')
  async deleteUserPhoto(
    @AuthUser() user: IRequestUser,
    @Param('fileName') fileName: string,
  ) {
    return this.usersService.deleteUserPhoto(user.id, fileName);
  }



=======
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
<<<<<<< HEAD
  async findOneUser(@Param() param: ParamIdDTO) {
=======
  async findOneUser(@Param() param : ParamIdDTO) {
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
    return this.usersService.findOne(+param)
  }


<<<<<<< HEAD
  @Post('friends')
  async addFriends(@AuthUser() user: IRequestUser, @Body() { id }: ParamIdDTO) {
    return this.usersService.addFriend(user.id, Number(id));
  }


  @Get(':id/friends')
  async getFriends(
    @AuthUser() user: IRequestUser,
    @Param() param: ParamIdDTO
  ) {
    return this.usersService.getFriends(+param.id, user.id);
  }



  @Delete('friends/:id')
  async removeFriends(@AuthUser() user: IRequestUser, @Param() param: ParamIdDTO) {
    return this.usersService.removeFriend(user.id, Number(param.id));
  }


}
=======
  @Post('friends/:id')
  async addFriends(@AuthUser() user: IRequestUser, @Param() param: ParamIdDTO) {
    return this.usersService.addFriend(user.id, +param)
  }


  @Get('friends')
  async getFriends(@AuthUser() requester : IRequestUser,userId: number ) {
    return this.usersService.getFriends(requester.id, userId)
  }


  @Delete('friends/:id')
  async removeFriends(@AuthUser() user : IRequestUser, @Param() param: ParamIdDTO) {
    return this.usersService.removeFriend(user.id, +param)
  }


}
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
