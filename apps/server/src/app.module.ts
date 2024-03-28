import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { WebSocketModule } from './websocket/websocket.module';
import config from './utils/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      load: [config],
    }),
    WebSocketModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
