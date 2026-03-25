interface CaptureItem {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly date: string;
  readonly imageUrl?: string;
  readonly description?: string;
}

const SAMPLE_CAPTURES: readonly CaptureItem[] = [
  {
    id: '1',
    title: 'Project Strategy Board',
    type: 'Whiteboard',
    date: 'Mar 24 • 11:15 AM',
    imageUrl: 'https://placehold.co/800x450/f0edec/434656?text=Whiteboard+Capture',
  },
  {
    id: '2',
    title: 'Architecture Sync',
    type: 'Whiteboard',
    date: 'Mar 23 • 2:45 PM',
    imageUrl: 'https://placehold.co/400x400/f0edec/434656?text=Architecture',
  },
  {
    id: '3',
    title: 'Project Charter',
    type: 'Document',
    date: 'Mar 22 • 09:00 AM',
    description: 'Foundational principles for the interface and user interaction models...',
  },
  {
    id: '4',
    title: 'UI Concept #04',
    type: 'Sketch',
    date: 'Mar 21 • 5:12 PM',
    imageUrl: 'https://placehold.co/400x225/f0edec/434656?text=Sketch',
  },
  {
    id: '5',
    title: 'Expense Categorized',
    type: 'AI Insight',
    date: 'Mar 20 • 3:30 PM',
    description: 'Receipt from "Design Supply Co." identified as Office Equipment. Amount: $142.00',
  },
];

export function CaptureGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
      {/* Large highlight card */}
      <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-lowest rounded-xl shadow-subtle border border-outline-variant/10 transition-all hover:shadow-ambient">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={SAMPLE_CAPTURES[0].imageUrl}
            alt={SAMPLE_CAPTURES[0].title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent opacity-60" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                {SAMPLE_CAPTURES[0].type}
              </span>
              <span className="text-white/70 text-xs font-medium">
                {SAMPLE_CAPTURES[0].date}
              </span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-white tracking-tight">
              {SAMPLE_CAPTURES[0].title}
            </h3>
          </div>
        </div>
      </div>

      {/* Whiteboard card */}
      <div className="md:col-span-4 group bg-surface-container-lowest rounded-xl shadow-subtle border border-outline-variant/10 overflow-hidden flex flex-col">
        <div className="aspect-square bg-surface-container-low p-6 overflow-hidden flex items-center justify-center">
          <img
            className="rounded-lg shadow-sm transition-transform duration-500 group-hover:rotate-1 group-hover:scale-110"
            src={SAMPLE_CAPTURES[1].imageUrl}
            alt={SAMPLE_CAPTURES[1].title}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
              {SAMPLE_CAPTURES[1].type}
            </span>
          </div>
          <h3 className="font-headline font-bold text-lg mb-1">{SAMPLE_CAPTURES[1].title}</h3>
          <p className="text-xs text-outline">{SAMPLE_CAPTURES[1].date}</p>
        </div>
      </div>

      {/* Document card */}
      <div className="md:col-span-4 group bg-surface-container-lowest rounded-xl shadow-subtle border border-outline-variant/10 overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">description</span>
            </div>
            <span className="text-[10px] font-bold text-outline uppercase tracking-widest">
              {SAMPLE_CAPTURES[2].type}
            </span>
          </div>
          <h3 className="font-headline font-bold text-lg mb-1">{SAMPLE_CAPTURES[2].title}</h3>
          <p className="text-sm text-on-surface-variant/80 line-clamp-2 mb-6">
            {SAMPLE_CAPTURES[2].description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs font-medium text-outline">{SAMPLE_CAPTURES[2].date}</span>
            <span
              className="material-symbols-outlined text-secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
        </div>
      </div>

      {/* Sketch card */}
      <div className="md:col-span-4 group bg-surface-container-lowest rounded-xl shadow-subtle border border-outline-variant/10 overflow-hidden flex flex-col">
        <div className="aspect-video bg-surface-container-low overflow-hidden">
          <img
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            src={SAMPLE_CAPTURES[3].imageUrl}
            alt={SAMPLE_CAPTURES[3].title}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
              {SAMPLE_CAPTURES[3].type}
            </span>
          </div>
          <h3 className="font-headline font-bold text-lg mb-1">{SAMPLE_CAPTURES[3].title}</h3>
          <p className="text-xs text-outline">{SAMPLE_CAPTURES[3].date}</p>
        </div>
      </div>

      {/* AI Insight card */}
      <div className="md:col-span-4 group bg-secondary-container/10 border-l-4 border-secondary rounded-r-xl p-6 flex flex-col justify-between shadow-subtle">
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-secondary">account_balance_wallet</span>
            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase">
              AI Insight
            </span>
          </div>
          <h3 className="font-headline font-bold text-lg mb-2">{SAMPLE_CAPTURES[4].title}</h3>
          <p className="text-sm text-on-surface-variant/90 leading-relaxed">
            {SAMPLE_CAPTURES[4].description}
          </p>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button className="text-xs font-bold uppercase tracking-wider text-secondary hover:underline transition-all">
            Approve
          </button>
          <button className="text-xs font-bold uppercase tracking-wider text-outline hover:text-on-surface transition-all">
            Details
          </button>
        </div>
      </div>
    </section>
  );
}
