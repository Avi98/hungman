import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { RoomUser } from './room-user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomUser) private roomRepository: Repository<RoomUser>,
  ) {}

  async createRoomUser(user: User, roomId: string) {
    //     return createNewUser;
  }

  async createNewRoom(user: User) {
    //create new room for user
  }
}
