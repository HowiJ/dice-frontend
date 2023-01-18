import React from 'react';
import { css, StyleSheet } from 'aphrodite';

import { ReactComponent as DiceOne } from '../static/dice/dice-one.svg';
import { ReactComponent as DiceTwo } from '../static/dice/dice-two.svg';
import { ReactComponent as DiceThree } from '../static/dice/dice-three.svg';
import { ReactComponent as DiceFour } from '../static/dice/dice-four.svg';
import { ReactComponent as DiceFive } from '../static/dice/dice-five.svg';
import { ReactComponent as DiceSix } from '../static/dice/dice-six.svg';
import { ReactComponent as DiceHidden } from '../static/dice/dice-hidden.svg';

type Props = Readonly<{
  value: number;
  isHidden: boolean;
  ownership: 'self' | 'other';
}>;

type DiceProps = Readonly<{
  value: number;
  fill: string;
}>;

function DiceImg({ value, fill }: DiceProps) {
  switch (value) {
    case 1:
      return <DiceOne className={css(styles.dice)} fill={fill} />;
    case 2:
      return <DiceTwo className={css(styles.dice)} fill={fill} />;
    case 3:
      return <DiceThree className={css(styles.dice)} fill={fill} />;
    case 4:
      return <DiceFour className={css(styles.dice)} fill={fill} />;
    case 5:
      return <DiceFive className={css(styles.dice)} fill={fill} />;
    case 6:
      return <DiceSix className={css(styles.dice)} fill={fill} />;
    default:
      return <DiceHidden className={css(styles.dice, styles.hidden)} />;
  }
}

function Dice({ value, isHidden, ownership }: Props): React.ReactElement {
  const fill = ownership === 'self' ? '#069AB4' : '#7139E0';
  return (
    <div className={css(styles.main)}>
      <DiceImg value={isHidden ? 100 : value} fill={fill} />
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: '0 0 auto',
    height: '32px',
    width: '32px',
    borderRadius: '2px',
  },
  dice: {
    borderRadius: '4px',
  },
  hidden: {
    backgroundColor: '#7139E0',
  },
});

export default Dice;
