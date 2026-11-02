import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'card' | 'avatar' | 'image' | 'rect';
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ variant = 'rect', width, height, className = '' }: SkeletonProps) {
  const base = 'skeleton';
  const variantClass =
    variant === 'avatar' ? 'rounded-full' :
    variant === 'text' ? 'rounded' :
    'rounded-md';

  const style: React.CSSProperties = {
    width: width,
    height: height || (variant === 'text' ? '1em' : variant === 'avatar' ? '40px' : undefined),
  };

  return <div className={`${base} ${variantClass} ${className}`} style={style} aria-hidden="true" />;
}

export function ProductCardSkeleton() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
      aria-hidden="true"
    >
      <Skeleton variant="image" className="w-full" height="220px" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="40%" height="12px" />
        <Skeleton variant="text" width="85%" height="18px" />
        <Skeleton variant="text" width="30%" height="12px" />
        <Skeleton variant="text" width="100%" height="12px" />
        <Skeleton variant="text" width="75%" height="12px" />
        <div className="pt-2">
          <Skeleton variant="rect" width="100%" height="38px" />
        </div>
      </div>
    </div>
  );
}

