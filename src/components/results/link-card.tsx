import type { LinkData } from '@/lib/types';

interface LinkCardProps {
  readonly data: LinkData;
}

export function LinkCard({ data }: LinkCardProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-subtle border border-outline-variant/10">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-headline font-black text-primary text-sm shadow-sm flex-shrink-0">
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            link
          </span>
        </div>
        <div>
          <p className="font-headline font-bold text-on-surface text-sm">Extracted Links</p>
          <p className="text-xs text-outline">{data.urls.length} URL{data.urls.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>
      <ul className="space-y-3">
        {data.urls.map((url, index) => (
          <li key={index}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-secondary/80 underline underline-offset-2 break-all flex items-center gap-2 group"
            >
              <span className="material-symbols-outlined text-sm text-outline group-hover:text-secondary transition-colors">
                open_in_new
              </span>
              {url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
