import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { WebSocketModule } from './websocket/websocket.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import config from './utils/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Room } from './room/room.entity';
import { RoomUser } from './room/room-user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // autoLoadEntities: true,
      entities: [User, Room, RoomUser],
      //Todo: for production this should be false
      synchronize: true,
      logger: 'advanced-console',
      logging: ['query'],
      //TODO: enable this for production app
      // migrationsRun: true,
      // migrations: [
      //   `**/migrations/${process.env.DB_TYPE}-*.${
      //     detectTsNode() ? 'ts' : 'js'
      //   }`,
      // ],
    }),
    ConfigModule.forRoot({
      load: [config],
    }),
    WebSocketModule,
    RoomModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
