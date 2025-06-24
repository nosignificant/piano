import InputBlock from "./InputBlock";

type inputRow = {
  rowIndex: number;
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  grid: string[][];
  asciiGrid: number[][];
  currentLine: number;
  maxRow: number;
  maxCol: number;
  inputRefs: React.MutableRefObject<Array<Array<HTMLInputElement | null>>>;
};

export default function inputRow({
  rowIndex,
  setGrid,
  grid,
  currentLine,
  maxRow,
  maxCol,
  inputRefs,
}: inputRow) {
  return (
    <div className="flex flex-row">
      {" "}
      {grid[rowIndex].map((col, colIndex) => (
        <InputBlock
          key={`${rowIndex}-${colIndex}`}
          rowIndex={rowIndex}
          colIndex={colIndex}
          setGrid={setGrid}
          grid={grid}
          maxRow={maxRow}
          maxCol={maxCol}
          inputRefs={inputRefs}
          currentLine={currentLine}
        ></InputBlock>
      ))}
    </div>
  );
}
