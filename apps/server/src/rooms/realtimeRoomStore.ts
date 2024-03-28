import Room from './room';
import { IUser } from './interface/user';

class RealtimeRoomStore {
  private room = new Map<string, Room>();

  getRoomById(roomId: string) {
    return this.room.get(roomId);
  }

  createNewRoom(room: { roomId: string; word: string; roomName: string }) {
    try {
      const newRoom = new Room();

      newRoom.setWord(room.word);
      newRoom.setName(room.roomName);

      this.room.set(room.roomId, newRoom);
    } catch (error) {
      throw new Error('Failed to create room');
    }
  }

  getAllRoomsUser(roomId: string) {
    const room = this.room.get(roomId);
    return room.getConnectedUsers();
  }

  deleteRoom(roomId) {}

  addUser(roomId: string, user: IUser) {
    const room = this.room.get(roomId);
    room.addUser(user);
  }

  removeUser(roomId: string, connectionId: string) {
    const users = this.getAllRoomsUser(roomId);
    const currentUsers = users.filter((id) => id !== connectionId);
  }

  getRoomMetadata(roomId: string) {
    if (!this.room.has(roomId)) return;

    const currentRoom = this.room.get(roomId);

    return {
      roomId: roomId,
      users: currentRoom.getConnectedUsers(),
      // word: currentRoom.word,
      hangman: currentRoom.game,
    };
  }

  letterSelected(roomId: string, letter: string) {
    try {
      const currRoom = this.getRoomById(roomId);
      if (!currRoom) throw new Error('No room found');

      return currRoom.onSelectLetter(letter);
    } catch (error) {
      throw error;
    }
  }
}

export default RealtimeRoomStore;
