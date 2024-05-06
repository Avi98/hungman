import { env } from "../../../../utils/env";
import { SocketRefType } from "../types";
import RealTimeConnection from "../use-initalize-connection/realtime-connection";

const LOCAL_FALLBACK_URL = env.BE_BASE_WS_URL;

export const getSocketBaseUrl = () => {
  try {
    const backendBaseUrl = new URL(env.BE_BASE_URL);
    backendBaseUrl.protocol =
      backendBaseUrl.protocol === "https:" ? "wss:" : "ws:";

    return backendBaseUrl.toString();
  } catch (error) {
    console.error(error);
    return LOCAL_FALLBACK_URL;
  }
};

export const assertSocketRef = (
  socketRef: SocketRefType | RealTimeConnection
): RealTimeConnection => {
  if (typeof socketRef === "function") return socketRef();
  return socketRef;
};
