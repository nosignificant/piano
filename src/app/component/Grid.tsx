"use client";

import { useState, useRef } from "react";
import InputRow from "./InputRow";
import LinePitch from "./LinePitch";
import Explain from "./Explain";
import { createAudioContext, transpose } from "../util/audioUtils";
import { playLine } from "../util/playLine";

const audioCtx = createAudioContext();

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

  const [grid, setGrid] = useState<string[][]>(charGrid);
  const [asciiGrid, setAsciiGrid] = useState<number[][]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  function playAsciiGrid(asciiGrid: number[][]) {
    const transposed = transpose(asciiGrid); // now it's col-major

    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex >= transposed.length) {
        clearInterval(interval);
        return;
      }

      const line = transposed[lineIndex];
      if (audioCtx !== null) playLine(line, audioCtx);
      setCurrentLine(lineIndex); // 현재 줄 하이라이트용

      lineIndex++;
    }, 500); // 0.5초 간격
  }

  function clearGrid() {
    const row = Array(maxCol).fill("");
    const clearGrid = Array(maxRow)
      .fill("")
      .map(() => [...row]);
    setGrid(clearGrid);

    inputRefs.current = Array.from({ length: maxRow }, () =>
      Array(maxCol).fill(null)
    );
  }

  return (
    <div className="flex flex-row justify-between mt-6">
      <div className="flex flex-col">
        {grid.map((row, rowIndex) => (
          <InputRow
            key={rowIndex}
            rowIndex={rowIndex}
            setGrid={setGrid}
            grid={grid}
            asciiGrid={asciiGrid}
            currentLine={currentLine}
            maxRow={maxRow}
            maxCol={maxCol}
            inputRefs={inputRefs}
          ></InputRow>
        ))}
        <LinePitch charGrid={grid} onAsciiGridUpdate={setAsciiGrid} />
        <div className="flex flex-row justify-between">
          <div className="Bodoni w-[30px] h-[20px]">
            <button
              className="bg-black text-white"
              onClick={() => {
                playAsciiGrid(asciiGrid);
              }}
            >
              play
            </button>

            <button
              className="bg-black text-white"
              onClick={() => {
                clearGrid();
              }}
            >
              clear
            </button>
          </div>
          <Explain />
        </div>
      </div>
    </div>
  );
}
