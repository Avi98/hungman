"use client";

import { Box } from "@repo/ui";
import { FlexCol } from "./style";

export const CreateRoomForm = () => {
  const handleSubmit = (data) => {
    debugger;
  };
  return (
    <form onSubmit={handleSubmit}>
      <FlexCol>
        <Box>Create new Room</Box>
        <input placeholder="room name" />
        <input placeholder="owner name" />
        <button type="submit">Create</button>
      </FlexCol>
    </form>
  );
};
