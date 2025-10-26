import { Controller, Get, Post,Param, Delete, UseGuards, UseInterceptors, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import type { IRequestUser } from '../chat/types';
import { UsersService } from './users.service';
import { AuthUser } from '../../decorators';
import { AuthGuard } from 'src/guards';
import { ParamIdDTO } from '../../dto';
import { UpdateUserDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @UseInterceptors(FilesInterceptor('photo'))
  @Post()
  async updateUser(@AuthUser() user: IRequestUser, @Body() dto: UpdateUserDTO, files?: Express.Multer.File[]) {
    return this.usersService.updateUser(user.id, dto, files)
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  async findOneUser(@Param() param : ParamIdDTO) {
    return this.usersService.findOne(+param)
  }


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
