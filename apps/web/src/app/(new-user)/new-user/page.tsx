import { Stack, Title } from "@repo/ui";
import { AddUserForm } from "./components/AddUserForm";
// import { useAddUserController } from "./components/AddUserController/useAddUserController";

const NewUser = () => {
  // useAddUserController();
  return (
    <Stack>
      <Title>Welcome to hangman</Title>
      <AddUserForm />
    </Stack>
  );
};

export default NewUser;
