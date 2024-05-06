import { useQuery } from "@tanstack/react-query";
import { env } from "../utils/env";
import { GetAPIBuilder } from "./common/getAPIBuilder";
import { API_ENDPOINTS } from "./constants";

const getCurrentUser = () => {
  const api = new GetAPIBuilder(API_ENDPOINTS.USER, env.BE_BASE_URL);
  return api.sendRequest();
};

export const useGetCurrentUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [API_ENDPOINTS.USER],
    queryFn: getCurrentUser,
  });

  return { data, isLoading, error };
};
