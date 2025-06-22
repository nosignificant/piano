type blockProps = {
  rowIndex: number;
  colIndex: number;
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  asciiGrid: number[][];
  maxRow: number;
  maxCol: number;
  inputRefs: React.MutableRefObject<Array<Array<HTMLInputElement | null>>>;
};

export default function InputBlock({
  rowIndex,
  colIndex,
  setGrid,
  asciiGrid,
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
    console.log(value);
    if (value.length > 1) {
      e.target.value = value[value.length - 1]; // 마지막 글자만 사용
    }

    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row]); // 깊은 복사
      newGrid[row][col] = e.target.value;
      return newGrid;
    });

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (e.key === "Backspace") {
      let prevCol = col - 1;
      let prevRow = row;
      console.log(prevCol);
      if (prevCol === -1) {
        prevCol = maxCol - 1;
        prevRow -= 1;
      }
      inputRefs.current?.[prevRow]?.[prevCol]?.focus();
    }
  };

  return (
    <div className="w-[50px] h-[50px] bg-gray-200 flex justify-center items-center">
      <input
        ref={(el) => {
          inputRefs.current[rowIndex][colIndex] = el;
        }}
        className="text-center w-full h-full"
        maxLength={1}
        onChange={(e) => handleChange(e, rowIndex, colIndex)}
        onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
      />
    </div>
  );
}
