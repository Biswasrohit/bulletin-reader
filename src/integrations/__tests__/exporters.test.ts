import {
  generateICS,
  generateVCard,
  generateMarkdown,
  extractLinks,
  CalendarEvent,
  Contact,
  Notes,
} from '../exporters';

describe('generateICS', () => {
  it('should generate valid ICS with all fields populated', () => {
    const event: CalendarEvent = {
      title: 'Team Standup',
      description: 'Daily sync meeting',
      location: 'Conference Room B',
      startDate: '2026-04-15T09:00:00Z',
      endDate: '2026-04-15T09:30:00Z',
    };

    const ics = generateICS(event);

    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('END:VCALENDAR');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('END:VEVENT');
    expect(ics).toContain('VERSION:2.0');
    expect(ics).toContain('SUMMARY:Team Standup');
    expect(ics).toContain('DESCRIPTION:Daily sync meeting');
    expect(ics).toContain('LOCATION:Conference Room B');
    expect(ics).toContain('DTSTART:20260415T090000Z');
    expect(ics).toContain('DTEND:20260415T093000Z');
    expect(ics).toMatch(/UID:[0-9a-f-]+/);
    expect(ics).toMatch(/DTSTAMP:\d{8}T\d{6}Z/);
  });

  it('should default endDate to +1 hour when not provided', () => {
    const event: CalendarEvent = {
      title: 'Quick Chat',
      startDate: '2026-06-01T14:00:00Z',
    };

    const ics = generateICS(event);

    expect(ics).toContain('DTSTART:20260601T140000Z');
    expect(ics).toContain('DTEND:20260601T150000Z');
    expect(ics).not.toContain('DESCRIPTION:');
    expect(ics).not.toContain('LOCATION:');
  });

  it('should have correct structure: VCALENDAR wraps VEVENT', () => {
    const event: CalendarEvent = {
      title: 'Test',
      startDate: '2026-01-01T00:00:00Z',
    };

    const ics = generateICS(event);
    const lines = ics.split('\r\n');

    // VCALENDAR must be the outer wrapper
    expect(lines[0]).toBe('BEGIN:VCALENDAR');
    expect(lines[lines.length - 1]).toBe('END:VCALENDAR');

    // VEVENT must be inside VCALENDAR
    const vcalStart = lines.indexOf('BEGIN:VCALENDAR');
    const vcalEnd = lines.indexOf('END:VCALENDAR');
    const veventStart = lines.indexOf('BEGIN:VEVENT');
    const veventEnd = lines.indexOf('END:VEVENT');

    expect(veventStart).toBeGreaterThan(vcalStart);
    expect(veventEnd).toBeLessThan(vcalEnd);

    // All dates must be in YYYYMMDDTHHMMSSZ format
    const dateLines = lines.filter(
      (l) => l.startsWith('DTSTART:') || l.startsWith('DTEND:') || l.startsWith('DTSTAMP:')
    );
    for (const line of dateLines) {
      const value = line.split(':')[1];
      expect(value).toMatch(/^\d{8}T\d{6}Z$/);
    }
  });

  it('should escape special characters in text fields', () => {
    const event: CalendarEvent = {
      title: 'Meeting; Planning, Review',
      description: 'Agenda:\nItem 1\nItem 2',
      location: 'Room 5, Floor 3; Building A',
      startDate: '2026-03-10T10:00:00Z',
    };

    const ics = generateICS(event);

    expect(ics).toContain('SUMMARY:Meeting\\; Planning\\, Review');
    expect(ics).toContain('DESCRIPTION:Agenda:\\nItem 1\\nItem 2');
    expect(ics).toContain('LOCATION:Room 5\\, Floor 3\\; Building A');
  });
});

