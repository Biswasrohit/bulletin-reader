'use client';

import { useState, useCallback } from 'react';

interface TextInputProps {
  readonly onSubmit: (text: string) => void;
  readonly onClose: () => void;
}

export function TextInput({ onSubmit, onClose }: TextInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    onSubmit(trimmed);
  }, [text, onSubmit]);

  return (
    <div className="fixed inset-0 z-40 bg-on-surface/60 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-surface-container-lowest rounded-xl shadow-ambient max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline font-bold text-lg text-on-surface">Paste Text</h2>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface transition-colors p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text content to extract from..."
          className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface font-body text-sm leading-relaxed min-h-[160px] resize-none focus:outline-none focus:ring-2 focus:ring-secondary/30"
          spellCheck={false}
        />

        <button
          onClick={handleSubmit}
          disabled={text.trim().length === 0}
          className="w-full mt-4 py-3 rounded-lg bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-lg">smart_toy</span>
          Extract Content
        </button>
      </div>
    </div>
  );
}
