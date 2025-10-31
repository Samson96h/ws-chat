<<<<<<< HEAD
<<<<<<< HEAD
import { Controller, Get, Post, Param, Delete, UseGuards, UseInterceptors, Body, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { PhotoValidationPipe } from 'src/shared/photoValidator/photo-validation.pipe';
=======
import { Controller, Get, Post,Param, Delete, UseGuards, UseInterceptors, Body } from '@nestjs/common';
=======
import { Controller, Get, Post, Param, Delete, UseGuards, UseInterceptors, Body, UploadedFiles } from '@nestjs/common';
>>>>>>> 9b84eb2 (update 13.2)
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

<<<<<<< HEAD
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
import { PhotoValidationPipe } from 'src/shared/photoValidator/photo-validation.pipe';
>>>>>>> 9b84eb2 (update 13.2)
import type { IRequestUser } from '../chat/types';
import { UsersService } from './users.service';
import { AuthUser } from '../../decorators';
import { AuthGuard } from 'src/guards';
import { ParamIdDTO } from '../../dto';
import { UpdateUserDTO } from './dto';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { ApiTags } from '@nestjs/swagger';
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
>>>>>>> 9b84eb2 (update 13.2)

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @UseInterceptors(FilesInterceptor('photo'))
  @Post()
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9b84eb2 (update 13.2)
  async updateUser(
    @AuthUser() user: IRequestUser,
    @Body() dto: UpdateUserDTO,
    @UploadedFiles(PhotoValidationPipe) files: Express.Multer.File[]) {
<<<<<<< HEAD
=======
  async updateUser(@AuthUser() user: IRequestUser, @Body() dto: UpdateUserDTO, files?: Express.Multer.File[]) {
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
>>>>>>> 9b84eb2 (update 13.2)
    return this.usersService.updateUser(user.id, dto, files)
  }


<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9b84eb2 (update 13.2)
  @Delete('photo/:fileName')
  async deleteUserPhoto(
    @AuthUser() user: IRequestUser,
    @Param('fileName') fileName: string,
  ) {
    return this.usersService.deleteUserPhoto(user.id, fileName);
  }



<<<<<<< HEAD
=======
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
>>>>>>> 9b84eb2 (update 13.2)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
<<<<<<< HEAD
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
=======
  async findOneUser(@Param() param: ParamIdDTO) {
    return this.usersService.findOne(Number(param.id))
  }


  @Post('friends')
  async addFriends(@AuthUser() user: IRequestUser, @Body() id : ParamIdDTO) {
    return this.usersService.addFriend(user.id, Number(id));
>>>>>>> 9b84eb2 (update 13.2)
  }


  @Get('friends/:id')
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


<<<<<<< HEAD
}
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
}
>>>>>>> 9b84eb2 (update 13.2)
