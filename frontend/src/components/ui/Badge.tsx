import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent' | 'curated';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles: Record<string, React.CSSProperties> = {
  default: { background: 'var(--color-surface-subtle)', color: 'var(--color-text-2)', border: '1px solid var(--color-border)' },
  success: { background: 'var(--color-accent-badge)', color: 'var(--color-accent-badge-text)', border: '1px solid var(--color-border)' },
  warning: { background: 'var(--color-curated-badge)', color: 'var(--color-curated-text)', border: '1px solid var(--color-border)' },
  error:   { background: 'rgba(220,38,38,0.1)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' },
  info:    { background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' },
  accent:  { background: 'var(--color-accent-badge)', color: 'var(--color-accent-badge-text)', border: '1px solid var(--color-border)' },
  curated: { background: 'var(--color-curated-badge)', color: 'var(--color-curated-text)', border: '1px solid var(--color-border)' },
};

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClass} ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}

