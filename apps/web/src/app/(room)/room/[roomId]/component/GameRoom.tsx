import { Title, Hangman, Card, Stack } from "@repo/ui";
import { WordPlaceholder } from "../../../components/word-placeholder";
import { AllLetters } from "../../../components/letters/Keys";

export const GameRoom = () => {
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
