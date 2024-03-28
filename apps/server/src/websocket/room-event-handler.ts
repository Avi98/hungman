import { Socket } from 'socket.io';
import { WordBankService } from '../word-bank/word-bank.service';
import { EventType } from '../types/event-type';
import RealtimeRoomStore from '../rooms/realtimeRoomStore';

interface IEventType<P> {
  type: EventType;
  payload: P;
  roomId?: string;
}

export class RoomEventHandler {
  private currentRoomId = null;

  constructor(
    private client: Socket,
    private wordBank: WordBankService,
    private realtimeRoom: RealtimeRoomStore,
  ) {}

  static initializeRoomEventHandler(client: Socket, wordBank: WordBankService) {
    const gameStore = new RealtimeRoomStore();
    const eventHandler = new RoomEventHandler(client, wordBank, gameStore);

    return eventHandler;
  }

  private sendEvent<P>({ type, payload }: IEventType<P>) {
    this.client.emit(type, payload);
  }

  private async broadcastMessage<P>({ type, payload, roomId }: IEventType<P>) {
    await new Promise((res, reg) => this.client.emit(type, payload, res));
  }

  private async fetchWord() {
    try {
      return (await this.wordBank.fetchWord()).at(0);
    } catch (error) {
      throw new Error('Failed to fetch word');
    }
  }

  async addRoom(roomInfo: { roomId: string; roomName: string }) {
    try {
      const word = await this.fetchWord();

      this.currentRoomId = roomInfo.roomId;

      this.realtimeRoom.createNewRoom({
        word,
        roomId: roomInfo.roomId,
        roomName: roomInfo.roomName,
      });

      this.client.join(roomInfo.roomId);
      this.sendEvent({
        type: 'JOIN_SUCCESS',
        payload: this.realtimeRoom.getRoomMetadata(roomInfo.roomId),
      });
    } catch (error) {
      //log error
      throw new Error(error);
    }
  }

  async letterSelected(roomId: string, letter: string) {
    const gameState = this.realtimeRoom.letterSelected(roomId, letter);
    await this.broadcastMessage({
      type: 'SELECTED_LETTER',
      payload: gameState,
      roomId: roomId,
    });
  }
}
