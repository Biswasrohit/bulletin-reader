import {
  generateICS,
  generateVCard,
  generateMarkdown,
  generateChecklist,
  generateEmailDraft,
  generateOutputs,
  extractLinks,
  CalendarEvent,
  Contact,
  Notes,
  Checklist,
  EmailDraft,
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

describe('generateChecklist', () => {
  it('should format heading and checkbox tasks correctly', () => {
    const checklist: Checklist = {
      title: 'Tech Summit Tasks',
      tasks: ['Register online', 'Book hotel by Apr 1', 'Submit speaker form'],
    };

    const result = generateChecklist(checklist);

    expect(result).toBe(
      '# Tech Summit Tasks\n\n' +
        '- [ ] Register online\n' +
        '- [ ] Book hotel by Apr 1\n' +
        '- [ ] Submit speaker form\n'
    );
  });

  it('should handle a single task', () => {
    const checklist: Checklist = {
      title: 'One Thing',
      tasks: ['Send the email'],
    };

    const result = generateChecklist(checklist);

    expect(result).toBe('# One Thing\n\n- [ ] Send the email\n');
  });

  it('should handle empty tasks array', () => {
    const checklist: Checklist = {
      title: 'Empty List',
      tasks: [],
    };

    const result = generateChecklist(checklist);

    expect(result).toBe('# Empty List\n\n\n');
  });
});

describe('generateEmailDraft', () => {
  it('should produce correct To, Subject, and body', () => {
    const draft: EmailDraft = {
      to: 'sarah@techsummit.io',
      subject: 'RSVP – Tech Summit 2026',
      body: 'Hi Sarah,\n\nI saw your flyer and would like to attend.',
    };

    const result = generateEmailDraft(draft);

    expect(result).toContain('To: sarah@techsummit.io');
    expect(result).toContain('Subject: RSVP – Tech Summit 2026');
    expect(result).toContain('Hi Sarah,');
  });

  it('should separate headers from body with a blank line', () => {
    const draft: EmailDraft = {
      to: 'a@b.com',
      subject: 'Hello',
      body: 'Body text here.',
    };

    const result = generateEmailDraft(draft);
    const lines = result.split('\n');

    // line 0: To:, line 1: Subject:, line 2: blank, line 3+: body
    expect(lines[0]).toBe('To: a@b.com');
    expect(lines[1]).toBe('Subject: Hello');
    expect(lines[2]).toBe('');
    expect(lines[3]).toBe('Body text here.');
  });
});

describe('generateOutputs', () => {
  it('should return only ics when only event is provided', () => {
    const result = generateOutputs({
      event: { title: 'Team Lunch', startDate: '2026-05-01T12:00:00Z' },
    });

    expect(result.ics).toBeDefined();
    expect(result.ics).toContain('SUMMARY:Team Lunch');
    expect(result.vcard).toBeUndefined();
    expect(result.checklist).toBeUndefined();
    expect(result.emailDraft).toBeUndefined();
  });

  it('should return all four outputs when all inputs are provided', () => {
    const result = generateOutputs({
      event:     { title: 'Tech Summit 2026', startDate: '2026-04-22T09:00:00Z', endDate: '2026-04-22T17:00:00Z', location: 'Hall B' },
      contact:   { name: 'Sarah Lin', email: 'sarah@techsummit.io', phone: '555-0192' },
      checklist: { title: 'Summit Tasks', tasks: ['Register online', 'Book hotel'] },
      email:     { to: 'sarah@techsummit.io', subject: 'RSVP', body: 'Counting me in!' },
    });

    expect(result.ics).toBeDefined();
    expect(result.vcard).toBeDefined();
    expect(result.checklist).toBeDefined();
    expect(result.emailDraft).toBeDefined();
  });

  it('should return empty object when no inputs are provided', () => {
    const result = generateOutputs({});

    expect(result.ics).toBeUndefined();
    expect(result.vcard).toBeUndefined();
    expect(result.checklist).toBeUndefined();
    expect(result.emailDraft).toBeUndefined();
  });

  it('should return correct content for each output type', () => {
    const result = generateOutputs({
      contact:   { name: 'Sarah Lin', email: 'sarah@techsummit.io' },
      checklist: { title: 'Tasks', tasks: ['Book hotel'] },
    });

    expect(result.vcard).toContain('FN:Sarah Lin');
    expect(result.checklist).toContain('- [ ] Book hotel');
    expect(result.ics).toBeUndefined();
    expect(result.emailDraft).toBeUndefined();
  });
});
