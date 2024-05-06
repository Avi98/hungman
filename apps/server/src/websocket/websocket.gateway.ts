import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';
import { RoomEventHandler } from './room-event-handler';
import { WordBankService } from '../word-bank/word-bank.service';

@WebSocketGateway({
  //@TODO: extract this
  cors: { origin: '*' },
  path: '/realtime',
  // transports: ['websocket'],
})
export class SocketGateway implements OnGatewayConnection {
  private eventHandler: RoomEventHandler;

  constructor(private wordBank: WordBankService) {}

  async handleConnection(client: Socket, requestMessage: IncomingMessage) {
    const socketId = client.id;
    console.log(`New connection... socket id:`, socketId);

    this.eventHandler = await RoomEventHandler.initializeRoomEventHandler(
      client,
      this.wordBank,
    );
  }

  handleDisconnect(socket: Socket): void {
    const socketId = socket.id;
    console.log(`Disconnection... socket id:`, socketId);
  }

  @SubscribeMessage('JOIN_ROOM')
  async addRoom(@MessageBody() roomInfo: { roomId: string; roomName: string }) {
    await this.eventHandler.addRoom(roomInfo);
  }

  @SubscribeMessage('SELECTING_LETTER')
  handleLetterSelect(@MessageBody() data: { letter: string; roomId: string }) {
    this.eventHandler.letterSelected(data.roomId, data.letter);
  }
}
