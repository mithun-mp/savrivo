import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles: Record<string, React.CSSProperties> = {
  default: { background: 'var(--color-overlay)', color: 'var(--color-text-2)', border: '1px solid var(--color-border)' },
  success: { background: 'rgba(22,163,74,0.1)', color: 'var(--color-success)', border: '1px solid rgba(22,163,74,0.2)' },
  warning: { background: 'rgba(217,119,6,0.1)', color: 'var(--color-warning)', border: '1px solid rgba(217,119,6,0.2)' },
  error:   { background: 'rgba(220,38,38,0.1)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' },
  info:    { background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' },
  accent:  { background: 'rgba(28,69,50,0.1)', color: 'var(--color-accent)', border: '1px solid rgba(28,69,50,0.2)' },
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

