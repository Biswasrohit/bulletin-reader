'use client';

import { useReducer, useCallback } from 'react';
import type { ExtractionResponse, ExtractedCard } from '@/lib/types';
import { MOCK_EXTRACTION_RESPONSE } from '@/lib/mock-data';

type AppScreen = 'capture' | 'processing' | 'results';

interface ExtractionState {
  readonly screen: AppScreen;
  readonly imagePreview: string | null;
  readonly isProcessing: boolean;
  readonly result: ExtractionResponse | null;
  readonly error: string | null;
}

type ExtractionAction =
  | { readonly type: 'START_PROCESSING'; readonly imagePreview: string | null }
  | { readonly type: 'PROCESSING_COMPLETE'; readonly result: ExtractionResponse }
  | { readonly type: 'PROCESSING_ERROR'; readonly error: string }
  | { readonly type: 'SHOW_RESULTS' }
  | { readonly type: 'UPDATE_CARD'; readonly id: string; readonly data: ExtractedCard['data'] }
  | { readonly type: 'RESET' };

const INITIAL_STATE: ExtractionState = {
  screen: 'capture',
  imagePreview: null,
  isProcessing: false,
  result: null,
  error: null,
};

function reducer(state: ExtractionState, action: ExtractionAction): ExtractionState {
  switch (action.type) {
    case 'START_PROCESSING':
      return {
        ...state,
        screen: 'processing',
        imagePreview: action.imagePreview,
        isProcessing: true,
        result: null,
        error: null,
      };
    case 'PROCESSING_COMPLETE':
      return {
        ...state,
        isProcessing: false,
        result: action.result,
      };
    case 'PROCESSING_ERROR':
      return {
        ...state,
        isProcessing: false,
        error: action.error,
      };
    case 'SHOW_RESULTS':
      return {
        ...state,
        screen: 'results',
      };
    case 'UPDATE_CARD': {
      if (!state.result) return state;
      const updatedCards = state.result.cards.map((card) =>
        card.id === action.id ? { ...card, data: action.data } : card
      );
      return {
        ...state,
        result: { ...state.result, cards: updatedCards },
      };
    }
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

const isMockMode = process.env.NEXT_PUBLIC_MOCK_API === 'true';

export function useExtraction() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const submitImage = useCallback(async (dataUrl: string) => {
    dispatch({ type: 'START_PROCESSING', imagePreview: dataUrl });

    if (isMockMode) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      dispatch({
        type: 'PROCESSING_COMPLETE',
        result: { ...MOCK_EXTRACTION_RESPONSE, imagePreview: dataUrl },
      });
      return;
    }

    try {
      // Strip the data URL prefix to get raw base64
      const [header, base64] = dataUrl.split(',');
      const mimeType = header.match(/data:(.*?);/)?.[1] ?? 'image/jpeg';

      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, mimeType }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error ?? 'Extraction failed');
      }

      const data = await response.json();
      dispatch({
        type: 'PROCESSING_COMPLETE',
        result: {
          cards: data.cards,
          imagePreview: dataUrl,
          ocrText: data.ocrText,
          confidence: data.confidence,
        },
      });
    } catch (err) {
      dispatch({
        type: 'PROCESSING_ERROR',
        error: err instanceof Error ? err.message : 'Extraction failed',
      });
    }
  }, []);

  const submitText = useCallback(async (text: string) => {
    dispatch({ type: 'START_PROCESSING', imagePreview: null });

    if (isMockMode) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      dispatch({
        type: 'PROCESSING_COMPLETE',
        result: MOCK_EXTRACTION_RESPONSE,
      });
      return;
    }

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error ?? 'Extraction failed');
      }

      const data = await response.json();
      dispatch({
        type: 'PROCESSING_COMPLETE',
        result: {
          cards: data.cards,
          ocrText: text,
          confidence: 100,
        },
      });
    } catch (err) {
      dispatch({
        type: 'PROCESSING_ERROR',
        error: err instanceof Error ? err.message : 'Extraction failed',
      });
    }
  }, []);

  const showResults = useCallback(() => {
    dispatch({ type: 'SHOW_RESULTS' });
  }, []);

  const updateCard = useCallback((id: string, data: ExtractedCard['data']) => {
    dispatch({ type: 'UPDATE_CARD', id, data });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    screen: state.screen,
    imagePreview: state.imagePreview,
    isProcessing: state.isProcessing,
    result: state.result,
    error: state.error,
    submitImage,
    submitText,
    showResults,
    updateCard,
    reset,
  };
}
