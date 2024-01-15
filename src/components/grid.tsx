import { createId } from "@paralleldrive/cuid2";
import React, { useMemo, useState } from "react";

type Box = {
  id: string;
  value: number;
};

function createMatrix(size: number): Box[][] {
  const matrix: Box[][] = [];
  let counter = 1;
  for (let i = 0; i < size; i++) {
    const row: Box[] = [];

    for (let j = 0; j < size; j++) {
      row.push({
        id: createId(),
        value: counter,
      });
      counter += 1;
    }
    matrix.push(row);
  }
  return matrix;
}

type Props = {
  size: number;
};

export const Grid: React.FC<Props> = ({ size }) => {
  const initialGrid = useMemo(() => createMatrix(size), [size]);
  const [grid, setGrid] = useState<Box[][]>(initialGrid);
  const [selectedIds, setSelectedIds] = useState<Array<Box["id"]>>([]);

  return (
    <React.Fragment>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((box, boxIndex) => (
            <button
              type="button"
              key={box.id}
              className="border border-border p-2 h-10 w-10">
              {box.value}
            </button>
          ))}
        </div>
      ))}
    </React.Fragment>
  );
};
