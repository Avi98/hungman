import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseRepository } from '../common/base-repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RoomUser } from './room-user.entity';
import { UserRole } from '../enums/user-role-enum';

@Injectable({ scope: Scope.REQUEST })
export class RoomUserRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  async addMember(roomId: string, userId: string) {
    const roomMember = this.getRepository(RoomUser).create({
      room_id: roomId,
      user_id: userId,
      user_role: UserRole.MEMBER,
    });

    return await this.getRepository(RoomUser).save(roomMember);
  }

  async getRoomMember(roomId: string, userId: string) {
    return await this.getRepository(RoomUser).findOneBy({
      room_id: roomId,
      user_id: userId,
    });
  }
}
