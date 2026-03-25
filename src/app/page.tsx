'use client';

import { useExtraction } from '@/lib/hooks/use-extraction';
import { downloadICS, downloadVCard, copyChecklistToClipboard, copyEmailToClipboard } from '@/lib/downloads';
import { CaptureScreen } from '@/components/capture/capture-screen';
import { ProcessingHub } from '@/components/processing/processing-hub';
import { ResultsScreen } from '@/components/results/results-screen';
import { BottomNav } from '@/components/ui/bottom-nav';
import type { CalendarEvent, Contact, Checklist, EmailDraft } from '@/lib/exporters';

export default function Home() {
  const {
    screen,
    imagePreview,
    isProcessing,
    result,
    submitImage,
    submitText,
    showResults,
    updateCard,
    reset,
  } = useExtraction();

  return (
    <>
      {screen === 'capture' && (
        <CaptureScreen
          onImageCaptured={submitImage}
          onTextSubmitted={submitText}
        />
      )}

      {screen === 'processing' && (
        <ProcessingHub
          imagePreview={imagePreview ?? undefined}
          isProcessing={isProcessing}
          result={result ?? undefined}
          onBack={reset}
          onApply={showResults}
        />
      )}

      {screen === 'results' && result && (
        <ResultsScreen
          cards={result.cards}
          imagePreview={imagePreview ?? undefined}
          onUpdateCard={updateCard}
          onExportEvent={(data: CalendarEvent) => downloadICS(data)}
          onExportContact={(data: Contact) => downloadVCard(data)}
          onCopyChecklist={(data: Checklist) => copyChecklistToClipboard(data)}
          onCopyEmail={(data: EmailDraft) => copyEmailToClipboard(data)}
          onBack={() => {
            // Go back to processing hub to review
          }}
          onScanAgain={reset}
        />
      )}

      <BottomNav />
    </>
  );
}
