import React, { useState, useEffect, useRef } from 'react';
import { Song } from './types';
import { INITIAL_PLAYLIST } from './constants';
import { audioService } from './services/audioService';
import { Library } from './components/Library';
import { FullPlayer } from './components/FullPlayer';
import { MiniPlayer } from './components/MiniPlayer';

const App: React.FC = () => {
  const [view, setView] = useState<'library' | 'player'>('library');
  const [playlist, setPlaylist] = useState<Song[]>(INITIAL_PLAYLIST);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Settings State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEqualizerEnabled, setIsEqualizerEnabled] = useState(false);
  const [eqPreset, setEqPreset] = useState('Balanced');

  // Sync state with Audio Service events
  useEffect(() => {
    const audio = audioService.getElement();

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => playNext();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playlist, currentSong]); // Dependency on playlist for next song logic

  const playSong = async (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    await audioService.play(song.src);
  };

  const togglePlay = () => {
    audioService.toggle();
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playSong(playlist[nextIndex]);
  };

  const playPrev = () => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[prevIndex]);
  };

  const handleSeek = (time: number) => {
    audioService.seek(time);
    setProgress(time);
  };

  const handleFileUpload = (files: FileList) => {
    const newSongs: Song[] = Array.from(files).map((file, index) => ({
      id: `local-${Date.now()}-${index}`,
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: 'Unknown Artist',
      album: 'Local Upload',
      cover: `https://picsum.photos/400/400?random=${Date.now() + index}`,
      src: URL.createObjectURL(file),
      duration: 0,
      isLocal: true
    }));

    setPlaylist(prev => [...newSongs, ...prev]); // Add to top
    playSong(newSongs[0]); // Auto play first uploaded
    setView('player');
  };

  return (
    <div className={`relative h-full w-full overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
      
      {/* Library View */}
      <div className={`h-full w-full transition-transform duration-500 ease-in-out ${view === 'player' ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
        <Library 
          playlist={playlist}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlay={(song) => {
            playSong(song);
            setView('player'); // Auto-open player
          }}
          onUpload={handleFileUpload}
          onTogglePlay={togglePlay}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Mini Player (Only show if not in full player view and song exists) */}
      {currentSong && view === 'library' && (
        <MiniPlayer 
          song={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onExpand={() => setView('player')}
          onNext={playNext}
          progress={progress}
          duration={duration}
        />
      )}

      {/* Full Player Overlay */}
      {view === 'player' && (
        <FullPlayer 
          song={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onClose={() => setView('library')}
          onTogglePlay={togglePlay}
          onNext={playNext}
          onPrev={playPrev}
          onSeek={handleSeek}
          
          // Settings Props
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isEqualizerEnabled={isEqualizerEnabled}
          toggleEqualizer={() => setIsEqualizerEnabled(!isEqualizerEnabled)}
          eqPreset={eqPreset}
          setEqPreset={setEqPreset}
        />
      )}
    </div>
  );
};

export default App;