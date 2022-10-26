import type { Socket } from "socket.io-client";

import React from "react";
import { css, StyleSheet } from "aphrodite";

import Dice from "Dice";

type SerializedPlayer = {
  name: string;
  id: string;
  diceCount: number;
  dice: Array<number>;
};

type Props = Readonly<{
  socket: Socket;
  player: SerializedPlayer;
  hostID: string;
}>;

function Player({ player, socket, hostID }: Props): React.ReactElement | null {
  return (
    <div className={css(styles.main)}>
      <div>
        {player.name} ({player.id}) {hostID === player.id && `<host>`}
      </div>
      <div>Number of dice held: {player.diceCount}</div>
      <div className={css(styles.hand)}>
        {player.dice.map((value: number, i: number) => (
          <Dice value={value} key={i} />
        ))}
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: "8px",
  },
  hand: {
    display: "flex",
    flexDirection: "row",
    gap: "2px",
  },
});

export default Player;
