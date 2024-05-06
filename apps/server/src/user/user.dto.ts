import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @Type(() => String)
  @IsString()
  username: string;

  @Type(() => String)
  @IsString()
  roomName: string;

  @IsEmail()
  email: string;
}

export class RoomUserDto {
  @Type(() => String)
  @IsString()
  username: string;

  @Type(() => String)
  @IsEmail()
  email: string;

  @Type(() => String)
  @IsString()
  roomId: string;
}
