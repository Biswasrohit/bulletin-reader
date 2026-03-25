'use client';

import type { Contact } from '@/lib/exporters';
import { EditableField } from './editable-field';

interface ContactCardProps {
  readonly data: Contact;
  readonly onUpdate: (updated: Contact) => void;
  readonly onExport: () => void;
}

export function ContactCard({ data, onUpdate, onExport }: ContactCardProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-subtle border border-outline-variant/10">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-headline font-black text-primary text-sm shadow-sm flex-shrink-0">
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            person
          </span>
        </div>
        <div className="flex-1 space-y-3">
          <EditableField
            value={data.name}
            onSave={(v) => onUpdate({ ...data, name: v })}
            className="font-bold"
          />
          {data.email && (
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">email</span>
              <EditableField
                value={data.email}
                onSave={(v) => onUpdate({ ...data, email: v })}
              />
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">phone</span>
              <EditableField
                value={data.phone}
                onSave={(v) => onUpdate({ ...data, phone: v })}
              />
            </div>
          )}
          {data.organization && (
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">business</span>
              <EditableField
                value={data.organization}
                onSave={(v) => onUpdate({ ...data, organization: v })}
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={onExport}
        className="mt-4 w-full py-2.5 bg-primary text-on-primary rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
      >
        <span className="material-symbols-outlined text-lg">person_add</span>
        Save Contact
      </button>
    </div>
  );
}
