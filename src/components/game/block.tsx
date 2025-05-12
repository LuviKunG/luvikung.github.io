'use client';

import { FC as FunctionComponent, MouseEventHandler } from 'react';
import { BlockState, BlockValue } from '@/components/game/types';

const Block: FunctionComponent<Readonly<{ state: BlockState, onClick: MouseEventHandler<HTMLButtonElement> }>> = ({ state, onClick }) => {
  return (
    <>
      <button onClick={onClick} style={{
        display: 'block',
        width: '30px',
        height: '30px',
        border: '1px solid black',
        backgroundColor: state.isError ? 'red' : 'clear',
      }} disabled={state.isLocked}>
        {
          state.value === BlockValue.SUN ? (
            '☀️'
          ) : state.value === BlockValue.MOON ? (
            '🌙'
          ) : ''
        }
      </button>
    </>
  );
};

export default Block;