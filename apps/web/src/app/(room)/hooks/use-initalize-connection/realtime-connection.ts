import Socket, { Socket as SocketType } from "socket.io-client";
import { getSocketBaseUrl } from "../utils";
import { EventType } from "../../../../../types";
import { IGameResponse } from "../../../interface/GameStore";

class RealTimeConnection {
  private socket?: SocketType;
  private clientId?: string;
  private roomId?: string;
  private gameState?: unknown;

  private isConnected = false;

  private static connect(): SocketType {
    const socketUrl = getSocketBaseUrl();
    const socket: SocketType = Socket(socketUrl, { path: "/realtime" });

    return socket;
  }

  private noConnectionFound(socket?: SocketType): asserts socket is SocketType {
    if (!socket) throw new Error("Connection not found");
  }

  private retryOnError() {
    // @TODO: add retry logic here
  }

  private sendMessage<M>({ type, payload }: { type: EventType; payload: M }) {
    this.noConnectionFound(this.socket);

    return this.socket.emit(type, payload);
  }

  private setGameState(gameState: unknown) {
    this.gameState = gameState;
  }

  private attachEventListener(eventType: EventType): Promise<IGameResponse> {
    return new Promise((res) => {
      setTimeout(() => {
        this.socket?.on(eventType, res);
      }, 0);
    });
  }

  private joinRoomCreateRoom = (roomInfo: {
    roomId: string;
    roomName: string;
  }): Promise<void> => {
    return new Promise((res, rej) => {
      const io = RealTimeConnection.connect();

      this.socket = io;
      this.clientId = io.id;
      this.isConnected = true;
      this.roomId = roomInfo.roomId;

      this.socket.emit("JOIN_ROOM", {
        roomId: roomInfo.roomId,
        roomName: roomInfo.roomName,
      });
      res();

      io.on("JOIN_FAIL", (e) => {
        this.socket = undefined;
        this.clientId = "";
        this.isConnected = false;

        // @TODO: add retry logic here
        rej({
          isConnected: false,
          errorMessage: e,
        });
      });
    });
  };

  async updateGameState(payload: any) {
    console.log({ event: "SELECTING_LETTER", payload });
  }

  async establishConnection({
    roomId,
    roomName,
  }: {
    roomId: string;
    roomName: string;
  }) {
    await this.joinRoomCreateRoom({ roomId, roomName }).catch((e) => {
      console.error({ ERROR_CONNECTION: e });
    });
  }

  async listenLetterSelected() {
    return await this.attachEventListener("SELECTED_LETTER");
  }

  disconnect() {
    this.noConnectionFound(this.socket);

    this.isConnected = false;
    this.socket.close();
  }

  getConnectionId() {
    if (!this.clientId) return null;

    return this.clientId;
  }

  letterSelected(letter: string) {
    this.sendMessage({
      type: "SELECTING_LETTER",
      payload: { letter, roomId: this.roomId },
    });
  }

  getIsConnected() {
    return this.isConnected;
  }
}

export default RealTimeConnection;
