import { useCallback, useEffect, useRef, useState } from "react";
import RealTimeConnection from "./realtime-connection";
import { assertSocketRef } from "../utils";
import { useParams } from "next/navigation";

export const useInitializeConnection = () => {
  // const [isConnected, setIsConnected] = useState(false);
  // const [connectionId, setConnectionId] = useState("");

  const param = useParams();
  const isConnected = useRef(false);
  const connectionId = useRef<string | null>(null);

  const socketRef = useRef<RealTimeConnection>(new RealTimeConnection());

  const connectToWebSocket = useCallback(async () => {
    if (typeof socketRef.current !== "function") {
      console.log({ sockerConnectionCalled: 1 });
      await socketRef.current.establishConnection({
        roomId: String(param.roomId),
        roomName: "testRoom",
      });
      connectionId.current = socketRef.current.getConnectionId() ?? "";
      isConnected.current = socketRef.current.getIsConnected();
    }
  }, [param.roomId]);

  const disconnectConnection = useCallback(() => {
    if (typeof socketRef.current !== "function") socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    const socket = assertSocketRef(socketRef.current);
    const isConnected = socket.getConnectionId();

    connectToWebSocket();

    return () => {
      if (isConnected) disconnectConnection();
    };
    // This hook is suppose to run only once in
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isConnected,
    connectionId,
    client: socketRef.current as RealTimeConnection,
  };
};
