'use client';

import type { ExtractionResponse } from '@/lib/types';
import { ActionCards } from './action-cards';

interface ProcessingHubProps {
  readonly imagePreview?: string;
  readonly isProcessing: boolean;
  readonly result?: ExtractionResponse;
  readonly onBack: () => void;
  readonly onApply: () => void;
}

export function ProcessingHub({
  imagePreview,
  isProcessing,
  result,
  onBack,
  onApply,
}: ProcessingHubProps) {
  const confidence = result?.confidence ?? 0;
  const ocrText = result?.ocrText ?? '';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-surface flex justify-between items-center px-6 py-4 w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold tracking-tight text-lg text-primary">
            AI Processing Hub
          </h1>
        </div>
        <button
          onClick={onApply}
          className="font-headline font-black text-xl tracking-[-0.02em] text-on-surface hover:bg-surface-container-low px-4 py-1 rounded transition-colors active:scale-95 duration-200"
        >
          Done
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        {/* Hero Image */}
        {imagePreview && (
          <section className="px-6 pt-8 pb-12">
            <div className="relative group">
              <div className="aspect-[4/3] w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-surface-container shadow-ambient">
                <img
                  alt="Captured content"
                  src={imagePreview}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <button className="absolute bottom-4 right-8 bg-surface-container-lowest/80 backdrop-blur-md p-3 rounded-full shadow-lg text-primary hover:bg-surface-container-lowest transition-all">
                <span className="material-symbols-outlined">fullscreen</span>
              </button>
            </div>
          </section>
        )}

        {/* Processing Animation */}
        {isProcessing && (
          <section className="px-6 py-12 flex flex-col items-center gap-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-surface-container-high" />
              <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
            </div>
            <div className="text-center">
              <p className="font-headline font-bold text-on-surface mb-1">Analyzing Content</p>
              <p className="text-sm text-on-surface-variant">Extracting structured data with AI...</p>
            </div>
          </section>
        )}

        {/* OCR Preview */}
        {!isProcessing && result && (
          <>
            <section className="px-6 space-y-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                  <h2 className="font-headline font-bold text-on-surface">OCR Preview</h2>
                </div>
                <span className="font-label text-sm text-outline uppercase tracking-widest">
                  Confidence {confidence}%
                </span>
              </div>

              <div className="p-6 rounded-xl bg-surface-container-lowest border-l-4 border-secondary shadow-sm">
                <textarea
                  defaultValue={ocrText}
                  spellCheck={false}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-body leading-relaxed min-h-[120px] resize-none focus:outline-none"
                />
              </div>
            </section>

            {/* Action Cards */}
            <ActionCards cards={result.cards} />

            {/* Apply Intelligence Button */}
            <section className="px-6 mt-12 pb-12 max-w-4xl mx-auto">
              <button
                onClick={onApply}
                className="w-full py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all relative overflow-hidden group"
              >
                <span className="material-symbols-outlined">smart_toy</span>
                Apply Intelligence
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <p className="text-center text-outline text-xs mt-4 font-label tracking-wide uppercase">
                AI will process the selection using vision analysis
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
