import type { FormEvent } from "react";

import React, { useEffect, useState } from "react";
import { css, StyleSheet } from "aphrodite";
import io from "socket.io-client";
import LobbyForm from "LobbyForm";
import Game from "Game";

const socket = io();

type LobbyDetails = {
  lobbyID: string | null;
  hostID: string | null;
  players: Array<Object>;
};

type Props = Readonly<{}>;

function App(_: Props): React.ReactElement {
  const [{ lobbyID, hostID, players }, setLobbyDetails] =
    useState<LobbyDetails>({
      lobbyID: null,
      hostID: null,
      players: [],
    });

  useEffect(() => {
    console.log("listening to sockets");
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("dcs");
    });

    socket.on("update_lobby", (lobby) => {
      setLobbyDetails(lobby);
      console.log("update_lobby", lobby);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update_lobby");
      socket.off("reset_game");
    };
  }, []);

  function onCopyClick(e: FormEvent<HTMLButtonElement>): void {
    if (lobbyID == null) {
      return;
    }
    navigator.clipboard.writeText(lobbyID);
  }

  return (
    <div className={css(styles.main)}>
      <div>
        Connected to {lobbyID == null ? "(- No Lobby -)" : lobbyID}{" "}
        {lobbyID != null && <button onClick={onCopyClick}>C</button>}
      </div>
      <div>Host is {hostID}</div>
      {lobbyID == null && <LobbyForm socket={socket} />}
      {lobbyID != null && (
        <Game
          socket={socket}
          players={players}
          lobbyID={lobbyID}
          hostID={hostID ?? ""}
        />
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
  },
});

export default App;
