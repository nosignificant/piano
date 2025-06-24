import { useRef, useEffect } from "react";

type blockProps = {
  rowIndex: number;
  colIndex: number;
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  grid: string[][];
  maxRow: number;
  maxCol: number;
  inputRefs: React.MutableRefObject<Array<Array<HTMLInputElement | null>>>;
  currentLine: number;
};

export default function InputBlock({
  rowIndex,
  colIndex,
  setGrid,
  grid,
  maxRow,
  maxCol,
  inputRefs,
  currentLine,
}: blockProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const value = e.target.value;
    console.log(value);
    if (value.length > 1) {
      e.target.value = value[value.length - 1]; // 마지막 글자만 사용
    }

    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row]); // 깊은 복사
      newGrid[row][col] = e.target.value;
      return newGrid;
    });

    // 다음 input으로 포커스 이동
    if (value) {
      let nextCol = col + 1;
      let nextRow = row;

      if (nextCol >= maxCol) {
        nextCol = 0;
        nextRow += 1;
      }

      if (nextRow < maxRow) {
        inputRefs.current?.[nextRow]?.[nextCol]?.focus();
      }
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const input = e.currentTarget;

    if (e.key === "Backspace") {
      if (input.value !== "") {
        // 현재 input 값 지우기
        input.value = "";

        // 그리고 grid 상태도 업데이트
        setGrid((prev) => {
          const newGrid = [...prev];
          newGrid[row][col] = "";
          return newGrid;
        });
      } else {
        // 이전 input으로 이동
        let prevCol = col - 1;
        let prevRow = row;

        if (prevCol < 0) {
          prevCol = maxCol - 1;
          prevRow -= 1;
        }

        if (prevRow >= 0) {
          inputRefs.current?.[prevRow]?.[prevCol]?.focus();
        }
      }
    }
  };

  const blockRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;
    if (colIndex === currentLine) {
      block.classList.add("bg-black", "text-white");
    } else {
      block.classList.remove("bg-black", "text-white");
      //block.classList.add("");
    }
  }, [currentLine]);
  return (
    <div
      ref={blockRef}
      className="w-[50px] h-[50px] flex justify-center border-b border-black
      items-center transition-colors duration-500 wingding"
    >
      <input
        ref={(el) => {
          inputRefs.current[rowIndex][colIndex] = el;
        }}
        value={grid[rowIndex][colIndex] ?? "f"}
        className="text-center w-full h-full"
        maxLength={1}
        onChange={(e) => handleChange(e, rowIndex, colIndex)}
        onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
      />
    </div>
  );
}
