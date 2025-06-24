// utils/audioUtils.ts
export function createAudioContext(): AudioContext | null {
  if (typeof window !== "undefined") {
    const AudioCtx = window.AudioContext;
    return new AudioCtx();
  }
  return null;
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
