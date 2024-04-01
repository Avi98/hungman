"use client";

import { Box } from "@repo/ui";
import { FlexCol } from "./style";

export const CreateRoomForm = () => {
  return (
    <FlexCol>
      <Box>Create new Room</Box>
      <input placeholder="room name" />
      <input placeholder="owner name" />
      <button>Create</button>
    </FlexCol>
  );
};
