import { RoomGuard } from "../../../../gaurds/RoomGaurd";
import { GameRoom } from "./component/GameRoom";
interface IRoom {
  params: {
    roomId: string;
  };
}

const Room = (props: IRoom) => {
  return (
    <RoomGuard>
      <GameRoom />
    </RoomGuard>
  );
};

export default Room;
