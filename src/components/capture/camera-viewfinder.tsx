'use client';

import { useEffect } from 'react';
import { useCamera } from '@/lib/hooks/use-camera';

interface CameraViewfinderProps {
  readonly onCapture: (dataUrl: string) => void;
  readonly onUpload: () => void;
}

export function CameraViewfinder({ onCapture, onUpload }: CameraViewfinderProps) {
  const { videoRef, isActive, error, start, stop, capture } = useCamera();

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  const handleCapture = () => {
    const dataUrl = capture();
    if (dataUrl) {
      onCapture(dataUrl);
    }
  };

  return (
    <main className="relative h-screen w-full bg-on-surface flex flex-col overflow-hidden">
      {/* Camera Preview */}
      <div className="absolute inset-0 z-0">
        {isActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover opacity-80 mix-blend-screen brightness-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {error ? (
              <div className="text-center px-8">
                <span className="material-symbols-outlined text-4xl text-white/40 mb-4 block">
                  videocam_off
                </span>
                <p className="text-white/60 text-sm mb-4">{error}</p>
                <button
                  onClick={onUpload}
                  className="px-6 py-3 bg-white/10 backdrop-blur-xl text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  Upload Image Instead
                </button>
              </div>
            ) : (
              <div className="text-white/40 text-sm">Starting camera...</div>
            )}
          </div>
        )}
        {/* Tonal Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-on-surface/40 via-transparent to-on-surface/60 pointer-events-none" />
      </div>

      {/* Scanning Reticle */}
      <div className="relative z-10 flex-grow flex items-center justify-center pointer-events-none">
        <div className="w-72 h-96 scanning-reticle rounded-xl flex items-center justify-center border-dashed border-2 relative">
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-secondary-container rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-secondary-container rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-secondary-container rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-secondary-container rounded-br-xl" />

          {/* AI Insight Indicator */}
          <div className="bg-secondary-container/10 backdrop-blur-md border-l-4 border-secondary px-4 py-3 rounded-r-lg max-w-[200px]">
            <p className="text-[10px] uppercase tracking-widest font-bold text-secondary-container mb-1">
              AI Curating
            </p>
            <p className="text-xs font-medium text-white/90">
              Detecting content...
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="absolute top-24 right-6 flex flex-col gap-6 z-20">
        <button className="w-12 h-12 rounded-full bg-on-surface/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-on-surface/40 transition-all active:scale-95">
          <span className="material-symbols-outlined">flash_on</span>
        </button>
        <button className="w-12 h-12 rounded-full bg-on-surface/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-on-surface/40 transition-all active:scale-95">
          <span className="material-symbols-outlined">hdr_auto</span>
        </button>
        <div className="flex flex-col items-center gap-2 bg-on-surface/20 backdrop-blur-xl py-4 px-2 rounded-full">
          <button className="text-[10px] font-bold text-white/60 hover:text-white">2.0x</button>
          <div className="w-px h-8 bg-white/20" />
          <button className="text-[10px] font-bold text-secondary-container">1.0x</button>
          <div className="w-px h-8 bg-white/20" />
          <button className="text-[10px] font-bold text-white/60 hover:text-white">0.5x</button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-24 left-0 w-full z-20 flex flex-col items-center gap-8 px-6">
        {/* Mode Selector */}
        <div className="flex gap-8 items-center overflow-x-auto no-scrollbar pb-2">
          <span className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] whitespace-nowrap cursor-pointer hover:text-white transition-colors">
            Auto
          </span>
          <span className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] whitespace-nowrap cursor-pointer hover:text-white transition-colors">
            Document
          </span>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-white uppercase tracking-[0.2em] whitespace-nowrap">
              Whiteboard
            </span>
            <div className="w-1 h-1 bg-secondary-container rounded-full" />
          </div>
          <span className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] whitespace-nowrap cursor-pointer hover:text-white transition-colors">
            Notes
          </span>
        </div>

        {/* Shutter Group */}
        <div className="flex items-center justify-between w-full max-w-sm">
          {/* Gallery Preview */}
          <button
            onClick={onUpload}
            className="w-12 h-12 rounded-lg border-2 border-white/20 overflow-hidden cursor-pointer hover:scale-105 transition-transform active:scale-95 bg-on-surface/30"
          >
            <span className="material-symbols-outlined text-white/60 text-xl flex items-center justify-center w-full h-full">
              photo_library
            </span>
          </button>

          {/* Shutter Button */}
          <button
            onClick={handleCapture}
            className="group relative flex items-center justify-center"
            disabled={!isActive}
          >
            <div className="absolute w-24 h-24 rounded-full bg-secondary-container/20 shutter-glow group-hover:scale-110 transition-transform duration-500" />
            <div className="w-16 h-16 rounded-full border-[3px] border-white flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary-container to-secondary group-active:scale-90 transition-transform duration-200" />
            </div>
          </button>

          {/* Settings */}
          <button className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">tune</span>
          </button>
        </div>
      </div>
    </main>
  );
}
