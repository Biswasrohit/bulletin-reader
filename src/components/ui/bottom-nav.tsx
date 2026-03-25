'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  readonly label: string;
  readonly icon: string;
  readonly href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Capture', icon: 'photo_camera', href: '/' },
  { label: 'Library', icon: 'inventory_2', href: '/library' },
  { label: 'Settings', icon: 'settings', href: '/settings' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-xl z-50 shadow-[0_-16px_32px_rgba(28,27,27,0.04)] border-t border-outline-variant/20">
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === '/'
          ? pathname === '/'
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-300 ease-out ${
              isActive
                ? 'text-primary font-bold'
                : 'text-primary/40 hover:text-primary'
            }`}
          >
            <span
              className="material-symbols-outlined mb-1"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest font-medium">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
