"use client";

import { usePathname, useRouter } from "next/navigation";
import { useHangmanStore } from "../store/use-hangman-store";

interface IRoomGuard {
  children: React.ReactElement;
}

export const RoomGuard = ({ children }: IRoomGuard) => {
  const currentRoom = useHangmanStore((state) => state.currRoom);
  const route = useRouter();
  const pathname = usePathname();

  if (!currentRoom) throw new Error("Should be wrapped inside Store provider");

  const redirectTo = `/new-user?redirectTo=${pathname}`;
  if (!currentRoom.currUser.userId) {
    route.push(redirectTo);

    return <></>;
  }

  return <>{children}</>;
};
