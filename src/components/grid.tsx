import { cn } from "@/utils/cn";
import { createId } from "@paralleldrive/cuid2";
import React, { useMemo, useState } from "react";
import { Button } from "./button";
import { shuffle2dArray } from "@/utils/shuffle-2d-array";
import { are2dArraysEqual } from "@/utils/are-2d-arrays-equal";

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

  function toggleSelected(id: Box["id"]): void {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prevId) => prevId !== id);
      }
      return [...prev, id];
    });
  }

  return (
    <React.Fragment>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((box, boxIndex) => (
            <button
              type="button"
              key={box.id}
              className={cn(
                "border border-border p-2 h-10 w-10",
                selectedIds.includes(box.id) ? "bg-primary" : "bg-transparent"
              )}
              onClick={() => {
                toggleSelected(box.id);
              }}>
              {box.value}
            </button>
          ))}
        </div>
      ))}
      <div className="flex items-center mt-4 gap-2">
        <Button
          type="button"
          onClick={() => {
            setGrid((prev) => shuffle2dArray(prev));
          }}>
          Suffle
        </Button>
        <Button
          disabled={
            selectedIds.length === 0 && are2dArraysEqual(grid, initialGrid)
          }
          type="button"
          onClick={() => {
            setGrid(initialGrid);
            setSelectedIds([]);
          }}>
          Reset
        </Button>
      </div>
    </React.Fragment>
  );
};
