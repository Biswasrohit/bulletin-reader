'use client';

import type { EmailDraft } from '@/lib/exporters';
import { EditableField } from './editable-field';

interface EmailCardProps {
  readonly data: EmailDraft;
  readonly onUpdate: (updated: EmailDraft) => void;
  readonly onCopy: () => void;
}

export function EmailCard({ data, onUpdate, onCopy }: EmailCardProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-subtle border border-outline-variant/10">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-headline font-black text-primary text-sm shadow-sm flex-shrink-0">
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            mail
          </span>
        </div>
        <div className="flex-1 space-y-3">
          <EditableField
            value={data.subject}
            label="Subject"
            onSave={(v) => onUpdate({ ...data, subject: v })}
            className="font-bold"
          />
          <EditableField
            value={data.to}
            label="To"
            onSave={(v) => onUpdate({ ...data, to: v })}
          />
          <EditableField
            value={data.body}
            label="Body"
            onSave={(v) => onUpdate({ ...data, body: v })}
            multiline
          />
        </div>
      </div>
      <button
        onClick={onCopy}
        className="mt-4 w-full py-2.5 bg-surface-container-low text-on-surface rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-all active:scale-95"
      >
        <span className="material-symbols-outlined text-lg">content_copy</span>
        Copy Email Draft
      </button>
    </div>
  );
}
