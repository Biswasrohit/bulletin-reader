# CodeCollab

AI-powered content extraction app that captures images, documents, and text — then intelligently extracts structured data you can edit and export.

## Features

- **Smart Capture** — Use your camera, upload an image, or paste text
- **AI Extraction** — Automatically identifies events, contacts, checklists, emails, and links
- **Editable Cards** — Review and edit extracted data inline before exporting
- **Export Anywhere** — Download as `.ics` (calendar), `.vcf` (contacts), or copy as Markdown/plain text
- **Capture Library** — Browse saved captures in grid or list view with search and filters

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.9 (strict mode) |
| UI | React 19 + Tailwind CSS 4 |
| AI | OpenRouter API (Gemini) via OpenAI SDK |
| Testing | Jest + ts-jest |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repo-url>
cd CodeCollab
npm install
```

### Environment Setup

Copy the example env file and configure:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_MOCK_API` | Use mock data instead of real API | `true` |
| `OPENROUTER_API_KEY` | API key from [OpenRouter](https://openrouter.ai) | — |

Set `NEXT_PUBLIC_MOCK_API=true` to run the app without an API key (uses sample data).

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm test` | Run tests |
| `npm run scan` | CLI extraction demo |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main capture → process → results flow
│   ├── library/page.tsx      # Saved captures library
│   └── api/extract/route.ts  # POST /api/extract endpoint
├── components/
│   ├── capture/              # Camera, upload, text input
│   ├── processing/           # Loading & preview UI
│   ├── results/              # Editable card components
│   ├── library/              # Grid and list views
│   └── ui/                   # Header, bottom nav
└── lib/
    ├── types.ts              # Shared TypeScript interfaces
    ├── extractor.ts          # AI extraction logic
    ├── exporters.ts          # ICS, VCard, Markdown generators
    ├── downloads.ts          # Download & clipboard utilities
    └── hooks/                # useExtraction, useCamera
```

## Testing

```bash
npm test
```

Tests live in `src/lib/__tests__/`. Uses Jest with ts-jest for TypeScript support.

## License

ISC
