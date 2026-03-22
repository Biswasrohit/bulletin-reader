// SnapAction Output Integration Module
// Converts structured data extracted from photos into downloadable file formats.
// Zero external runtime dependencies — pure string generation only.

export interface CalendarEvent {
  readonly title: string;
  readonly description?: string;
  readonly location?: string;
  readonly startDate: string; // ISO 8601 string
  readonly endDate?: string;  // ISO 8601 string, defaults to startDate + 1 hour
}

export interface Contact {
  readonly name: string;
  readonly email?: string;
  readonly phone?: string;
  readonly organization?: string;
  readonly url?: string;
}

export interface Notes {
  readonly title: string;
  readonly items: readonly string[];
}

function generateUUID(): string {
  const hex = '0123456789abcdef';
  const sections = [8, 4, 4, 4, 12];
  return sections
    .map((len) =>
      Array.from({ length: len }, () => hex[Math.floor(Math.random() * 16)]).join('')
    )
    .join('-');
}

function formatICSDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export function generateICS(event: CalendarEvent): string {
  const uid = generateUUID();
  const dtstamp = formatICSDate(new Date().toISOString());
  const dtstart = formatICSDate(event.startDate);

  const startMs = new Date(event.startDate).getTime();
  const endMs = event.endDate
    ? new Date(event.endDate).getTime()
    : startMs + 60 * 60 * 1000; // default +1 hour
  const dtend = formatICSDate(new Date(endMs).toISOString());

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SnapAction//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escapeICSText(event.title)}`,
  ];

  if (event.description !== undefined) {
    lines.push(`DESCRIPTION:${escapeICSText(event.description)}`);
  }

  if (event.location !== undefined) {
    lines.push(`LOCATION:${escapeICSText(event.location)}`);
  }

  lines.push('END:VEVENT', 'END:VCALENDAR');

  return lines.join('\r\n');
}

export function generateVCard(contact: Contact): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contact.name}`,
  ];

  if (contact.email !== undefined) {
    lines.push(`EMAIL:${contact.email}`);
  }

  if (contact.phone !== undefined) {
    lines.push(`TEL:${contact.phone}`);
  }

  if (contact.organization !== undefined) {
    lines.push(`ORG:${contact.organization}`);
  }

  if (contact.url !== undefined) {
    lines.push(`URL:${contact.url}`);
  }

  lines.push('END:VCARD');

  return lines.join('\r\n');
}

export function generateMarkdown(notes: Notes): string {
  const heading = `# ${notes.title}`;
  const bullets = notes.items.map((item) => `- ${item}`).join('\n');
  return `${heading}\n\n${bullets}\n`;
}

export function extractLinks(text: string): string[] {
  const urlPattern = /https?:\/\/[^\s<>"')\]]+|www\.[^\s<>"')\]]+\.[^\s<>"')\]]+/g;
  const matches = text.match(urlPattern);
  if (matches === null) {
    return [];
  }
  // Clean trailing punctuation that's not part of URLs
  return matches.map((url) => url.replace(/[.,;:!?)]+$/, ''));
}
