"use client";

class AudioController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private listeners: ((muted: boolean) => void)[] = [];

  constructor() {
    // Lazy initialize on first interaction
  }

  private initAudio() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      console.warn("Web Audio API not supported in this browser");
    }
  }

  public subscribe(cb: (muted: boolean) => void): () => void {
    this.listeners.push(cb);
    cb(this.isMuted);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isMuted));
  }

  public toggleSound(): boolean {
    this.initAudio();
    if (!this.ctx) return true;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbient();
      this.playClick(600, 0.08);
    } else {
      this.stopAmbient();
    }

    this.notify();
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick(freq = 520, duration = 0.04) {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore
    }
  }

  public playTechBeep(type: "high" | "low" | "success" = "high") {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      if (type === "success") {
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.03, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.12);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.12);
        });
      } else {
        const freq = type === "high" ? 880 : 330;
        this.playClick(freq, 0.06);
      }
    } catch {
      // ignore
    }
  }

  private startAmbient() {
    if (!this.ctx) return;
    this.stopAmbient();

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.025, this.ctx.currentTime + 2);
      this.ambientGain.connect(this.ctx.destination);

      // Create warm ambient drone chord (D minor / A minor ambient harmonics)
      const freqs = [110, 164.81, 220, 329.63];
      this.oscillators = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        const subGain = this.ctx!.createGain();
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);

        subGain.gain.setValueAtTime(0.3 / freqs.length, this.ctx!.currentTime);
        osc.connect(subGain);
        subGain.connect(this.ambientGain!);

        osc.start();
        return osc;
      });
    } catch {
      // ignore
    }
  }

  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.oscillators.forEach((o) => {
            try {
              o.stop();
              o.disconnect();
            } catch {
              // ignore
            }
          });
          this.oscillators = [];
          this.ambientGain?.disconnect();
          this.ambientGain = null;
        }, 500);
      } catch {
        // ignore
      }
    }
  }
}

export const audioController = typeof window !== "undefined" ? new AudioController() : (null as unknown as AudioController);
