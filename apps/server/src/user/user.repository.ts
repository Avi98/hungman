import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { BaseRepository } from '../common/base-repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends BaseRepository {
  private userRepository: Repository<User>;

  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  getUserByUsername(username: string) {
    this.userRepository = this.getRepository(User);

    return this.userRepository.find({
      where: {
        username,
      },
    });
  }

  getUserByEmail(email: string) {
    this.userRepository = this.getRepository(User);

    try {
      const user = this.userRepository.find({ where: { email } });
      return user;
    } catch (error) {
      console.log({ error });
    }
  }

  create(userInfo: { username: string; email: string }) {
    this.userRepository = this.getRepository(User);

    const user = this.userRepository.create(userInfo);
    return this.userRepository.save(user);
  }
}
