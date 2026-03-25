'use client';

import type { Checklist } from '@/lib/exporters';
import { EditableField } from './editable-field';

interface ChecklistCardProps {
  readonly data: Checklist;
  readonly onUpdate: (updated: Checklist) => void;
  readonly onCopy: () => void;
}

export function ChecklistCard({ data, onUpdate, onCopy }: ChecklistCardProps) {
  const handleTaskUpdate = (index: number, newValue: string) => {
    const newTasks = data.tasks.map((task, i) => (i === index ? newValue : task));
    onUpdate({ ...data, tasks: newTasks });
  };

  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-subtle border border-outline-variant/10">
      <EditableField
        value={data.title}
        onSave={(v) => onUpdate({ ...data, title: v })}
        className="font-headline font-bold text-xs uppercase tracking-[0.2em] text-outline mb-6 block"
      />
      <ul className="space-y-4">
        {data.tasks.map((task, index) => (
          <li key={index} className="flex items-start gap-4 group">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary/20 transition-all"
            />
            <div className="flex-1">
              <EditableField
                value={task}
                onSave={(v) => handleTaskUpdate(index, v)}
                className="font-medium group-hover:text-primary"
              />
            </div>
          </li>
        ))}
      </ul>

      {/* AI Insight Card */}
      <div className="mt-6 bg-secondary-container/10 border-l-4 border-secondary p-4 rounded-r-lg">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-secondary text-sm">psychology</span>
          <span className="font-headline font-bold text-[10px] uppercase tracking-wider text-secondary">
            AI Insight
          </span>
        </div>
        <p className="text-xs text-on-secondary-container leading-relaxed">
          {data.tasks.length} tasks extracted from the captured content.
        </p>
      </div>

      <button
        onClick={onCopy}
        className="mt-4 w-full py-2.5 bg-surface-container-low text-on-surface rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-all active:scale-95"
      >
        <span className="material-symbols-outlined text-lg">content_copy</span>
        Copy as Markdown
      </button>
    </div>
  );
}
