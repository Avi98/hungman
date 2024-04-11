import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoomModule } from '../room/room.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [RoomModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
