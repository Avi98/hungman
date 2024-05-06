import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseRepository } from '../common/base-repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RoomUser } from './room-user.entity';
import { UserRole } from '../enums/user-role-enum';
import { Room } from './room.entity';
import { User } from '../user/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class RoomUserRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  async addMember(room: Room, user: User) {
    const roomMember = this.getRepository(RoomUser).create({
      room,
      user,
      userRole: UserRole.MEMBER,
    });

    return await this.getRepository(RoomUser).save(roomMember);
  }

  async getRoomMember(room: Room, user: User) {
    return await this.getRepository(RoomUser).findOneBy({
      room,
      user,
    });
  }
}
