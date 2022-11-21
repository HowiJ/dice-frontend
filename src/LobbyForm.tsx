import type { FormEvent, ReactElement } from "react";
import type { Socket } from "socket.io-client";

import React from "react";
import { StyleSheet, css } from "aphrodite";
import useFormActions from "useFormActions";

type Props = Readonly<{
  socket: Socket;
}>;

function LobbyForm({ socket }: Props): React.ReactElement | null {
  return (
    <div className={css(hostStyles.form)}>
      <Host socket={socket} />
      <div className={css(hostStyles.or)}>- or -</div>
      <Join socket={socket} />
    </div>
  );
}

type HostProps = Readonly<{
  socket: Socket;
}>;

function Host({ socket }: HostProps): ReactElement {
  function onHost(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    socket.emit("join_lobby", { lobbyID: null });
  }

  return (
    <div className={css(hostStyles.row)}>
      <div className={css(hostStyles.text)}>Create a new game</div>
      <div>
        <button onClick={onHost} className={css(hostStyles.button)}>
          &gt;
        </button>
      </div>
    </div>
  );
}

function Join({ socket }: HostProps): ReactElement {
  const [lobbyID, onChangeLobbyID] = useFormActions();

  function onJoinLobby(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (lobbyID.length < 3) {
      console.warn("lobby id is probably more than 3 characters");
      return;
    }
    socket.emit("join_lobby", { lobbyID });
  }

  return (
    <div className={css(hostStyles.row)}>
      <div>
        <input
          className={css(hostStyles.input)}
          placeholder="Join a lobby using a name"
          onChange={onChangeLobbyID}
          value={lobbyID}
        />
      </div>
      <div>
        <button onClick={onJoinLobby} className={css(hostStyles.button)}>
          &gt;
        </button>
      </div>
    </div>
  );
}

const hostStyles = StyleSheet.create({
  or: {
    textAlign: "center",
    padding: "8px",
    fontSize: "8px",
  },
  button: {
    height: "100%",
    border: "none",
    borderRadius: "0 8px 8px 0",
    minWidth: "32px",
    backgroundColor: "#EEEEEE",
    ":hover": {
      backgroundColor: "#DDDDDD",
    },
    ":active": {
      backgroundColor: "#CCCCCC",
    },
  },
  input: {
    padding: "8px",
    fontSize: "12px",
    minWidth: "160px",
    fontFamily: "Arial",
    border: "1px solid #EEEEEE",
    borderRadius: "8px 0 0 8px",
    "::placeholder": {
      fontSize: "12px",
      fontFamily: "Arial",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    // minWidth: "230px",
    padding: "16px",
    borderRadius: "8px",
    margin: "auto",
    marginTop: "32px",
  },
  text: {
    flex: "1 1 auto",
    padding: "8px",
    fontSize: "12px",
    fontFamily: "Arial",
    border: "none",
    borderRadius: "8px 0 0 8px",
    backgroundColor: "#EEEEEE",
  },
  row: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    gap: "4px",
    justifyContent: "space-around",
  },
});

export default LobbyForm;
