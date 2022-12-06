// import type { ReactElement } from "react";
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
    <div className={css(hostStyles.form)}>
      <Host socket={socket} onClick={() => {}} />
      <div className={css(hostStyles.or)}></div>
      <Join socket={socket} onClick={() => {}} onChange={() => {}} />
    </div>
  );
}

const hostStyles = StyleSheet.create({
  or: {
    padding: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    borderRadius: "8px",
    margin: "auto",
    marginTop: "32px",
  },
});

export default LobbyForm;
