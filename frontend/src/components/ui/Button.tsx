import React from 'react';
import { url } from '@/lib/paths';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const styles = {
  base: 'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-150 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  variant: {
    primary: 'text-white hover:opacity-90 active:scale-95',
    secondary: 'border hover:opacity-80 active:scale-95',
    ghost: 'hover:opacity-70 active:scale-95',
    danger: 'text-white hover:opacity-90 active:scale-95',
  },
  size: {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  const variantStyle: React.CSSProperties =
    variant === 'primary'
      ? { background: 'var(--color-accent)', color: '#fff' }
      : variant === 'secondary'
      ? { background: 'transparent', color: 'var(--color-text-1)', border: '1px solid var(--color-border)' }
      : variant === 'ghost'
      ? { background: 'transparent', color: 'var(--color-text-2)' }
      : { background: 'var(--color-error)', color: '#fff' };

  const cls = `${styles.base} ${styles.variant[variant]} ${styles.size[size]} ${className}`;

  if (href) {
    const resolvedHref = href.startsWith('/') ? url(href) : href;
    return (
      <a href={resolvedHref} className={cls} style={variantStyle}>
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    );
  }

  return (
    <button className={cls} style={variantStyle} disabled={disabled || loading} {...rest}>
      {loading ? (
        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

