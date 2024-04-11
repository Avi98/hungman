import { useMutation, useQuery } from "@tanstack/react-query";
import { env } from "../utils/env";
import { API_ENDPOINTS } from "./constants";
import { PostAPIBuilder } from "./common/postAPIBuilder";

interface IUserInfo {
  username: string;
  email: string;
}
const createUser = (userInfo: IUserInfo) => {
  const api = new PostAPIBuilder(API_ENDPOINTS.USER, env.BE_BASE_URL);
  api.withBody(userInfo);

  return api.sendRequest();
};

export const useSaveUser = (onError?: (...args: any[]) => unknown) => {
  const {
    data,
    error,
    isSuccess,
    mutate: saveUser,
    isPending,
  } = useMutation({
    onError,
    mutationFn: createUser,
  });

  return { data, error, saveUser, isPending, isSuccess };
};
