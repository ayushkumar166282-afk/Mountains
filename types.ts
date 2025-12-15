export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string; // URL for audio
  duration: number; // in seconds
  album?: string;
  isLocal?: boolean;
  themeColor?: string; // Tailwind class like 'bg-blue-400'
}

export enum PlayerState {
  PLAYING,
  PAUSED,
  STOPPED
}

export interface AudioContextType {
  currentSong: Song | null;
  playlist: Song[];
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (time: number) => void;
  addLocalSongs: (files: FileList) => void;
  setVolume: (val: number) => void;
}