import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { RoomUser } from './room-user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.rooms)
  owner: User;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  room_name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => RoomUser, (roomUser) => roomUser.room)
  room_users: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
