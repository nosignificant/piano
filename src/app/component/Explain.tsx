import { useState } from "react";
export default function Explain() {
  const [isOpen, setOpen] = useState(false);
  function openThis() {
    setOpen((prev) => !prev);
  }
  return (
    <div className="consolas">
      <div className="Bodoni" onClick={openThis}>
        what is this site?
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isOpen && (
            <div className="w-[500px] consolas ">
              This was inspired by{" "}
              <a
                className="border-b border-solid"
                href="https://100r.co/site/orca.html"
              >
                ORCΛ
              </a>
              , a two-dimensional esoteric programming language. I wondered what
              if letter converted into sound and make music. write down letters
              above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
