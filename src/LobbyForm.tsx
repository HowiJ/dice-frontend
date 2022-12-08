import type { Socket } from "socket.io-client";

import React from "react";
import { StyleSheet, css } from "aphrodite";
import Host from "./Host";
import Join from "./Join";

type Props = Readonly<{
  socket: Socket;
}>;

function LobbyForm({ socket }: Props): React.ReactElement {
  return (
    <div className={css(styles.form)}>
      <Host socket={socket} />
      <Join socket={socket} />
    </div>
  );
}

const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    borderRadius: "8px",
    margin: "auto",
    marginTop: "32px",
    gap: "20px",
  },
});

export default LobbyForm;
