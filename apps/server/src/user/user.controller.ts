import { Body, Controller, Param, Post } from '@nestjs/common';
import { RoomUserDto, UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    this.userService.createNewUser(user);
  }

  @Post('/user/:roomId')
  addUserToRoom(@Body() userRoom: UserDto, @Param('roomId') roomId: string) {
    this.userService.addMemberToRoom({ ...userRoom, roomId });
  }
}
