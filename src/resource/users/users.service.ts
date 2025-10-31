import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MediaFiles } from 'src/database/entities/media-files';
<<<<<<< HEAD
<<<<<<< HEAD
import { User } from 'src/database/entities';
import { v4 as uuid } from 'uuid';
import { S3Service } from 'src/shared/s3/s3.service';

=======
import { FileHelper, PhotoValidator } from '../../helpers';
import { User } from 'src/database/entities';
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
import { User } from 'src/database/entities';
import { v4 as uuid } from 'uuid';
import { S3Service } from 'src/shared/s3/s3.service';

>>>>>>> 9b84eb2 (update 13.2)


@Injectable()
export class UsersService {

  constructor(
<<<<<<< HEAD
<<<<<<< HEAD
    private readonly s3Service: S3Service,
=======
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
    private readonly s3Service: S3Service,
>>>>>>> 9b84eb2 (update 13.2)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9b84eb2 (update 13.2)
      user.mediaFiles = [];

      for (const file of files) {
        const type = file.originalname.split('.').pop();
        const filePath = `Samson/User/${type}/${uuid()}.${file.originalname}`;

<<<<<<< HEAD
        const photoEntity = this.mediaRepository.create({
          path: filePath,
          size: file.size,
        });

        await this.s3Service.putObject(file.buffer, filePath, file.mimetype);
        user.mediaFiles.push(photoEntity);
=======
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
        const photoEntity = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'user'),
          size: validated.size
        })
        user.mediaFiles.push(photoEntity)
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
        const photoEntity = this.mediaRepository.create({
          path: filePath,
          size: file.size,
        });

        await this.s3Service.putObject(file.buffer, filePath, file.mimetype);
        user.mediaFiles.push(photoEntity);
>>>>>>> 9b84eb2 (update 13.2)
      }
    }

    return this.userRepository.save(user)
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9b84eb2 (update 13.2)
  async deleteUserPhoto(userId: number, fileName: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['mediaFiles'],
    });
<<<<<<< HEAD
=======
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
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
>>>>>>> 9b84eb2 (update 13.2)

    if (!user) {
      throw new NotFoundException('User not found');
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9b84eb2 (update 13.2)
    const photo = user.mediaFiles.find((f) => f.path === fileName);

    if (!photo) {
      throw new NotFoundException('Photo not found for this user');
    }

    await this.s3Service.deleteObject(photo.path);

    await this.mediaRepository.remove(photo);

    console.log(`Photo deleted: ${photo.path}`);

    return { message: 'Photo deleted successfully' };
  }

  async addFriend(userId: number, friendId: number): Promise<User> {
    if (userId === friendId) {
      throw new BadRequestException('You cannot add yourself as a friend');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });
    if (!user) throw new NotFoundException('User not found');

    const friend = await this.userRepository.findOne({ where: { id: friendId } });
    if (!friend) throw new NotFoundException('Friend not found');

    if (user.friends.some((e) => e.id === friendId)) {
      return user;
    }

    user.friends.push(friend);
    return this.userRepository.save(user);
  }

  async removeFriend(userId: number, friendId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });
    if (!user) throw new NotFoundException('User not found');

    user.friends = user.friends.filter((e) => e.id !== friendId);

    return this.userRepository.save(user);
  }



  async getFriends(targetUserId: number, requesterId: number): Promise<User[]> {
    const targetUser = await this.userRepository.findOne({
      where: { id: targetUserId },
      relations: ['friends'],
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    if (targetUser.id !== requesterId && targetUser.confidentiality === 'private') {
<<<<<<< HEAD
      throw new ForbiddenException('User data is private');
    }

    return targetUser.friends;
  }



=======
    if (user.id !== requesterId && user.confidentiality === 'private') {
=======
>>>>>>> 9b84eb2 (update 13.2)
      throw new ForbiddenException('User data is private');
    }

    return targetUser.friends;
  }


<<<<<<< HEAD
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======

>>>>>>> 9b84eb2 (update 13.2)
  findAll() {
    return this.userRepository.find();
  }


  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, relations:['friends', 'mediaFiles'] })

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user
  }


}
