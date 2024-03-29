import { AllLetters } from "../../components/letters/Keys";
import { GameRoom } from "../../components/room";
import { Title, Hangman, Card, Stack } from "@repo/ui";
import { WordPlaceholder } from "../../components/word-placeholder";
interface IRoom {
  params: {
    roomId: string;
  };
}

const Room = (props: IRoom) => {
  return (
    <Stack alignItems={"center"} mt="5rem">
      <Title>Hangman</Title>
      <Card
        sx={{
          width: "19%",
          height: "19%",
          padding: "5rem",
          margin: "4rem",
        }}
      >
        <Hangman />
      </Card>
      <WordPlaceholder />
      <Card
        sx={{
          height: "19%",
          padding: "1rem",
          alignItems: "center",
        }}
      >
        <AllLetters />
      </Card>
      <GameRoom />
    </Stack>
  );
};

export default Room;
