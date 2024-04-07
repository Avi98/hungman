import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoomUserDto, UserDto } from './user.dto';
import { Repository } from 'typeorm';
import { EmailExists, UsernameExists } from '../error/errors';
import { RoomService } from '../room/room.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roomUserService: RoomService,
  ) {}

  private async duplicateUser(userInfo: UserDto) {
    const emailExists = await this.userRepository.findOne({
      where: { email: userInfo.email },
    });
    const usernameExists = await this.userRepository.findOne({ where: {} });

    if (emailExists) throw new EmailExists();
    if (usernameExists) throw new UsernameExists();

    return false;
  }

  async addMemberToRoom(userInfo: RoomUserDto) {
    try {
      const user = await this.createNewUser({
        username: userInfo.username,
        email: userInfo.email,
      });
      if (user) {
        await this.roomUserService.createRoomUser(user, userInfo.roomId);
      }
    } catch (error) {
      throw error;
    }
  }

  async createNewUser(userInfo: UserDto) {
    try {
      const isDuplicate = await this.duplicateUser(userInfo);

      if (!isDuplicate) {
        const user = this.userRepository.create(userInfo);
        return await this.userRepository.save(user);
      }
    } catch (error) {
      if (error instanceof EmailExists || error instanceof UsernameExists) {
        throw error;
      }
    }
  }
}
