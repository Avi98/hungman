import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoomModule } from '../room/room.module';
import { UserRepository } from './user.repository';
import { RoomService } from '../room/room.service';
import { RoomRepository } from '../room/room.repository';
import { RoomUserRepository } from '../room/room-user.repository';

@Module({
  imports: [RoomModule],
  providers: [
    RoomService,
    UserService,
    UserRepository,
    RoomRepository,
    RoomUserRepository,
  ],
  controllers: [UserController],
})
export class UserModule {}
