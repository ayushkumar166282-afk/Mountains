import React from 'react';
import { Song } from '../types';
import { Play, Pause, SkipForward } from './Icons';

interface MiniPlayerProps {
  song: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onExpand: () => void;
  onNext: () => void;
  progress: number;
  duration: number;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  song,
  isPlaying,
  onTogglePlay,
  onExpand,
  onNext,
  progress,
  duration
}) => {
  if (!song) return null;

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-30 animate-slide-up">
       <div 
         className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-3 pr-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center gap-4 cursor-pointer overflow-hidden relative"
         onClick={onExpand}
       >
          {/* Progress Overlay at bottom - Subtle */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-slate-200/50 w-full">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-linear" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Art */}
          <div className={`w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-sm ${isPlaying ? 'opacity-100' : 'opacity-90'}`}>
             <img src={song.cover} alt="art" className="w-full h-full object-cover" />
             {/* Center spinning element for fun - keep it subtle */}
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className={`w-4 h-4 rounded-full bg-black/20 backdrop-blur-sm border border-white/30 ${isPlaying ? 'animate-spin' : ''}`}></div>
             </div>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
             <h4 className="text-slate-800 font-bold text-sm truncate leading-tight">{song.title}</h4>
             <p className="text-slate-500 text-xs truncate font-medium">{song.artist}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
             <button 
               onClick={onTogglePlay}
               className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:scale-105 transition shadow-lg active:scale-95"
             >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
             </button>
             <button onClick={onNext} className="text-slate-500 hover:text-slate-900 p-2 transition">
                <SkipForward size={24} fill="currentColor" />
             </button>
          </div>
       </div>
    </div>
  );
};