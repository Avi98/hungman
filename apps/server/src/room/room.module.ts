import { Module } from '@nestjs/common';
import { RoomUserController } from './room.controller';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';
import { RoomUserRepository } from './room-user.repository';

@Module({
  controllers: [RoomUserController],
  providers: [RoomService, RoomRepository, RoomUserRepository],
  exports: [RoomService],
})
export class RoomModule {}
