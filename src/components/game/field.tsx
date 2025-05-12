'use client';

import React, { FC as FunctionComponent, useEffect, useState } from 'react';
import { BlockState, BlockValue } from '@/components/game/types';
import Block from '@/components/game/block';

const Field: FunctionComponent = () => {
  const [field, setField] = useState<BlockState[][]>([]);

  useEffect(() => {
    const size: number = 8; // Define the size of the field
    const initialField: BlockState[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        value: BlockValue.EMPTY,
        isLocked: false,
        isError: false,
      }))
    );
    setField(initialField);
  }, []);

  const handleBlockClick = (rowIndex: number, cellIndex: number) => {
    setField((prevField) => {
      let newField = prevField;
      newField = newField.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          if (rIdx === rowIndex && cIdx === cellIndex) {
            return {
              ...cell,
              value: (cell.value + 1) % 3,
            };
          }
          return cell;
        })
      );
      // reset isError for all cells
      newField = newField.map((row) =>
        row.map((cell) => ({
          ...cell,
          isError: false,
        }))
      );
      // if there are 2 or more suns or moons in a row, set isError to true
      for (let rowIndex = 0; rowIndex < newField.length; rowIndex++) {
        const sunCount = newField[rowIndex].filter((cell) => cell.value === BlockValue.SUN).length;
        const moonCount = newField[rowIndex].filter((cell) => cell.value === BlockValue.MOON).length;
        if (sunCount > 2 || moonCount > 2) {
          newField[rowIndex].forEach((cell) => {
            if (cell.value === BlockValue.SUN || cell.value === BlockValue.MOON) {
              cell.isError = true;
            }
          });
        }
      }
      // if there are 2 or more suns or moons in a column, set isError to true
      for (let colIndex = 0; colIndex < newField[0].length; colIndex++) {
        const sunCount = newField.filter((row) => row[colIndex].value === BlockValue.SUN).length;
        const moonCount = newField.filter((row) => row[colIndex].value === BlockValue.MOON).length;
        if (sunCount > 2 || moonCount > 2) {
          newField.forEach((row, rowIndex) => {
            if (row[colIndex].value === BlockValue.SUN || row[colIndex].value === BlockValue.MOON) {
              newField[rowIndex][colIndex].isError = true;
            }
          });
        }
      }
      return newField;
    });
  };

  return (
    <div>
      {field.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {<Block state={cell} onClick={() => handleBlockClick(rowIndex, cellIndex)} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Field;