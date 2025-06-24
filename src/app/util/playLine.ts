// utils/playLine.ts

export function playLine(line: number[], audioCtx: AudioContext) {
  console.log(line);
  line.forEach((ascii) => {
    if (typeof ascii !== "number" || isNaN(ascii)) return;
    if (ascii === 32) return;
    const pitchRate = 0.5 + (ascii % 50);
    loadAndPlayAudioWithPitch(audioCtx, "/sound.mp3", pitchRate);
  });
}

export async function loadAndPlayAudioWithPitch(
  audioCtx: AudioContext,
  url: string,
  pitchRate: number
) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.playbackRate.value = pitchRate;
  source.connect(audioCtx.destination);
  source.start();
}
