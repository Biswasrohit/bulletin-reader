'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/ui/app-header';
import { BottomNav } from '@/components/ui/bottom-nav';
import { CaptureGrid } from '@/components/library/capture-grid';
import { CaptureList } from '@/components/library/capture-list';

const FILTER_OPTIONS = ['All Items', 'Documents', 'Whiteboards', 'Recipes', 'Sketches'] as const;

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All Items');

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader title="Glance" />

      <main className="max-w-7xl mx-auto px-6 pt-24">
        {/* Section Header */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-label text-xs uppercase tracking-[0.15em] text-outline mb-2 block">
                Organization
              </span>
              <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">
                Activity Library
              </h2>
            </div>

            {/* Command Bar Search */}
            <div className="flex items-center gap-3 bg-surface-container-lowest p-2 rounded-xl shadow-ambient backdrop-blur-xl border border-outline-variant/20">
              <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-lg gap-3">
                <span className="material-symbols-outlined text-outline text-sm">search</span>
                <input
                  type="text"
                  placeholder="Search captures..."
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-body p-0 w-48 text-on-surface"
                />
              </div>
              <div className="h-8 w-px bg-outline-variant/30" />
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container-high rounded-lg transition-colors">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                <span className="text-xs font-bold uppercase tracking-wider">Filter</span>
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mt-8">
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                  activeFilter === filter
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <CaptureGrid />
        <CaptureList />
      </main>

      <BottomNav />
    </div>
  );
}
