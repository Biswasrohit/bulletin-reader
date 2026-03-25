'use client';

import { useState, useCallback } from 'react';

interface EditableFieldProps {
  readonly value: string;
  readonly label?: string;
  readonly onSave: (newValue: string) => void;
  readonly className?: string;
  readonly multiline?: boolean;
}

export function EditableField({
  value,
  label,
  onSave,
  className = '',
  multiline = false,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    if (draft !== value) {
      onSave(draft);
    }
  }, [draft, value, onSave]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    }
    if (e.key === 'Escape') {
      setDraft(value);
      setIsEditing(false);
    }
  }, [handleSave, multiline, value]);

  if (isEditing) {
    const inputProps = {
      value: draft,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDraft(e.target.value),
      onBlur: handleSave,
      onKeyDown: handleKeyDown,
      autoFocus: true,
      className: `w-full bg-surface-container-low rounded px-2 py-1 text-on-surface font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 ${className}`,
    };

    return (
      <div>
        {label && <span className="text-xs text-outline uppercase tracking-wider block mb-1">{label}</span>}
        {multiline ? (
          <textarea {...inputProps} rows={3} />
        ) : (
          <input type="text" {...inputProps} />
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer group"
    >
      {label && <span className="text-xs text-outline uppercase tracking-wider block mb-1">{label}</span>}
      <span className={`text-on-surface text-sm group-hover:text-primary transition-colors ${className}`}>
        {value || <span className="text-outline italic">Click to edit</span>}
      </span>
    </div>
  );
}
