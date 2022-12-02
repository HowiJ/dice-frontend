import type { FormEvent, ReactElement } from "react";
import type { Socket } from "socket.io-client";

import React from "react";
import { StyleSheet, css } from "aphrodite";
import useFormActions from "useFormActions";
import Button from "./common/Button";
import TextInput from "./common/TextInput";

type Props = Readonly<{
  socket: Socket;
  onClick?: React.MouseEventHandler;
}>;

function LobbyForm({ socket, onClick }: Props): React.ReactElement {
  return (
    <div className={css(hostStyles.form)}>
      <Host socket={socket} onClick={onClick} />
      <div className={css(hostStyles.or)}></div>
      <Join socket={socket} onClick={onClick} />
    </div>
  );
}

type HostProps = Readonly<{
  socket: Socket;
  onClick?: any;
  onChange?: any;
}>;

function Host({ socket, onClick }: HostProps): ReactElement {
  function onHost(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    socket.emit("join_lobby", { lobbyID: null });
  }

  return (
    <div className={css(hostStyles.row)}>
      <div>
        <Button
          background="transparent"
          theme="blue"
          label="Create a new game"
          onClick={onClick}
          width={260}
        />
      </div>
      <div>
        <button onClick={onHost} className={css(hostStyles.button)}>
          <Button
            background="transparent"
            theme="blue"
            label="picture"
            isLabelHidden={true}
            icon="arrow-blue"
            onClick={onClick}
          />
        </button>
      </div>
    </div>
  );
}

function Join({ socket, onClick }: HostProps): ReactElement {
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
        <TextInput
          width={223}
          placeholder="Join a lobby"
          theme="purple"
          onChange={onChangeLobbyID}
          value={lobbyID}
        />
      </div>
      <div>
        <button
          onClick={onJoinLobby}
          className={css(hostStyles.button, hostStyles.button2)}
        >
          <Button
            background="transparent"
            theme="purple"
            label="picture"
            isLabelHidden={true}
            icon="arrow-purple"
            onClick={onClick}
          />
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
    padding: "0px",
    boxSizing: "border-box",
    height: "100%",
    border: "none",
    borderRadius: "60px",
    minWidth: "32px",
    backgroundColor: "#1D1E33",
    ":hover": {
      backgroundColor: "#069AB4",
    },
    ":active": {
      backgroundColor: "#9CF6FC",
    },
  },
  button2: {
    ":hover": {
      backgroundColor: "#7139E0",
    },
    ":active": {
      backgroundColor: "#BA9CFC",
    },
  },
  input: {
    padding: "8px",
    fontSize: "12px",
    minWidth: "160px",
    fontFamily: "Arial",
    border: "none",
    borderRadius: "8px 0 0 8px",
    "input::placeholder": {
      fontSize: "12px",
      fontFamily: "Arial",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
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
