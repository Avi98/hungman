"use client";

import { SyntheticEvent, useCallback } from "react";
import { useAddUser } from "../../../../../api/addUser";
import { useParams } from "next/navigation";

export const useAddUserController = () => {
  const { data, error, isError, isPending, isSuccess, mutateAsync } =
    useAddUser();

  const query = useParams();

  console.log({ query });

  const handleSubmit = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const target = event.currentTarget;
    const userInfo = {
      email: target.elements.email.value,
      username: target.elements.username.value,
    };
  }, []);

  return;
};
