import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { TransactionInterceptor } from '../interceptor/transaction.interceptor';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  async createUser(@Body() user: UserDto) {
    return await this.userService.createNewUser(user);
  }

  @Post('/user/:roomId')
  addUserToRoom(@Body() userRoom: UserDto, @Param('roomId') roomId: string) {
    this.userService.addMemberToRoom({ ...userRoom, roomId });
  }
}
