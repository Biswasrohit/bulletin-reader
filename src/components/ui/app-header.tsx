'use client';

interface AppHeaderProps {
  readonly title?: string;
  readonly variant?: 'capture' | 'detail';
  readonly onBack?: () => void;
  readonly rightAction?: React.ReactNode;
}

export function AppHeader({
  title = 'Glance',
  variant = 'capture',
  onBack,
  rightAction,
}: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface flex justify-between items-center px-6 py-4 w-full">
      <div className="flex items-center gap-4">
        {variant === 'detail' && onBack ? (
          <button
            onClick={onBack}
            className="text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : (
          <span className="material-symbols-outlined text-primary cursor-pointer hover:bg-surface-container-low transition-colors p-2 rounded-lg">
            menu_open
          </span>
        )}
        <h1 className="font-headline font-black text-xl tracking-[-0.02em] text-on-surface">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {rightAction ?? (
          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border-2 border-surface-container-highest">
            <div className="w-full h-full bg-primary-container/30 flex items-center justify-center text-primary text-xs font-bold">
              G
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
