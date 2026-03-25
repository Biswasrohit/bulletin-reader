import type { CalendarEvent, Contact, Checklist, EmailDraft } from './exporters';

export type CardType = 'event' | 'contact' | 'checklist' | 'email' | 'link';

export interface LinkData {
  readonly urls: readonly string[];
}

export interface ExtractedCard {
  readonly id: string;
  readonly type: CardType;
  readonly data: CalendarEvent | Contact | Checklist | EmailDraft | LinkData;
}

export interface ExtractionResponse {
  readonly cards: readonly ExtractedCard[];
  readonly imagePreview?: string;
  readonly ocrText?: string;
  readonly confidence?: number;
}
