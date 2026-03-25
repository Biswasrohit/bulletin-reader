'use client';

import { useRef, useCallback } from 'react';

interface ImageUploadProps {
  readonly onImageSelected: (dataUrl: string) => void;
  readonly onClose: () => void;
}

export function ImageUpload({ onImageSelected, onClose }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        onImageSelected(result);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        onImageSelected(result);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-on-surface/60 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-surface-container-lowest rounded-xl shadow-ambient max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline font-bold text-lg text-on-surface">Upload Image</h2>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface transition-colors p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-outline-variant/30 rounded-xl p-12 flex flex-col items-center gap-4 cursor-pointer hover:border-primary/30 hover:bg-surface-container-low transition-all"
        >
          <span className="material-symbols-outlined text-4xl text-outline">
            cloud_upload
          </span>
          <p className="text-sm text-on-surface-variant text-center">
            Drop an image here or tap to browse
          </p>
          <p className="text-xs text-outline">JPG, PNG, WebP</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
