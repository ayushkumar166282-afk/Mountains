import React from 'react';
import { X } from 'lucide-react';

interface EqualizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Equalizer: React.FC<EqualizerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const frequencies = ['60Hz', '230Hz', '910Hz', '4kHz', '14kHz'];

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-xs bg-[#1a1b3a] p-6 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-xl font-bold tracking-wider">Equalizer</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex justify-between h-48 items-end gap-4">
          {frequencies.map((freq, idx) => (
            <div key={freq} className="flex flex-col items-center gap-2 h-full">
              <div className="relative w-2 h-full bg-white/10 rounded-full">
                <input
                  type="range"
                  min="-12"
                  max="12"
                  defaultValue="0"
                  className="absolute bottom-0 w-32 -left-14 origin-left -rotate-90 opacity-0 cursor-pointer z-10 h-8"
                />
                {/* Visual Fake Slider Thumb */}
                <div 
                  className="absolute w-4 h-4 bg-orange-400 rounded-full -left-1 shadow-lg shadow-orange-500/50"
                  style={{ bottom: `${40 + (idx % 2 === 0 ? 20 : -10)}%` }}
                />
              </div>
              <span className="text-xs text-white/50">{freq}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
           <div className="flex justify-between text-white/70 text-sm mb-2">
             <span>Bass Boost</span>
             <span>ON</span>
           </div>
           <div className="h-1.5 bg-white/10 rounded-full w-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4"></div>
           </div>
        </div>
      </div>
    </div>
  );
};
