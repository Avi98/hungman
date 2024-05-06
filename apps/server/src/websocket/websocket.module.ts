import { Module } from '@nestjs/common';
import { SocketGateway } from './websocket.gateway';
import { WordBankModule } from '../word-bank/word-bank.module';

@Module({
  imports: [WordBankModule],
  providers: [SocketGateway],
})
export class WebSocketModule {}
