"use client";

import { Box } from "@repo/ui";
import { FlexCol } from "./style";
import { SyntheticEvent } from "react";
import { useSaveUser } from "../../api/createUser";

export const CreateRoomForm = () => {
  const { saveUser, error, isSuccess, isPending, data } = useSaveUser();

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const userInfo = {
      email: target.elements.email.value,
      username: target.elements.username.value,
      roomName: target.elements.roomName.value,
    };

    saveUser(userInfo);
    console.log({ data });
    if (isSuccess) {
      route.push(`/room/${data?.roomId}`);
    }
  };

  if (isPending) {
    <div>loading....</div>;
  }

  if (error) {
    <div>{`ERROR: ${error}`}</div>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <FlexCol>
        <Box>Create new Room</Box>
        <input id="roomName" placeholder="room name" />
        <input id="username" placeholder="owner name" />
        <input id="email" placeholder="email" />
        <button type="submit">Create</button>
      </FlexCol>
    </form>
  );
};
