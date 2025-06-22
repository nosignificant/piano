import InputBlock from "./InputBlock";

type inputRow = {
  rowIndex: number;
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  charGrid: string[][];
  asciiGrid: number[][];
  currentLine: number;
  maxRow: number;
  maxCol: number;
  inputRefs: React.MutableRefObject<Array<Array<HTMLInputElement | null>>>;
};

export default function inputRow({
  rowIndex,
  setGrid,
  charGrid,
  asciiGrid,
  currentLine,
  maxRow,
  maxCol,
  inputRefs,
}: inputRow) {
  const row = charGrid[rowIndex];
  return (
    <div
      className={`flex ${
        currentLine === rowIndex ? "bg-blue-300" : "bg-white"
      }`}
    >
      {" "}
      {row.map((col, colIndex) => (
        <InputBlock
          key={`${rowIndex}-${colIndex}`}
          rowIndex={rowIndex}
          colIndex={colIndex}
          setGrid={setGrid}
          asciiGrid={asciiGrid}
          maxRow={maxRow}
          maxCol={maxCol}
          inputRefs={inputRefs}
        ></InputBlock>
      ))}
    </div>
  );
}
