import { Socket } from 'socket.io-client';

import React, { useState, useEffect } from 'react';
import { css, StyleSheet } from 'aphrodite';

import Dice from 'game/Dice';

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
    socket.emit('dice_count_update', { playerID: player.id, change });
  }

  useEffect(() => {
    socket.on('update_lobby', ({ allVisible }) => {
      setAllVisible(allVisible);
    });
  }, [socket]);

  return (
    <div className={css(styles.main)}>
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
      <div className={css(styles.view)}>
        <div>
          {isViewer ? <span>(You)</span> : ''} {player.name}{' '}
          {hostID === player.id && <span>(host)</span>}{' '}
        </div>
        <div className={css(styles.hand)}>
          {player.dice.map((value: number, i: number) => (
            <Dice
              isHidden={!isViewer && !allVisible}
              key={i}
              ownership={isViewer ? 'self' : 'other'}
              value={value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#333357',
    borderRadius: '32px',
    color: '#FFFFFF',
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'row',
    gap: '8px',
    padding: '32px 24px',
  },
  view: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    justifyContent: 'space-between',
  },
  actions: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: '32px',
  },
  action: {
    flex: '1 1 auto',
    height: '100%',
    minWidth: '16px',
  },
  hand: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2px',
    flexWrap: 'wrap',
  },
});

export default Player;
