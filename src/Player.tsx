import { Socket } from "socket.io-client";

import React, { useState, useEffect } from "react";
import { css, StyleSheet } from "aphrodite";

import Dice from "Dice";

type SerializedPlayer = {
  name: string;
  id: string;
  diceCount: number;
  dice: Array<number>;
  lastRolledAt: string;
};

type Props = Readonly<{
  socket: Socket;
  player: SerializedPlayer;
  hostID: string;
  isViewer: boolean;
}>;

function Player({
  socket,
  player,
  hostID,
  isViewer,
}: Props): React.ReactElement | null {
  const [allVisible, setAllVisible] = useState<boolean>(false);

  function onClick(change: number) {
    socket.emit("dice_count_update", { playerID: player.id, change });
  }

  useEffect(() => {
    socket.on("update_lobby", ({ allVisible }) => {
      setAllVisible(allVisible);
    });
  }, [socket]);

  return (
    <div className={css(styles.main, !isViewer && styles.otherPlayer)}>
      <div className={css(styles.actions)}>
        <button
          className={css(styles.action)}
          onClick={() => onClick(1)}
          disabled={!isViewer}
        >
          +
        </button>
        <button
          className={css(styles.action)}
          onClick={() => onClick(-1)}
          disabled={!isViewer}
        >
          -
        </button>
        <button
          className={css(styles.action)}
          onClick={() => onClick(0)}
          disabled={!isViewer}
        >
          R
        </button>
      </div>
      <div>
        {hostID === player.id && <div>&lt;host&gt;</div>}
        <div>{player.name}</div>
        <div>Last Rolled at: {player.lastRolledAt}</div>
        <div className={css(styles.hand)}>
          {player.dice.map((value: number, i: number) => (
            <Dice value={value} key={i} isHidden={!isViewer && !allVisible} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: "32px 8px",
    borderBottom: "1px solid #BBBBBB",
    flex: "0 0 auto",
    flexDirection: "row",
    display: "flex",
    gap: "8px",
  },
  otherPlayer: {
    background: "#DDDEEE",
    color: "#AAAAAA",
  },
  actions: {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: "32px",
  },
  action: {
    flex: "1 1 auto",
    height: "100%",
    minWidth: "16px",
  },
  hand: {
    display: "flex",
    flexDirection: "row",
    gap: "2px",
  },
});

export default Player;
