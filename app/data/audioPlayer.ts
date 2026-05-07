"use client";

export const playAudio = (file: string) => {
  if (typeof window !== 'undefined') {
    const audio = new Audio(`/${file}`);
    audio.play().catch((err) => console.error("Audio playback failed:", err));
  }
};
