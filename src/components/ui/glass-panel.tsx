interface GlassPanelProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div className={`bg-white/80 backdrop-blur-[20px] ${className}`}>
      {children}
    </div>
  );
}