describe('generateVCard', () => {
  it('should generate valid vCard with full contact info', () => {
    const contact: Contact = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1-555-123-4567',
      organization: 'Acme Corp',
      url: 'https://janesmith.dev',
    };

    const vcard = generateVCard(contact);

    expect(vcard).toContain('BEGIN:VCARD');
    expect(vcard).toContain('END:VCARD');
    expect(vcard).toContain('VERSION:3.0');
    expect(vcard).toContain('FN:Jane Smith');
    expect(vcard).toContain('EMAIL:jane@example.com');
    expect(vcard).toContain('TEL:+1-555-123-4567');
    expect(vcard).toContain('ORG:Acme Corp');
    expect(vcard).toContain('URL:https://janesmith.dev');
  });

  it('should generate vCard with only name and one optional field', () => {
    const contact: Contact = {
      name: 'Bob Lee',
      email: 'bob@test.org',
    };

    const vcard = generateVCard(contact);

    expect(vcard).toContain('BEGIN:VCARD');
    expect(vcard).toContain('VERSION:3.0');
    expect(vcard).toContain('FN:Bob Lee');
    expect(vcard).toContain('EMAIL:bob@test.org');
    expect(vcard).not.toContain('TEL:');
    expect(vcard).not.toContain('ORG:');
    expect(vcard).not.toContain('URL:');
    expect(vcard).toContain('END:VCARD');
  });

  it('should handle unicode characters in names', () => {
    const contact: Contact = {
      name: 'José García-López',
      phone: '(555) 987-6543',
    };

    const vcard = generateVCard(contact);

    expect(vcard).toContain('FN:José García-López');
    expect(vcard).toContain('TEL:(555) 987-6543');
  });

  it('should handle various phone number formats', () => {
    const formats = ['+44 20 7946 0958', '555.123.4567', '(800) 555-0199', '+81-3-1234-5678'];

    for (const phone of formats) {
      const vcard = generateVCard({ name: 'Test User', phone });
      expect(vcard).toContain(`TEL:${phone}`);
    }
  });
});

describe('generateMarkdown', () => {
  it('should format heading and bullet points correctly', () => {
    const notes: Notes = {
      title: 'Sprint Retro Notes',
      items: [
        'Improve CI pipeline speed',
        'Better test coverage on auth module',
        'Schedule knowledge sharing sessions',
      ],
    };

    const md = generateMarkdown(notes);

    expect(md).toBe(
      '# Sprint Retro Notes\n\n' +
        '- Improve CI pipeline speed\n' +
        '- Better test coverage on auth module\n' +
        '- Schedule knowledge sharing sessions\n'
    );
  });

  it('should handle single item', () => {
    const notes: Notes = {
      title: 'Quick Note',
      items: ['Remember to call back'],
    };

    const md = generateMarkdown(notes);

    expect(md).toBe('# Quick Note\n\n- Remember to call back\n');
  });

  it('should handle empty items array', () => {
    const notes: Notes = {
      title: 'Empty Board',
      items: [],
    };

    const md = generateMarkdown(notes);

    expect(md).toBe('# Empty Board\n\n\n');
  });
});

describe('extractLinks', () => {
  it('should extract multiple URLs from messy paragraph text', () => {
    const text = `
      Check out https://example.com/docs for info.
      Also see http://old-site.org/page?q=1&r=2 and
      visit www.cool-project.io/getting-started for the tutorial.
      Email me at user@test.com (not a link).
    `;

    const links = extractLinks(text);

    expect(links).toContain('https://example.com/docs');
    expect(links).toContain('http://old-site.org/page?q=1&r=2');
    expect(links).toContain('www.cool-project.io/getting-started');
    expect(links).toHaveLength(3);
  });

  it('should return empty array when no links exist', () => {
    const text = 'Just a plain sentence with no links at all. user@email.com is not a URL.';

    const links = extractLinks(text);

    expect(links).toEqual([]);
  });

  it('should strip trailing punctuation from URLs', () => {
    const text = 'Go to https://example.com. Or https://other.com, or https://third.com!';

    const links = extractLinks(text);

    expect(links).toContain('https://example.com');
    expect(links).toContain('https://other.com');
    expect(links).toContain('https://third.com');
  });

  it('should handle URLs with paths and query strings', () => {
    const text = 'API docs at https://api.example.com/v2/users?page=1&limit=10#section';

    const links = extractLinks(text);

    expect(links).toEqual(['https://api.example.com/v2/users?page=1&limit=10#section']);
  });
});
