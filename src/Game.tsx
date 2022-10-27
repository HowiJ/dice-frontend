import type { Socket } from "socket.io-client";
import type { FormEvent } from "react";

import React from "react";
import { css, StyleSheet } from "aphrodite";
import Player from "Player";

type Props = Readonly<{
  players: Array<any>;
  viewerID: string;
  lobbyID: string;
  socket: Socket;
  hostID: string;
}>;

function Game({
  socket,
  viewerID,
  players,
  lobbyID,
  hostID,
}: Props): React.ReactElement {
  function onReset(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    socket.emit("reset_game", { lobbyID });
  }

  function onRedeal() {
    socket.emit("dice_count_update", { lobbyID, change: 0 });
  }

  function onToggleShow() {
    socket.emit("toggle_visibility");
  }

  return (
    <div className={css(styles.main)}>
      {players.map((player) => (
        <Player
          key={player.id}
          player={player}
          socket={socket}
          hostID={hostID}
          isViewer={player.id === viewerID}
        />
      ))}
      <div className={css(styles.actions)}>
        <button className={css(styles.actionButton)} onClick={onReset}>
          Reset Game
        </button>
        <button className={css(styles.actionButton)} onClick={onRedeal}>
          Re-Deal Dice
        </button>
        <button className={css(styles.actionButton)} onClick={onToggleShow}>
          Toggle Visibility
        </button>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "100px",
    gap: "0px",
  },
  actions: {
    position: "absolute",
    bottom: 0,
    padding: "16px",
    display: "flex",
    gap: "4px",
  },
  actionButton: {
    minWidth: "32px",
    height: "64px",
  },
});

export default Game;
