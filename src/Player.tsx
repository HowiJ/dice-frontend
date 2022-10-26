import type { Socket } from "socket.io-client";

import React from "react";
import { css, StyleSheet } from "aphrodite";

type SerializedPlayer = {
  name: string;
  id: string;
  diceCount: number;
  dice: Array<number>;
};

type Props = Readonly<{
  socket: Socket;
  player: SerializedPlayer;
}>;

function Player({ player, socket }: Props): React.ReactElement | null {
  return (
    <div className={css(styles.main)}>
      <div>
        {player.name} ({player.id})
      </div>
      <div>Number of dice held: {player.diceCount}</div>
      {player.dice.map((num: number, i: number) => (
        <span key={i}>&nbsp;|&nbsp;{num}&nbsp;|&nbsp;</span>
      ))}
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: "8px",
  },
});

export default Player;
