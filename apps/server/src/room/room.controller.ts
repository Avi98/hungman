import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoomUser } from './room-dto';

@Controller('room-user')
export class RoomUserController {
  @Post()
  createRoomUser(@Body() roomUser: CreateRoomUser) {
    //simple handler for creating user with room
  }

  @Post()
  joinRoom(@Body() roomUser: CreateRoomUser) {
    //simple handler for creating user with room
  }
}
