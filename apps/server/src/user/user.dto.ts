import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserDto {
  @Type(() => String)
  @IsString()
  username: string;

  @Type(() => String)
  @IsString()
  roomName: string;

  @IsString()
  email: string;
}

export interface RoomUserDto {
  roomId: string;
  username: string;
  email: string;
}
