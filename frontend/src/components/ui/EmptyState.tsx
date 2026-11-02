import React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  showSavi?: boolean;
  className?: string;
}

function SaviIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="28" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
      <circle cx="32" cy="32" r="16" fill="var(--color-accent)" opacity="0.06" />
      <circle cx="32" cy="32" r="5" fill="var(--color-accent)" opacity="0.6" />
      <line x1="32" y1="17" x2="32" y2="23" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="41" x2="32" y2="47" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="17" y1="32" x2="23" y2="32" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="41" y1="32" x2="47" y2="32" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <circle cx="20" cy="20" r="1.5" fill="var(--color-accent-2)" opacity="0.5" />
    </svg>
  );
}

export default function EmptyState({ title, description, action, showSavi = true, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-20 px-6 ${className}`}>
      {showSavi && (
        <div className="mb-6 opacity-80">
          <SaviIcon />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-1)' }}>
        {title}
      </h3>
      {description && (
        <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

