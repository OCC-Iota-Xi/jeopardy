"use client";

let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

export const playSound = (type: 'start' | 'select' | 'correct' | 'incorrect') => {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if it's suspended (browsers require user interaction to play audio)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const playOscillator = (type: OscillatorType, freq: number, duration: number, rampDownTime: number, volume: number = 0.1) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + rampDownTime);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  };

  switch (type) {
    case 'start':
      // A rising chord effect for starting the game
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        setTimeout(() => {
          if (ctx.state === 'suspended') ctx.resume();
          playOscillator('sine', freq, 0.5, 0.4);
        }, i * 100);
      });
      break;
    case 'select':
      // Short blip for selecting a question
      playOscillator('triangle', 600, 0.1, 0.1, 0.05);
      break;
    case 'correct':
      // Happy arpeggio for correct answer
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        setTimeout(() => {
          if (ctx.state === 'suspended') ctx.resume();
          playOscillator('sine', freq, 0.4, 0.3);
        }, i * 80);
      });
      break;
    case 'incorrect':
      // Buzzer sound for incorrect answer
      playOscillator('sawtooth', 150, 0.4, 0.4, 0.1);
      setTimeout(() => {
        if (ctx.state === 'suspended') ctx.resume();
        playOscillator('sawtooth', 140, 0.4, 0.4, 0.1);
      }, 100);
      break;
  }
};
