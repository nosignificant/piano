"use client";

import { useState, useRef, useEffect } from "react";
import InputRow from "./InputRow";
import LinePitch from "./LinePitch";

const audioCtx = new (window.AudioContext ||
  (window as any).webkitAudioContext)();

export default function Grid() {
  //array를 new Array이렇게 선언하는 게 아니고 값을 받아와서, 그걸 map으로 펼쳐놓는 방식
  // 여기서 grid가 private, setGrid가 public으로 접근하는 개념이라고 생각해도 될라나
  const maxCol = 5;
  const maxRow = 10;

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
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex >= asciiGrid.length) {
        clearInterval(interval);
        return;
      }

      const line = asciiGrid[lineIndex];
      playLine(line);
      setCurrentLine(lineIndex); // 현재 줄 하이라이트용

      lineIndex++;
    }, 500); // 0.5초 간격
  }
  function playLine(line: number[]) {
    line.forEach((ascii) => {
      if (typeof ascii !== "number" || isNaN(ascii)) return;
      if (ascii === 32) return;

      const pitchRate = 0.5 + (ascii % 50);
      console.log(pitchRate);
      loadAndPlayAudioWithPitch("/sound.mp3", pitchRate);
    });
  }

  // 전역 또는 useEffect 밖

  async function loadAndPlayAudioWithPitch(url: string, pitchRate: number) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;

    // ✅ pitch를 바꾸고 싶다면 playbackRate 변경 (1.0 = 원래속도)
    source.playbackRate.value = pitchRate;

    source.connect(audioCtx.destination);
    source.start();
  }
  useEffect(() => {
    console.log("🟢 currentLine 상태가 바뀜:", currentLine);
  }, [currentLine]);
  return (
    <div className="flex flex-col">
      {grid.map((row, rowIndex) => (
        <InputRow
          key={rowIndex}
          rowIndex={rowIndex}
          setGrid={setGrid}
          charGrid={grid}
          asciiGrid={asciiGrid}
          currentLine={currentLine}
          maxRow={maxRow}
          maxCol={maxCol}
          inputRefs={inputRefs}
        ></InputRow>
      ))}
      <LinePitch charGrid={grid} onAsciiGridUpdate={setAsciiGrid} />
      <button
        onClick={() => {
          playAsciiGrid(asciiGrid);
        }}
      >
        play
      </button>
    </div>
  );
}
