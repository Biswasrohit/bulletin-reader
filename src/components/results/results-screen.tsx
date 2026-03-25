'use client';

import type { ExtractedCard, LinkData } from '@/lib/types';
import type { CalendarEvent, Contact, Checklist, EmailDraft } from '@/lib/exporters';
import { EventCard } from './event-card';
import { ContactCard } from './contact-card';
import { ChecklistCard } from './checklist-card';
import { EmailCard } from './email-card';
import { LinkCard } from './link-card';

interface ResultsScreenProps {
  readonly cards: readonly ExtractedCard[];
  readonly imagePreview?: string;
  readonly onUpdateCard: (id: string, data: ExtractedCard['data']) => void;
  readonly onExportEvent: (data: CalendarEvent) => void;
  readonly onExportContact: (data: Contact) => void;
  readonly onCopyChecklist: (data: Checklist) => void;
  readonly onCopyEmail: (data: EmailDraft) => void;
  readonly onBack: () => void;
  readonly onScanAgain: () => void;
}

export function ResultsScreen({
  cards,
  imagePreview,
  onUpdateCard,
  onExportEvent,
  onExportContact,
  onCopyChecklist,
  onCopyEmail,
  onBack,
  onScanAgain,
}: ResultsScreenProps) {
  // Determine a title from the first checklist or event
  const firstChecklist = cards.find((c) => c.type === 'checklist');
  const firstEvent = cards.find((c) => c.type === 'event');
  const title = firstChecklist
    ? (firstChecklist.data as Checklist).title
    : firstEvent
      ? (firstEvent.data as CalendarEvent).title
      : 'Extracted Content';

  return (
    <div className="min-h-screen bg-surface pb-32">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface flex justify-between items-center px-6 py-4 w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-200 text-primary"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold tracking-tight text-lg text-on-surface">
            Glance
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onScanAgain}
            className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container-low transition-colors rounded-lg text-primary font-medium text-sm"
          >
            <span className="material-symbols-outlined text-lg">photo_camera</span>
            Scan Again
          </button>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
        {/* Intelligence Badge & Title */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full flex items-center gap-2 border border-secondary/10">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="font-label text-[10px] uppercase tracking-widest font-bold">
                Curated Intelligence
              </span>
            </div>
            <span className="text-outline text-xs font-label">
              Action: Visual Extraction
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 items-start">
            <div>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                {title}
              </h2>
              <p className="text-on-surface-variant leading-relaxed max-w-xl">
                Synthesized from your captured content. Review and edit the extracted data below before exporting.
              </p>
            </div>

            {/* Source Image Preview */}
            {imagePreview && (
              <div className="relative group">
                <div className="aspect-square rounded-xl overflow-hidden bg-surface-container shadow-sm rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <img
                    alt="Source"
                    src={imagePreview}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white material-symbols-outlined">zoom_in</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap gap-4 mb-12 items-center">
          <button className="bg-primary text-on-primary px-6 py-3 rounded-md font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">ios_share</span>
            Share Workflow
          </button>
          <button className="bg-surface-container-low text-on-surface px-6 py-3 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-surface-container-highest transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">content_copy</span>
            Copy to Clipboard
          </button>
          <button className="bg-surface-container-low text-on-surface px-6 py-3 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-surface-container-highest transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">download</span>
            Export All
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left column — checklists and contacts */}
          <div className="md:col-span-5 space-y-6">
            {cards
              .filter((c) => c.type === 'checklist' || c.type === 'contact')
              .map((card) => {
                if (card.type === 'checklist') {
                  return (
                    <ChecklistCard
                      key={card.id}
                      data={card.data as Checklist}
                      onUpdate={(d) => onUpdateCard(card.id, d)}
                      onCopy={() => onCopyChecklist(card.data as Checklist)}
                    />
                  );
                }
                return (
                  <ContactCard
                    key={card.id}
                    data={card.data as Contact}
                    onUpdate={(d) => onUpdateCard(card.id, d)}
                    onExport={() => onExportContact(card.data as Contact)}
                  />
                );
              })}
          </div>

          {/* Right column — events, emails, links */}
          <div className="md:col-span-7 space-y-6">
            {cards
              .filter((c) => c.type === 'event' || c.type === 'email' || c.type === 'link')
              .map((card) => {
                if (card.type === 'event') {
                  return (
                    <EventCard
                      key={card.id}
                      data={card.data as CalendarEvent}
                      onUpdate={(d) => onUpdateCard(card.id, d)}
                      onExport={() => onExportEvent(card.data as CalendarEvent)}
                    />
                  );
                }
                if (card.type === 'email') {
                  return (
                    <EmailCard
                      key={card.id}
                      data={card.data as EmailDraft}
                      onUpdate={(d) => onUpdateCard(card.id, d)}
                      onCopy={() => onCopyEmail(card.data as EmailDraft)}
                    />
                  );
                }
                return (
                  <LinkCard
                    key={card.id}
                    data={card.data as LinkData}
                  />
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}
