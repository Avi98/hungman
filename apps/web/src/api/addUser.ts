import { useMutation } from "@tanstack/react-query";
import { env } from "../utils/env";
import { PostAPIBuilder } from "./common/postAPIBuilder";
import { API_ENDPOINTS } from "./constants";

interface IUserInfo {
  username: string;
  email: string;
  roomId: string;
}

interface IUserInfoResponse {
  username: string;
  email: string;
}

const addUser = (userInfo: IUserInfo) => {
  const api = new PostAPIBuilder(API_ENDPOINTS.USER, env.BE_BASE_URL);
  api.withBody(userInfo);

  return api.sendRequest<IUserInfoResponse>();
};

export const useAddUser = (onError?: (...args: any[]) => unknown) => {
  const { data, error, isError, isPending, isSuccess, mutateAsync } =
    useMutation({
      onError,
      mutationFn: addUser,
    });

  return { data, error, mutateAsync: addUser, isPending, isSuccess, isError };
};
