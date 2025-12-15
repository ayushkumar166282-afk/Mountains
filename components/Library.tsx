import React, { useRef, useState, useMemo } from 'react';
import { Song } from '../types';
import { ChevronLeft, MoreHorizontal, Play, Pause, AudioLines, Upload as UploadIcon } from 'lucide-react';
import { ALBUMS } from '../constants';

interface LibraryProps {
  playlist: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onUpload: (files: FileList) => void;
  onTogglePlay: () => void;
  isDarkMode: boolean;
}

export const Library: React.FC<LibraryProps> = ({ 
  playlist, 
  currentSong, 
  isPlaying, 
  onPlay, 
  onUpload,
  onTogglePlay,
  isDarkMode
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
      // Optional: Automatically select "My Songs" view when uploading
      setSelectedAlbumId('local');
    }
  };

  const toggleAlbumSelection = (id: string) => {
    if (selectedAlbumId === id) {
      setSelectedAlbumId(null); // Deselect
    } else {
      setSelectedAlbumId(id);
    }
  };

  // Filter logic
  const filteredPlaylist = useMemo(() => {
    if (!selectedAlbumId) return playlist;

    if (selectedAlbumId === 'local') {
      return playlist.filter(song => song.isLocal);
    }

    // Default filter by album name matching the ID (assuming ID matches album name for now, or extending logic)
    return playlist.filter(song => song.album === selectedAlbumId);
  }, [playlist, selectedAlbumId]);

  const bgColor = isDarkMode ? 'bg-slate-950' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const subTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-400';
  const cardHover = isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50';
  const activeCard = isDarkMode ? 'bg-white/10' : 'bg-blue-50/50';

  return (
    <div className={`h-full w-full flex flex-col overflow-y-auto hide-scrollbar ${bgColor} transition-colors duration-500`}>
      
      {/* Header Section with Blur Effect - Height Increased to 55vh */}
      <div className="relative w-full h-[55vh] bg-slate-900 flex flex-col shrink-0 overflow-hidden">
        
        {/* Nav Bar */}
        <div className="flex justify-between items-center p-6 pt-12 text-white z-20">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md active:scale-95 transition">
             <ChevronLeft size={24} className="opacity-90" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md active:scale-95 transition">
             <MoreHorizontal size={24} className="opacity-90" />
          </button>
        </div>

        {/* Hero Image - Full Fidelity */}
        <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
               alt="Hero" 
               className="w-full h-full object-cover"
             />
             {/* Subtle dark overlay for global contrast without color gradients */}
             <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Bottom Glass Bar - The requested "blur effect" instead of gradient */}
        <div className="relative z-10 mt-auto w-full backdrop-blur-xl bg-white/10 border-t border-white/20 px-8 py-8 flex justify-between items-end shadow-2xl">
            <div className="flex flex-col gap-1">
               <h1 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">Space Mariachi</h1>
               <p className="text-white/80 text-sm font-medium tracking-wide">34m Monthly Listener</p>
            </div>

            {/* Hero Controls (Visualizer + Play) */}
            <div className="flex items-center gap-4 pb-1">
                {/* Static Visualizer Graphic */}
                <div className="flex gap-1 items-end h-6 opacity-90">
                    <div className="w-[3px] h-2 bg-white shadow-sm"></div>
                    <div className="w-[3px] h-4 bg-white shadow-sm"></div>
                    <div className="w-[3px] h-7 bg-white shadow-sm"></div>
                    <div className="w-[3px] h-3 bg-white shadow-sm"></div>
                    <div className="w-[3px] h-5 bg-white shadow-sm"></div>
                </div>
                {/* Play Indicator */}
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg cursor-pointer hover:bg-white/30 transition">
                    <Play fill="white" className="text-white ml-0.5" size={20} />
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 px-6 py-8 pb-32 ${bgColor} transition-colors duration-500`}>
        
        {/* Albums Section */}
        <div className="mb-10">
           <h2 className={`text-xl font-bold mb-6 ${textColor}`}>Albums</h2>
           <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-4 pl-1">
              {ALBUMS.map(album => {
                const isSelected = selectedAlbumId === album.id;
                return (
                  <div 
                    key={album.id} 
                    onClick={() => toggleAlbumSelection(String(album.id))}
                    className={`flex-shrink-0 flex items-center gap-4 min-w-[170px] cursor-pointer transition-all duration-300 ${isSelected ? 'scale-105 opacity-100' : 'hover:opacity-80 opacity-90'}`}
                  >
                     {/* Album Art Box */}
                     <div className={`w-20 h-20 ${album.color} rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200 relative ${isSelected ? 'ring-4 ring-offset-2 ring-blue-500/20' : ''}`}>
                        {album.icon === 'bars' && <AudioLines className="text-white" size={28} />}
                        {album.icon === 'play' && <Play fill="white" className="text-white ml-1" size={28} />}
                        {album.icon === 'upload' && <UploadIcon className="text-white" size={28} />}
                     </div>
                     {/* Album Text */}
                     <div className="flex flex-col">
                        <span className={`font-bold text-base ${isSelected ? 'text-blue-600' : isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{album.title}</span>
                        <span className={`${subTextColor} text-xs mt-1 font-medium tracking-wide`}>{album.artist}</span>
                     </div>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Songs Section */}
        <div>
           <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${textColor}`}>
                {selectedAlbumId ? (selectedAlbumId === 'local' ? 'My Uploads' : selectedAlbumId) : 'Songs'}
              </h2>
              <input 
                  type="file" 
                  accept="audio/*" 
                  multiple 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
              />
              <button onClick={handleUploadClick} className="flex items-center gap-1 text-xs text-blue-600 font-bold uppercase tracking-wider hover:bg-blue-50 px-3 py-1.5 rounded-full transition">
                <UploadIcon size={14} /> Upload
              </button>
           </div>

           <div className="flex flex-col gap-6 min-h-[200px]">
              {filteredPlaylist.length === 0 ? (
                <div className={`flex flex-col items-center justify-center h-40 text-sm rounded-2xl border border-dashed ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-gray-50 border-gray-200 text-slate-400'}`}>
                  <p>No songs found.</p>
                  {selectedAlbumId === 'local' && <p className="mt-1">Upload some music to get started!</p>}
                </div>
              ) : (
                filteredPlaylist.map((song) => {
                    const isCurrent = currentSong?.id === song.id;
                    const isPlayingState = isCurrent && isPlaying;

                    return (
                      <div 
                        key={song.id} 
                        onClick={() => onPlay(song)}
                        className={`flex items-center justify-between cursor-pointer p-2 rounded-xl transition-all ${isCurrent ? activeCard : cardHover}`}
                      >
                         <div className="flex items-center gap-4">
                            {/* Colored Square with Icon */}
                            <div className={`w-14 h-14 rounded-2xl ${song.themeColor || 'bg-gray-300'} flex items-center justify-center text-white shadow-md transition-transform active:scale-95`}>
                                {isPlayingState ? (
                                    <Pause fill="white" size={20} />
                                ) : (
                                    <Play fill="white" size={20} className="ml-1" />
                                )}
                            </div>
                            
                            {/* Text Info */}
                            <div className="flex flex-col">
                               <h3 className={`font-bold text-base ${isCurrent ? 'text-blue-500' : textColor}`}>{song.title}</h3>
                               <p className={`text-xs ${subTextColor} mt-1 font-medium`}>{song.artist}</p>
                            </div>
                         </div>

                         {/* Right Side Visualizer (Only visible if playing this song) */}
                         {isCurrent ? (
                            <div className="flex gap-[3px] h-5 items-center pr-2">
                                <div className="w-[4px] bg-blue-500 rounded-full h-full animate-pulse"></div>
                                <div className="w-[4px] bg-blue-500 rounded-full h-2/3 animate-pulse delay-75"></div>
                                <div className="w-[4px] bg-blue-500 rounded-full h-full animate-pulse delay-150"></div>
                                <div className="w-[4px] bg-blue-500 rounded-full h-1/2 animate-pulse"></div>
                            </div>
                         ) : (
                            <div className="pr-2 opacity-0 group-hover:opacity-100">
                               <Play size={20} className="text-slate-300" />
                            </div>
                         )}
                      </div>
                    );
                })
              )}
           </div>
        </div>

      </div>
    </div>
  );
};