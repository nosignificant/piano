import { useEffect } from "react";

type LinePitch = {
  charGrid: string[][];
  onAsciiGridUpdate: (ascii: number[][]) => void;
};

export default function LinePitch({
  charGrid,

  onAsciiGridUpdate,
}: LinePitch) {
  const asciiGrid: number[][] = charGrid.map((row) =>
    row.map((char) => char.charCodeAt(0))
  );

  // 상위 컴포넌트에 전달
  useEffect(() => {
    onAsciiGridUpdate(asciiGrid);
  }, [charGrid]); // charGrid가 바뀔 때마다 asciiGrid 재계산

  return <div></div>;
}
