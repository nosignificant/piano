// utils/audioUtils.ts
export function createAudioContext(): AudioContext | null {
  if (typeof window !== "undefined") {
    const AudioCtx = window.AudioContext;
    return new AudioCtx();
  }
  return null;
}
