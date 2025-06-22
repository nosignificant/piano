"use client";

import { useState, useRef } from "react";
import InputRow from "./InputRow";

export default function Grid() {
  //array를 new Array이렇게 선언하는 게 아니고 값을 받아와서, 그걸 map으로 펼쳐놓는 방식
  // 여기서 grid가 private, setGrid가 public으로 접근하는 개념이라고 생각해도 될라나
  const maxCol = 10;
  const maxRow = 5;

  const charRow = Array(maxCol).fill("");
  const charGrid = Array(maxRow)
    .fill("")
    .map(() => [...charRow]);

  const inputRefs = useRef<Array<Array<HTMLInputElement | null>>>(
    charGrid.map(() => Array(maxCol).fill(null))
  );
  console.log(" grid: inputRefs", inputRefs);
  const [grid, setGrid] = useState<string[][]>(charGrid);
  return (
    <div className="flex flex-col">
      {grid.map((row, rowIndex) => (
        <InputRow
          key={rowIndex}
          rowIndex={rowIndex}
          setGrid={setGrid}
          charGrid={grid}
          maxRow={maxRow}
          maxCol={maxCol}
          inputRefs={inputRefs}
        ></InputRow>
      ))}
    </div>
  );
}
