import { Injectable } from '@nestjs/common';
import { RoomUserDto, UserDto } from './user.dto';
import { EmailExists, UsernameExists } from '../error/errors';
import { RoomService } from '../room/room.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roomUserService: RoomService,
  ) {}

  private async duplicateUser(userInfo: UserDto) {
    const emailExists = await this.userRepository.getUserByEmail(
      userInfo.email,
    );
    const usernameExists = await this.userRepository.getUserByUsername(
      userInfo.username,
    );

    if (emailExists.length) throw new EmailExists('Email already exists');
    if (usernameExists.length)
      throw new UsernameExists('Username already exists');

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
        const user = await this.userRepository.create(userInfo);
        return user;
      }
    } catch (error) {
      if (error instanceof EmailExists || error instanceof UsernameExists) {
        throw error;
      }
    }
  }
}
