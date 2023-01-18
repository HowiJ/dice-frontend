import React from 'react';
import { css, StyleSheet } from 'aphrodite';

import { ReactComponent as Copy } from '../static/copy.svg';

type Props = Readonly<{
  lobbyID: string;
}>;

function ConnectionStatus({ lobbyID }: Props): React.ReactElement {
  function copy() {
    navigator.clipboard.writeText(lobbyID);
  }

  return (
    <div className={css(styles.main)}>
      <div className={css(styles.dot)}></div>
      <span className={css(styles.text)}>Connected to:</span>
      <span className={css(styles.lobby)}>{lobbyID}</span>
      <button onClick={copy} className={css(styles.copy)}>
        <Copy className={css(styles.copy)} />
      </button>
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    margin: '16px',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
  },
  dot: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    backgroundColor: 'green',
    borderRadius: '8px',
  },
  lobby: {
    color: '#FFFFFF',
  },
  copy: {
    ':active': {
      fill: '#9CF6FC',
    },
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fill: '#069AB4',
    height: '16px',
    width: '16px',
  },
  text: {
    color: '#069AB4',
  },
});

export default ConnectionStatus;
