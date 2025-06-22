import InputBlock from "./InputBlock";
import { MutableRefObject } from "react";

type InputRowProps = {
  rowIndex: number;
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  charGrid: string[][];
  maxRow: number;
  maxCol: number;
  inputRefs: React.MutableRefObject<Array<Array<HTMLInputElement | null>>>;
};

export default function inputRow({
  rowIndex,
  setGrid,
  charGrid,
  maxRow,
  maxCol,
  inputRefs,
}: InputRowProps) {
  const row = charGrid[rowIndex];
  return (
    <div className="flex flex-row">
      {" "}
      {row.map((col, colIndex) => (
        <InputBlock
          key={`${rowIndex}-${colIndex}`}
          rowIndex={rowIndex}
          colIndex={colIndex}
          setGrid={setGrid}
          maxRow={maxRow}
          maxCol={maxCol}
          inputRefs={inputRefs}
        ></InputBlock>
      ))}
    </div>
  );
}
