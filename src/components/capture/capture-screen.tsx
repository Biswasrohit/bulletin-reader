'use client';

import { useState, useCallback } from 'react';
import { CameraViewfinder } from './camera-viewfinder';
import { ImageUpload } from './image-upload';
import { TextInput } from './text-input';

type OverlayMode = 'none' | 'upload' | 'text';

interface CaptureScreenProps {
  readonly onImageCaptured: (dataUrl: string) => void;
  readonly onTextSubmitted: (text: string) => void;
}

export function CaptureScreen({ onImageCaptured, onTextSubmitted }: CaptureScreenProps) {
  const [overlay, setOverlay] = useState<OverlayMode>('none');

  const handleCapture = useCallback((dataUrl: string) => {
    onImageCaptured(dataUrl);
  }, [onImageCaptured]);

  const handleUploadImage = useCallback((dataUrl: string) => {
    setOverlay('none');
    onImageCaptured(dataUrl);
  }, [onImageCaptured]);

  const handleTextSubmit = useCallback((text: string) => {
    setOverlay('none');
    onTextSubmitted(text);
  }, [onTextSubmitted]);

  return (
    <>
      <CameraViewfinder
        onCapture={handleCapture}
        onUpload={() => setOverlay('upload')}
      />

      {/* Smart Suggestion Modal */}
      <div className="fixed top-24 left-6 z-30 max-w-xs">
        <div className="bg-surface-container-lowest/80 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-outline-variant/20">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-secondary-container">auto_awesome</span>
            <span className="text-xs font-bold tracking-tight font-headline">Smart Suggestion</span>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Point your camera at a whiteboard, flyer, or document. Or{' '}
            <button
              onClick={() => setOverlay('text')}
              className="text-secondary font-bold hover:underline"
            >
              paste text
            </button>{' '}
            to extract content.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setOverlay('upload')}
              className="px-3 py-1.5 bg-primary text-on-primary text-[10px] font-bold rounded uppercase tracking-wider hover:bg-primary-container transition-colors"
            >
              Upload
            </button>
            <button
              onClick={() => setOverlay('text')}
              className="px-3 py-1.5 text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wider hover:bg-surface-container-high transition-colors"
            >
              Paste Text
            </button>
          </div>
        </div>
      </div>

      {overlay === 'upload' && (
        <ImageUpload
          onImageSelected={handleUploadImage}
          onClose={() => setOverlay('none')}
        />
      )}

      {overlay === 'text' && (
        <TextInput
          onSubmit={handleTextSubmit}
          onClose={() => setOverlay('none')}
        />
      )}
    </>
  );
}
