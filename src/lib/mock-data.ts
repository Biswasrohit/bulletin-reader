import type { ExtractionResponse } from './types';

export const MOCK_EXTRACTION_RESPONSE: ExtractionResponse = {
  ocrText: `Project Alpha Strategy:
1. Define core user personas and journey maps.
2. Establish a unified design language across all platforms.
3. Integrate advanced AI processing for real-time document analysis.
4. Scale infrastructure to support 10k concurrent sessions.

Contact: Sarah Chen, sarah@alphadesign.io, (415) 555-0142
Organization: Alpha Design Co.

Team Standup — March 28 2026, 10:00 AM–10:30 AM
Location: Conference Room B

Visit https://alphadesign.io/roadmap for the full plan.
See also: https://figma.com/file/abc123`,
  confidence: 98,
  cards: [
    {
      id: 'evt-001',
      type: 'event',
      data: {
        title: 'Team Standup',
        startDate: '2026-03-28T10:00:00Z',
        endDate: '2026-03-28T10:30:00Z',
        location: 'Conference Room B',
        description: 'Weekly team standup meeting',
      },
    },
    {
      id: 'con-001',
      type: 'contact',
      data: {
        name: 'Sarah Chen',
        email: 'sarah@alphadesign.io',
        phone: '(415) 555-0142',
        organization: 'Alpha Design Co.',
      },
    },
    {
      id: 'chk-001',
      type: 'checklist',
      data: {
        title: 'Project Alpha Strategy',
        tasks: [
          'Define core user personas and journey maps',
          'Establish a unified design language across all platforms',
          'Integrate advanced AI processing for real-time document analysis',
          'Scale infrastructure to support 10k concurrent sessions',
        ],
      },
    },
    {
      id: 'eml-001',
      type: 'email',
      data: {
        to: 'team@alphadesign.io',
        subject: 'Project Alpha Strategy — Action Items',
        body: 'Hi team,\n\nAttached are the key action items from our whiteboard session. Please review and confirm ownership of each task by EOD Friday.\n\nBest,\nSarah',
      },
    },
    {
      id: 'lnk-001',
      type: 'link',
      data: {
        urls: [
          'https://alphadesign.io/roadmap',
          'https://figma.com/file/abc123',
        ],
      },
    },
  ],
};
