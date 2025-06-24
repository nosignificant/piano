// utils/playLine.ts
import { loadAndPlayAudioWithPitch } from "./audioUtils";

export function playLine(line: number[], audioCtx: AudioContext) {
  line.forEach((ascii) => {
    if (typeof ascii !== "number" || isNaN(ascii)) return;
    if (ascii === 32) return;

    const pitchRate = 0.5 + (ascii % 50);
    loadAndPlayAudioWithPitch(audioCtx, "/sound.mp3", pitchRate);
  });
}
