import {
  generateICS,
  generateVCard,
  generateChecklist,
  generateEmailDraft,
  type CalendarEvent,
  type Contact,
  type Checklist,
  type EmailDraft,
} from './exporters';

function triggerDownload(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadICS(event: CalendarEvent): void {
  const ics = generateICS(event);
  const filename = `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
  triggerDownload(ics, filename, 'text/calendar');
}

export function downloadVCard(contact: Contact): void {
  const vcard = generateVCard(contact);
  const filename = `${contact.name.replace(/[^a-zA-Z0-9]/g, '_')}.vcf`;
  triggerDownload(vcard, filename, 'text/vcard');
}

export async function copyChecklistToClipboard(checklist: Checklist): Promise<void> {
  const markdown = generateChecklist(checklist);
  await navigator.clipboard.writeText(markdown);
}

export async function copyEmailToClipboard(email: EmailDraft): Promise<void> {
  const draft = generateEmailDraft(email);
  await navigator.clipboard.writeText(draft);
}
