'use client';

import type { CalendarEvent } from '@/lib/exporters';
import { EditableField } from './editable-field';

interface EventCardProps {
  readonly data: CalendarEvent;
  readonly onUpdate: (updated: CalendarEvent) => void;
  readonly onExport: () => void;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export function EventCard({ data, onUpdate, onExport }: EventCardProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-subtle border border-outline-variant/10">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-headline font-black text-primary text-sm shadow-sm flex-shrink-0">
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            calendar_today
          </span>
        </div>
        <div className="flex-1 space-y-3">
          <EditableField
            value={data.title}
            onSave={(v) => onUpdate({ ...data, title: v })}
            className="font-bold"
          />
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>{formatDate(data.startDate)}</span>
            {data.endDate && (
              <span>— {formatDate(data.endDate)}</span>
            )}
          </div>
          {data.location && (
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <EditableField
                value={data.location}
                onSave={(v) => onUpdate({ ...data, location: v })}
              />
            </div>
          )}
          {data.description && (
            <EditableField
              value={data.description}
              label="Description"
              onSave={(v) => onUpdate({ ...data, description: v })}
              multiline
            />
          )}
        </div>
      </div>
      <button
        onClick={onExport}
        className="mt-4 w-full py-2.5 bg-primary text-on-primary rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
      >
        <span className="material-symbols-outlined text-lg">calendar_add_on</span>
        Add to Calendar
      </button>
    </div>
  );
}
