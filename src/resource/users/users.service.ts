import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MediaFiles } from 'src/database/entities/media-files';
import { FileHelper, PhotoValidator } from '../../helpers';
import { User } from 'src/database/entities';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>
  ) { }


  async updateUser(id: number, dto: UpdateUserDTO, files?: Express.Multer.File[]) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['mediaFiles'], });

    if (!user) {
      throw new NotFoundException('user not found')
    }

    user.confidentiality = dto.confidentiality ?? user.confidentiality
    user.firstName = dto.firstName ?? user.firstName;
    user.lastName = dto.lastName ?? user.lastName;
    user.age = dto.age ?? user.age;

    if (files) {
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
        const photoEntity = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'user'),
          size: validated.size
        })
        user.mediaFiles.push(photoEntity)
      }
    }

    return this.userRepository.save(user)
  }

  async addFriend(userId: number, friendId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] })
    if (!user) throw new NotFoundException('user not found')

    const friend = await this.userRepository.findOne({ where: { id: friendId } })
    if (!friend) throw new NotFoundException('friend not found')

    if (user.friends.find((e) => e.id === friendId)) {
      return user
    }

    user.friends.push(friend)
    return this.userRepository.save(user)
  }

  async removeFriend(userId: number, frientId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] })
    if (!user) throw new NotFoundException('user not found')

    user.friends.filter((e) => e.id !== frientId)

    return await this.userRepository.save(user)

  }


  async getFriends(requesterId: number, userId: number): Promise<User[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id !== requesterId && user.confidentiality === 'private') {
      throw new ForbiddenException('User data is private');
    }

    return user.friends;
  }


  findAll() {
    return this.userRepository.find();
  }


  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user
  }


}
