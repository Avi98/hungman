//@TODO: added it common package to reuse it in server and web

type RoomEventType =
  | "JOIN_ROOM"
  | "JOIN_SUCCESS"
  | "JOIN_FAIL"
  | "JOIN_ERROR"
  | "NEW_WORD"
  | "SELECTING_LETTER"
  | "SELECTED_LETTER"
  | "SKIP_TRUE"
  | "MY_TRUE";

type GlobalEventType =
  | "CONNECTION_DISCONNECTED"
  | "CONNECTION_CONNECTED"
  | "ERROR_WHILE_CONNECTING";
type UserEventType = "REMOVE_USER" | "ADD_USER";

export type EventType = RoomEventType | UserEventType | GlobalEventType;
