import { FlexCol } from "../../../../components/create-room/style";

export const AddUserForm = () => {
  return (
    <FlexCol>
      <input id="username" placeholder="owner name" />
      <input id="email" placeholder="email" />
      <button type="submit">Create</button>
    </FlexCol>
  );
};
