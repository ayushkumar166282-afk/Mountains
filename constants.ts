import { Song } from './types';

export const INITIAL_PLAYLIST: Song[] = [
  {
    id: '1',
    title: 'Supersonic',
    artist: 'Intergalaxy',
    album: 'Intergalaxy',
    cover: 'https://picsum.photos/400/400?random=1',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 360,
    themeColor: 'bg-blue-400'
  },
  {
    id: '2',
    title: 'Ladies Night',
    artist: 'Vegas Tour',
    album: 'Neon Lights',
    cover: 'https://picsum.photos/400/400?random=2',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 245,
    themeColor: 'bg-pink-400'
  },
  {
    id: '3',
    title: 'World Wide',
    artist: 'Global Beats',
    album: 'Earth',
    cover: 'https://picsum.photos/400/400?random=3',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 180,
    themeColor: 'bg-green-400'
  },
  {
    id: '4',
    title: 'Stardust Memories',
    artist: 'Cosmic Drift',
    album: 'Void',
    cover: 'https://picsum.photos/400/400?random=4',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 300,
    themeColor: 'bg-purple-400'
  }
];

export const ALBUMS = [
  { id: 'Intergalaxy', title: 'Intergalaxy', artist: '8 Songs', color: 'bg-blue-400', icon: 'bars' },
  { id: 'Fault', title: 'Fault', artist: '10 Songs', color: 'bg-orange-300', icon: 'play' },
  { id: 'local', title: 'My Songs', artist: 'Uploads', color: 'bg-purple-400', icon: 'upload' },
];