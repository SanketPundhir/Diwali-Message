// Web Audio API Synthesizer for Romantic Diwali Surprise
// Zero external audio files needed - works 100% reliably, offline and in all browsers

class RomanticAudioController {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private isMusicMuted: boolean = false;
  private isSfxMuted: boolean = false;
  private currentNoteIndex: number = 0;
  private loopTimer: number | null = null;

  // A romantic, emotional melody in G Major / E minor (warm, dreamy, soothing)
  private melodyNotes = [
    // Chord 1: G Maj 7 (dreamy, heartfelt)
    { freq: 392.0, duration: 0.6, bass: 196.0 }, // G4, G3
    { freq: 493.88, duration: 0.6, bass: 196.0 }, // B4
    { freq: 587.33, duration: 0.6, bass: 196.0 }, // D5
    { freq: 739.99, duration: 0.9, bass: 196.0 }, // F#5
    { freq: 587.33, duration: 0.6, bass: 196.0 }, // D5

    // Chord 2: Em 9 (emotional, romantic longing)
    { freq: 659.25, duration: 0.6, bass: 164.81 }, // E5, E3
    { freq: 587.33, duration: 0.6, bass: 164.81 }, // D5
    { freq: 493.88, duration: 0.6, bass: 164.81 }, // B4
    { freq: 440.0, duration: 0.9, bass: 164.81 }, // A4
    { freq: 392.0, duration: 0.6, bass: 164.81 }, // G4

    // Chord 3: C Maj 9 (loving, sweet, safe)
    { freq: 523.25, duration: 0.6, bass: 130.81 }, // C5, C3
    { freq: 587.33, duration: 0.6, bass: 130.81 }, // D5
    { freq: 659.25, duration: 0.6, bass: 130.81 }, // E5
    { freq: 783.99, duration: 0.9, bass: 130.81 }, // G5
    { freq: 659.25, duration: 0.6, bass: 130.81 }, // E5

    // Chord 4: D add9 (glowing, resolving with Diwali magic)
    { freq: 587.33, duration: 0.6, bass: 146.83 }, // D5, D3
    { freq: 739.99, duration: 0.6, bass: 146.83 }, // F#5
    { freq: 880.0, duration: 0.8, bass: 146.83 }, // A5
    { freq: 783.99, duration: 0.8, bass: 146.83 }, // G5
    { freq: 587.33, duration: 0.9, bass: 146.83 }, // D5
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gains
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.isMusicMuted ? 0 : 0.18, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.isSfxMuted ? 0 : 0.28, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Romantic background music player (Music box / Kalimba / warm Rhodes aesthetic)
  public startRomanticMusic() {
    this.initContext();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.playNextMelodyNote();
  }

  private playNextMelodyNote() {
    if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;

    const note = this.melodyNotes[this.currentNoteIndex];
    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;

    const now = this.ctx.currentTime;

    // Lead gentle bell/kalimba oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Harmonics for a sweet warm music-box chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note.freq, now);

    // Warm envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + note.duration * 1.4);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + note.duration * 1.5);

    // Soft sub/pad note on first note of chord
    if (note.bass && (this.currentNoteIndex - 1) % 5 === 0) {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(note.bass, now);

      bassGain.gain.setValueAtTime(0, now);
      bassGain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      bassOsc.connect(bassGain);
      bassGain.connect(this.musicGain);

      bassOsc.start(now);
      bassOsc.stop(now + 2.6);
    }

    // Schedule next note with a gentle tempo
    const stepDurationMs = note.duration * 850;
    this.loopTimer = window.setTimeout(() => {
      this.playNextMelodyNote();
    }, stepDurationMs);
  }

  public stopRomanticMusic() {
    this.isMusicPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  public toggleMusic(): boolean {
    this.initContext();
    this.isMusicMuted = !this.isMusicMuted;
    if (this.musicGain && this.ctx) {
      const target = this.isMusicMuted ? 0 : 0.18;
      this.musicGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.1);
    }
    if (!this.isMusicMuted && !this.isMusicPlaying) {
      this.startRomanticMusic();
    }
    return !this.isMusicMuted;
  }

  public toggleSfx(): boolean {
    this.initContext();
    this.isSfxMuted = !this.isSfxMuted;
    if (this.sfxGain && this.ctx) {
      const target = this.isSfxMuted ? 0 : 0.28;
      this.sfxGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    return !this.isSfxMuted;
  }

  public isMuted(): { music: boolean; sfx: boolean } {
    return { music: this.isMusicMuted, sfx: this.isSfxMuted };
  }

  // --- SOUND EFFECTS ---

  // Diya lighting bell chime
  public playDiyaChime(index: number = 0) {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const baseFreqs = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]; // C, D, E, G, A, high C
    const freq = baseFreqs[index % baseFreqs.length];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.15);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.85);

    // Sparkle harmonic
    const spark = this.ctx.createOscillator();
    const sparkGain = this.ctx.createGain();
    spark.type = 'triangle';
    spark.frequency.setValueAtTime(freq * 2, now + 0.03);
    sparkGain.gain.setValueAtTime(0.08, now + 0.03);
    sparkGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    spark.connect(sparkGain);
    sparkGain.connect(this.sfxGain);
    spark.start(now + 0.03);
    spark.stop(now + 0.45);
  }

  // Gift open magical chime
  public playGiftOpen() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(start);
      osc.stop(start + 0.55);
    });
  }

  // Sparkler / Phuljhari sizzle sound
  public playSparklerSound() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    // Buffer noise for crackle
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200 + Math.random() * 1200, now);
    filter.Q.setValueAtTime(3, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.15);
  }

  // Firework burst / Pataka pop sound
  public playFireworkBurst() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    // Low boom
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.45);

    // Crackle noise burst
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.18, now + 0.05);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noise.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now + 0.05);
    noise.stop(now + 0.35);
  }

  // Cute pop for quiz button
  public playCutePop() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.09);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  // Letter opening harp glissando
  public playLetterOpen() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const freqs = [330, 392, 493.88, 587.33, 659.25, 783.99, 987.77];
    const now = this.ctx.currentTime;
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.5);
    });
  }

  // Sweet Hug & Kiss sound
  public playKissSound() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.18);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }
}

export const romanticAudio = new RomanticAudioController();
