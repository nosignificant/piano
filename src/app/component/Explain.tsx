import { useState } from "react";
export default function Explain() {
  const [isOpen, setOpen] = useState(false);
  function openThis() {
    setOpen((prev) => !prev);
  }
  return (
    <div>
      <div onClick={openThis}>
        {" "}
        {!isOpen ? " what is this site? " : "close"}
      </div>
      {isOpen && (
        <div className="w-[500px]">
          This was inspired by [ORCΛ](https://100r.co/site/orca.html), Orca is a
          two-dimensional esoteric programming language. I wondered what if
          letter converted into sound and make music.
        </div>
      )}
    </div>
  );
}
