import { NextRequest, NextResponse } from 'next/server';
import { extractFromBase64 } from '@/lib/extractor';
import { extractLinks, type OutputRequest } from '@/lib/exporters';
import type { ExtractedCard } from '@/lib/types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function outputRequestToCards(request: OutputRequest, text?: string): readonly ExtractedCard[] {
  const cards: ExtractedCard[] = [];

  if (request.event !== undefined) {
    cards.push({ id: `evt-${generateId()}`, type: 'event', data: request.event });
  }

  if (request.contact !== undefined) {
    cards.push({ id: `con-${generateId()}`, type: 'contact', data: request.contact });
  }

  if (request.checklist !== undefined) {
    cards.push({ id: `chk-${generateId()}`, type: 'checklist', data: request.checklist });
  }

  if (request.email !== undefined) {
    cards.push({ id: `eml-${generateId()}`, type: 'email', data: request.email });
  }

  const linkSource = text ?? '';
  const urls = extractLinks(linkSource);
  if (urls.length > 0) {
    cards.push({ id: `lnk-${generateId()}`, type: 'link', data: { urls } });
  }

  return cards;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, mimeType, text } = body as {
      image?: string;
      mimeType?: string;
      text?: string;
    };

    if (!image && !text) {
      return NextResponse.json(
        { error: 'Provide either an image (base64) or text to extract from.' },
        { status: 400 }
      );
    }

    if (image) {
      const result = await extractFromBase64(
        image,
        mimeType ?? 'image/jpeg'
      );

      // Parse the raw output to build cards
      // The result contains generated file strings, but we need the structured data
      // Re-extract from the API response — for now return the file outputs as cards
      // TODO: refactor extractor to also return raw structured data
      return NextResponse.json({ cards: [], outputs: result });
    }

    // Text-only extraction: just extract links
    const urls = extractLinks(text!);
    const cards: ExtractedCard[] = urls.length > 0
      ? [{ id: `lnk-${generateId()}`, type: 'link', data: { urls } }]
      : [];

    return NextResponse.json({ cards });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Extraction failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
