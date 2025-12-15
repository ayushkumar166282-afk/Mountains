import React, { useEffect, useState, useRef } from 'react';
import { Song } from '../types';
import { X, MoreHorizontal, Play, Pause, SkipBack, SkipForward, Repeat, Heart, Moon, Sun, Zap, Check, SlidersHorizontal } from './Icons';

interface FullPlayerProps {
  song: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onClose: () => void;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  // Settings Props
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isEqualizerEnabled: boolean;
  toggleEqualizer: () => void;
  eqPreset: string;
  setEqPreset: (preset: string) => void;
}

export const FullPlayer: React.FC<FullPlayerProps> = ({
  song,
  isPlaying,
  progress,
  duration,
  onClose,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  isDarkMode,
  toggleDarkMode,
  isEqualizerEnabled,
  toggleEqualizer,
  eqPreset,
  setEqPreset
}) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  if (!song) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleRulerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rulerRef.current) return;
    const rect = rulerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const center = width / 2;
    
    // Scale: 20 pixels = 1 second
    const timeChange = (clickX - center) / 20;
    
    let newTime = progress + timeChange;
    if (newTime < 0) newTime = 0;
    if (newTime > duration) newTime = duration;
    
    onSeek(newTime);
  };

  const eqPresetsList = ['Bass Boost', 'Vocal', 'Treble', 'Balanced', 'Jazz', 'Rock'];

  return (
    <div className={`fixed inset-0 z-50 bg-[#3b82f6] text-white overflow-hidden transition-all duration-500 font-sans select-none ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
      
      {/* --- Background Geometric Shapes --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
          {/* Main Background Color - Light Blue Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa] to-[#2563eb]"></div>

          {/* Top Left Orange Circle */}
          <div className="absolute -top-[5%] -left-[15%] w-[65%] pb-[65%] rounded-full bg-[#FF9F5A] opacity-80 shadow-[0_0_100px_rgba(255,159,90,0.3)]"></div>

          {/* Top Right Pink Ring */}
          <div className="absolute -top-[10%] -right-[20%] w-[75%] pb-[75%] rounded-full border-[70px] border-[#F472B6] opacity-80 shadow-[0_0_80px_rgba(244,114,182,0.3)]"></div>
          {/* Inner circle for the pink ring - Darker Blue to match theme */}
          <div className="absolute top-[8%] -right-[5%] w-[40%] pb-[40%] rounded-full bg-[#1e40af]"></div>

          {/* Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30" style={{ stroke: 'white', strokeWidth: 1 }}>
             <line x1="20%" y1="20%" x2="80%" y2="15%" />
             <line x1="80%" y1="15%" x2="50%" y2="50%" />
             <circle cx="20%" cy="20%" r="2" fill="white" />
             <circle cx="80%" cy="15%" r="2" fill="white" />
             <circle cx="50%" cy="50%" r="2" fill="white" />
          </svg>
      </div>

      {/* --- Header --- */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 pt-10 pb-4">
        <button 
          onClick={onClose} 
          className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition active:scale-95 border border-white/10"
        >
          <X size={20} className="text-white" /> 
        </button>
        <button 
          onClick={() => setShowSettings(true)}
          className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition active:scale-95 border border-white/10"
        >
          <MoreHorizontal size={20} className="text-white" />
        </button>
      </div>

      {/* --- Album Art Area --- */}
      <div className={`absolute inset-0 flex flex-col items-center z-10 pointer-events-none transition-transform duration-500 ease-out ${showSettings ? 'scale-90 opacity-60' : 'scale-100 opacity-100'}`}>
          {/* The Blue Planet (Album Art Container) */}
          <div className="mt-[15vh] relative w-[70vw] max-w-[320px] aspect-square rounded-full bg-[#60a5fa] shadow-2xl flex items-center justify-center overflow-hidden">
               {/* Actual Album Art masked */}
               <img src={song.cover} alt="art" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay" />
               
               {/* Inner dark circle - Dark Blue */}
               <div className="absolute bottom-[20%] w-[35%] h-[35%] bg-[#1e40af] rounded-full translate-y-1/2"></div>
               
               {/* Orbital ring graphic overlay */}
               <div className="absolute inset-0 rounded-full border border-white/20 scale-90"></div>
          </div>
      </div>

      {/* --- Unified Bottom Glass Panel --- */}
      <div className={`absolute bottom-0 w-full h-[38%] z-30 backdrop-blur-3xl bg-gradient-to-b from-[#1e40af]/30 to-[#172554]/50 border-t border-white/20 flex flex-col items-center justify-start pt-10 shadow-[0_-15px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-in-out ${showSettings ? 'translate-y-full' : 'translate-y-0'}`}>
          
          {/* Decorative Top 'Tab' feel */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

          {/* Song Info */}
          <div className="flex flex-col items-center justify-center text-center w-full px-10 mb-4 relative z-20">
             <div className="absolute left-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-300/30 rounded-full hidden xs:block"></div>
             <div className="absolute right-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-pink-300/30 rounded-full hidden xs:block"></div>

             <h2 className="text-2xl font-bold text-white tracking-wide truncate w-full drop-shadow-md">{song.title}</h2>
             <p className="text-blue-200 text-sm mt-1 font-medium tracking-wider uppercase drop-shadow-sm">{song.artist}</p>
          </div>

          {/* Ruler Timeline */}
          <div className="w-full relative h-16 mb-4 flex-shrink-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/20 blur-xl pointer-events-none"></div>

              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#1e3a8a]/40 to-transparent z-20 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#1e3a8a]/40 to-transparent z-20 pointer-events-none"></div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white drop-shadow-md"></div>
              </div>

              <div 
                  ref={rulerRef} 
                  className="w-full h-full cursor-pointer relative overflow-hidden" 
                  onClick={handleRulerClick}
              >
                  <div 
                      className="absolute top-0 h-full flex left-1/2 will-change-transform items-center"
                      style={{ transform: `translateX(calc(-${progress * 20}px))` }} 
                  >
                       {Array.from({ length: Math.ceil(duration || 180) + 10 }).map((_, i) => {
                           if (i > duration + 2) return null;
                           const isMajor = i % 10 === 0;
                           const isMid = i % 5 === 0;

                           return (
                               <div key={i} className="absolute top-0 flex flex-col items-center justify-center" style={{ left: `${i * 20}px`, width: '2px' }}>
                                   <div className={`w-[1px] bg-white/70 mb-8 transition-all ${isMajor ? 'h-5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : isMid ? 'h-3 opacity-60' : 'h-2 opacity-30'}`}></div>
                                   {isMajor && (
                                       <span className={`absolute top-10 text-[10px] font-medium tracking-wider w-12 text-center transition-all duration-300 ${Math.abs(progress - i) < 5 ? 'text-white font-bold scale-110 drop-shadow-md' : 'text-blue-200/60'}`}>
                                           {formatTime(i)}
                                       </span>
                                   )}
                               </div>
                           );
                       })}
                  </div>
              </div>
          </div>

          {/* Controls */}
          <div className="w-full max-w-sm flex items-center justify-between px-8 mt-auto mb-10">
              <button className="text-white/60 hover:text-white transition p-2 active:scale-90">
                  <Repeat size={20} strokeWidth={2} />
              </button>
              
              <div className="flex items-center gap-6">
                  <button onClick={onPrev} className="text-white hover:text-white transition active:scale-90 drop-shadow-md">
                      <SkipBack size={24} fill="currentColor" className="text-white" />
                  </button>

                  <button 
                    onClick={onTogglePlay}
                    className="w-16 h-16 rounded-full bg-white text-blue-900 flex items-center justify-center shadow-[0_4px_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all"
                  >
                      {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                  </button>

                  <button onClick={onNext} className="text-white hover:text-white transition active:scale-90 drop-shadow-md">
                      <SkipForward size={24} fill="currentColor" className="text-white" />
                  </button>
              </div>

              <button className="text-white/60 hover:text-pink-400 transition p-2 active:scale-90">
                  <Heart size={20} strokeWidth={2} />
              </button>
          </div>
      </div>

      {/* --- Settings Overlay (New) --- */}
      {/* Elegant Frosted Glass Slide-up */}
      <div 
        className={`absolute inset-x-0 bottom-0 z-50 bg-slate-950/80 backdrop-blur-3xl border-t border-white/10 rounded-t-[2.5rem] pt-2 pb-10 px-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${showSettings ? 'translate-y-0' : 'translate-y-full'}`}
      >
          {/* Drag Handle */}
          <div className="w-full flex justify-center py-4 cursor-pointer" onClick={() => setShowSettings(false)}>
              <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
          </div>

          <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-xl font-bold text-white tracking-wide">Playback Settings</h3>
              <button onClick={() => setShowSettings(false)} className="bg-white/10 p-2 rounded-full active:scale-90 transition">
                  <X size={20} />
              </button>
          </div>

          <div className="flex flex-col gap-5">
              
              {/* Dark Mode Toggle */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-indigo-500 text-white' : 'bg-orange-400 text-white'}`}>
                          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                      </div>
                      <div className="flex flex-col">
                          <span className="font-semibold text-base">Dark Mode</span>
                          <span className="text-xs text-white/50">{isDarkMode ? 'On' : 'Off'}</span>
                      </div>
                  </div>
                  <button 
                      onClick={toggleDarkMode}
                      className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-blue-600' : 'bg-white/20'}`}
                  >
                      <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
              </div>

              {/* Equalizer Toggle */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-4 transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isEqualizerEnabled ? 'bg-pink-500 text-white' : 'bg-slate-600 text-white'}`}>
                              <Zap size={20} />
                          </div>
                          <div className="flex flex-col">
                              <span className="font-semibold text-base">Equalizer</span>
                              <span className="text-xs text-white/50">{isEqualizerEnabled ? eqPreset : 'Disabled'}</span>
                          </div>
                      </div>
                      <button 
                          onClick={toggleEqualizer}
                          className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${isEqualizerEnabled ? 'bg-blue-600' : 'bg-white/20'}`}
                      >
                          <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isEqualizerEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                  </div>

                  {/* Equalizer Presets (Visible when Enabled) */}
                  <div className={`grid grid-cols-3 gap-2 overflow-hidden transition-all duration-500 ease-out ${isEqualizerEnabled ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      {eqPresetsList.map(preset => (
                          <button
                             key={preset}
                             onClick={() => setEqPreset(preset)}
                             className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all active:scale-95 ${eqPreset === preset ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/50' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}
                          >
                             {preset}
                          </button>
                      ))}
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};