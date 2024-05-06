import { Box } from "@repo/ui";
import styles from "./page.module.css";
import { CreateRoomForm } from "../components/create-room/CreateRoomForm";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <CreateRoomForm />
      </div>
    </main>
  );
}
