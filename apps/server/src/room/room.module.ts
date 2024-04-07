import { Module } from '@nestjs/common';
import { RoomUserController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomUser } from './room-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomUser])],
  controllers: [RoomUserController],
  providers: [RoomService],
})
export class RoomModule {}
