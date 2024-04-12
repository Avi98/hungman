import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { RoomRepository } from './room.repository';
import {
  RoomMemberExists,
  RoomNameExists,
  RoomNotFound,
} from '../error/errors';
import { RoomUserRepository } from './room-user.repository';

@Injectable()
export class RoomService {
  constructor(
    private roomRepository: RoomRepository,
    private roomUserRepository: RoomUserRepository,
  ) {}

  async addMember(user: User, roomId: string) {
    const room = await this.roomRepository.getById(roomId);
    if (!room) throw new RoomNotFound(`roomId: ${roomId} not found`);

    const roomMemberExists = await this.roomUserRepository.getRoomMember(
      roomId,
      user.id,
    );

    if (roomMemberExists)
      throw new RoomMemberExists(
        `memberId: ${user.id} already added to roomId: ${roomId}`,
      );

    await this.roomUserRepository.addMember(roomId, user.id);
  }

  async create(user: User, roomName: string) {
    const roomExists = await this.roomRepository.getRoomByName(roomName);
    if (roomExists) throw new RoomNameExists('Room name already exists');

    const room = await this.roomRepository.createNewRoom(user, roomName);
    return room;
  }
}
