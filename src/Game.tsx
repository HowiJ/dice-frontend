import type { Socket } from "socket.io-client";
import type { FormEvent } from "react";

import React from "react";
import { css, StyleSheet } from "aphrodite";
import Player from "Player";

type Props = Readonly<{
  players: Array<any>;
  lobbyID: string;
  socket: Socket;
  hostID: string;
}>;

function Game({
  socket,
  players,
  lobbyID,
  hostID,
}: Props): React.ReactElement | null {
  function onReset(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    socket.emit("reset_game", { lobbyID });
  }

  return (
    <div className={css(styles.main)}>
      <button onClick={onReset}>Reset Game</button>
      {players.map((player) => (
        <Player
          key={player.id}
          player={player}
          socket={socket}
          hostID={hostID}
        />
      ))}
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
  },
});

export default Game;
