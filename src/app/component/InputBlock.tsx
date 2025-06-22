import { MutableRefObject, useEffect } from "react";

type blockProps = {
  rowIndex: number;
  colIndex: number;
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  maxRow: number;
  maxCol: number;
  inputRefs: MutableRefObject<Array<Array<HTMLInputElement | null>>>;
};

export default function InputBlock({
  rowIndex,
  colIndex,
  setGrid,
  maxRow,
  maxCol,
  inputRefs,
}: blockProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const value = e.target.value;

    if (value.length > 1) return;

    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[row][col] = value;
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
  useEffect(() => {
    console.log("inputRefs.current inside useEffect", inputRefs.current);
  }, []);
  console.log("inputRefs.current", inputRefs.current);
  console.log(" inputBlock: inputRefs", inputRefs);

  return (
    <div className="w-[50px] h-[50px] border border-solid flex justify-center items-center">
      <input
        ref={(el) => {
          if (!inputRefs.current) return;
          if (!inputRefs.current[rowIndex]) return;
          inputRefs.current[rowIndex][colIndex] = el;
        }}
        className="text-center w-full h-full"
        maxLength={1}
        onChange={(e) => handleChange(e, rowIndex, colIndex)}
      />
    </div>
  );
}
