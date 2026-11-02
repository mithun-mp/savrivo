import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  currentPath: string;
  navLinks: { href: string; label: string }[];
}

export default function MobileMenu({ open, onClose, currentPath, navLinks }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const isActive = (href: string) =>
    currentPath === href || (href !== '/' && currentPath.startsWith(href));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.4)' }}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div
        className="relative flex flex-col w-72 max-w-full h-full shadow-xl"
        style={{ background: 'var(--color-surface)' }}
      >
        <div
          className="flex items-center justify-between p-5 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <a
            href="/"
            className="font-bold tracking-[0.2em] text-sm"
            style={{ color: 'var(--color-accent)' }}
            onClick={onClose}
          >
            SAVRIVO
          </a>
          <button
            ref={closeRef}
            onClick={onClose}
            className="p-1 rounded-md"
            style={{ color: 'var(--color-text-2)' }}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-5 space-y-1" aria-label="Mobile navigation">
          {[{ href: '/', label: 'Home' }, ...navLinks].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: isActive(href) ? 'var(--color-accent)' : 'var(--color-text-1)',
                background: isActive(href) ? 'var(--color-overlay)' : 'transparent',
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div
          className="p-5 border-t text-xs"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-2)' }}
        >
          Smart Finds. Better Choices.
        </div>
      </div>
    </div>
  );
}

