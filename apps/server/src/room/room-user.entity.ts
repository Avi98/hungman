import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { UserRole } from '../enums/user-role-enum';
import { User } from '../user/user.entity';
import { Room } from './room.entity';

@Entity()
@Unique(['user', 'room'])
export class RoomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.roomMember)
  user: User;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  userRole: UserRole;

  @ManyToOne(() => Room, (room) => room.room_users)
  room: Room;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
