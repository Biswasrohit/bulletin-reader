'use client';

import type { ExtractedCard } from '@/lib/types';

interface ActionCardsProps {
  readonly cards: readonly ExtractedCard[];
}

interface ActionCardConfig {
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
  readonly iconBgClass: string;
  readonly iconColorClass: string;
}

function getCardConfig(type: ExtractedCard['type']): ActionCardConfig {
  switch (type) {
    case 'checklist':
      return {
        icon: 'checklist',
        title: 'Create Checklist',
        subtitle: 'Automated Tasking',
        iconBgClass: 'bg-primary-container/10 group-hover:bg-primary-container/20',
        iconColorClass: 'text-primary',
      };
    case 'email':
      return {
        icon: 'summarize',
        title: 'Summarize & Email',
        subtitle: 'Executive Summary',
        iconBgClass: 'bg-secondary-container/10 group-hover:bg-secondary-container/20',
        iconColorClass: 'text-secondary',
      };
    case 'event':
      return {
        icon: 'calendar_today',
        title: 'Add to Calendar',
        subtitle: 'Schedule Event',
        iconBgClass: 'bg-surface-container-high group-hover:bg-surface-container-highest',
        iconColorClass: 'text-on-surface-variant',
      };
    case 'contact':
      return {
        icon: 'person_add',
        title: 'Save Contact',
        subtitle: 'Add to Contacts',
        iconBgClass: 'bg-primary-container/10 group-hover:bg-primary-container/20',
        iconColorClass: 'text-primary',
      };
    case 'link':
      return {
        icon: 'link',
        title: 'Open Links',
        subtitle: 'Extracted URLs',
        iconBgClass: 'bg-secondary-container/10 group-hover:bg-secondary-container/20',
        iconColorClass: 'text-secondary',
      };
  }
}

export function ActionCards({ cards }: ActionCardsProps) {
  if (cards.length === 0) return null;

  // Deduplicate by type for the action card display
  const uniqueTypes = [...new Set(cards.map((c) => c.type))];

  return (
    <section className="mt-12 space-y-4">
      <h3 className="px-6 font-headline font-bold text-on-surface flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">bolt</span>
        Intelligent Actions
      </h3>
      <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar pb-4">
        {uniqueTypes.map((type) => {
          const config = getCardConfig(type);
          return (
            <button
              key={type}
              className="flex-shrink-0 w-44 p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm hover:shadow-md transition-all group active:scale-95"
            >
              <div className={`w-12 h-12 rounded-lg ${config.iconBgClass} flex items-center justify-center mb-4 transition-colors`}>
                <span
                  className={`material-symbols-outlined ${config.iconColorClass}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {config.icon}
                </span>
              </div>
              <p className="text-left font-headline font-bold text-on-surface text-sm leading-tight">
                {config.title}
              </p>
              <p className="text-left font-label text-[10px] text-outline mt-1 uppercase">
                {config.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
