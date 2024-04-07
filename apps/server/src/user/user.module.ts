import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, RoomModule],
  controllers: [UserController],
})
export class UserModule {}
