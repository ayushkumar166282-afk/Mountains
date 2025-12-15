// Simple wrapper for HTML5 Audio
export class AudioService {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  play(src: string) {
    this.audio.src = src;
    return this.audio.play();
  }

  toggle() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  pause() {
    this.audio.pause();
  }

  resume() {
    this.audio.play();
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  getElement() {
    return this.audio;
  }
}

export const audioService = new AudioService();
