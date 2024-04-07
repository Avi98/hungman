import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { UserRole } from '../enums/user-role-enum';

@Entity()
@Unique(['user_id', 'room_id'])
export class RoomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  user_role: UserRole;

  @Column()
  room_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
