import { DataSource } from 'typeorm';
import { BaseRepository } from '../common/base-repository';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from '../user/user.entity';
import { Room } from './room.entity';

@Injectable({ scope: Scope.REQUEST })
export class RoomRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  async getRoomByName(room_name: string) {
    return await this.getRepository(Room).findOne({
      where: {
        room_name,
      },
    });
  }

  async getById(roomId: string) {
    return await this.getRepository(Room).findOneBy({ id: Number(roomId) });
  }

  async createNewRoom(owner: User, roomName: string) {
    const room = this.getRepository(Room).create({
      owner,
      room_name: roomName,
    });
    return await this.getRepository(Room).save(room);
  }

  async getRoomOwner(roomId: string) {
    return await this.getRepository(Room).findOne({
      where: {
        id: Number(roomId),
      },
      select: {
        owner: {
          id: true,
          username: true,
        },
      },
    });
  }
}
