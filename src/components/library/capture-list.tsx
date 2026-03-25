interface ListItem {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly date: string;
  readonly imageUrl: string;
}

const EARLIER_ITEMS: readonly ListItem[] = [
  {
    id: 'e1',
    title: 'Meeting Notes - Brand Strategy',
    type: 'Document',
    date: 'Mar 14',
    imageUrl: 'https://placehold.co/48x48/f0edec/434656?text=Doc',
  },
  {
    id: 'e2',
    title: 'Draft: User Persona Sketches',
    type: 'Sketch',
    date: 'Mar 12',
    imageUrl: 'https://placehold.co/48x48/f0edec/434656?text=Sketch',
  },
];

export function CaptureList() {
  return (
    <section className="mt-8">
      <h4 className="font-label text-xs uppercase tracking-[0.15em] text-outline mb-6">
        Earlier this month
      </h4>
      <div className="space-y-3">
        {EARLIER_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-transparent hover:border-outline-variant/30 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-surface-container-low overflow-hidden flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src={item.imageUrl}
                alt={item.title}
              />
            </div>
            <div className="flex-grow">
              <h5 className="font-bold text-on-surface text-sm">{item.title}</h5>
              <p className="text-xs text-outline">
                {item.date} &bull; {item.type}
              </p>
            </div>
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-outline text-lg">star</span>
              <span className="material-symbols-outlined text-outline text-lg">more_vert</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
