// Web Audio API Synthesizer for webMuse Platform
// Generates audio purely in the browser with zero network latency

let audioCtx: AudioContext | null = null;
let isMuted = true;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

// Initialize mute state from localStorage
if (typeof window !== "undefined") {
  const storedMute = localStorage.getItem("webmuse_audio_muted");
  isMuted = storedMute === null ? true : storedMute === "true";
}

export const audioSynth = {
  isMuted: () => isMuted,
  
  setMuted: (muted: boolean) => {
    isMuted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("webmuse_audio_muted", String(muted));
    }
    
    // Resume context if unmuting
    if (!muted) {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
    }
  },

  playClick: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    
    try {
      if (ctx.state === "suspended") ctx.resume();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.type = "sine";
      // Subtle high-pitch click
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio synthesis failed:", e);
    }
  },

  playTypeTick: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    
    try {
      if (ctx.state === "suspended") ctx.resume();
      
      const bufferSize = ctx.sampleRate * 0.015; // 15ms duration
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Generate pseudo-white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;
      
      // High-pass filter for typewriter tick texture
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(6000, ctx.currentTime);
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.012, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);
      
      noiseNode.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      noiseNode.start(ctx.currentTime);
      noiseNode.stop(ctx.currentTime + 0.015);
    } catch (e) {
      // Fallback to simple oscillator click if buffer generation fails
      try {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.frequency.setValueAtTime(3000, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.005, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.01);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.01);
      } catch (inner) {}
    }
  },

  playSuccess: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    
    try {
      if (ctx.state === "suspended") ctx.resume();
      
      const now = ctx.currentTime;
      // Arpeggiate three notes (C5, G5, C6)
      const notes = [523.25, 783.99, 1046.50];
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        
        gainNode.gain.setValueAtTime(0.08, now + idx * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.35);
        
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.35);
      });
    } catch (e) {
      console.warn("Audio synthesis failed:", e);
    }
  },
  
  playNotification: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    
    try {
      if (ctx.state === "suspended") ctx.resume();
      
      const now = ctx.currentTime;
      const notes = [880.00, 1318.51]; // A5, E6
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gainNode.gain.setValueAtTime(0.04, now + idx * 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    } catch (e) {
      console.warn("Audio synthesis failed:", e);
    }
  }
};
