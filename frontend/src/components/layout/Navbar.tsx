import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { themeStore, initTheme, toggleTheme } from '@/stores/theme';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  currentPath: string;
}

const navLinks = [
  { href: '/products', label: 'Discover' },
  { href: '/categories', label: 'Categories' },
  { href: '/guides', label: 'Buying Guides' },
  { href: '/offers', label: 'Offers' },
];

export default function Navbar({ currentPath }: NavbarProps) {
  const theme = useStore(themeStore);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    initTheme();
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    currentPath === href || (href !== '/' && currentPath.startsWith(href));

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-all duration-200"
        style={{
          background: scrolled ? 'var(--color-surface)' : 'var(--color-bg)',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="container-content flex items-center h-16 gap-6">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 shrink-0 font-bold tracking-[0.2em] text-sm"
            style={{ color: 'var(--color-accent)' }}
            aria-label="SAVRIVO — Home"
          >
            {/* Inline S mark */}
            <svg width="28" height="28" viewBox="0 0 48 56" fill="none" aria-hidden="true">
              <path
                d="M32 6 C22 6 14 11 14 19 C14 25 19 28 26 30 L30 31.5 C38 33.5 44 37 44 44 C44 51 37 50 30 50 C23 50 16 47 14 41"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="28" cy="19" r="3" fill="var(--color-accent-2)" />
            </svg>
            <span>SAVRIVO</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-3 py-2 text-sm rounded-md transition-colors duration-150"
                style={{
                  color: isActive(href) ? 'var(--color-accent)' : 'var(--color-text-2)',
                  background: isActive(href) ? 'var(--color-overlay)' : 'transparent',
                  fontWeight: isActive(href) ? '600' : '400',
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            <a
              href="/search"
              className="p-2 rounded-md transition-colors"
              style={{ color: 'var(--color-text-2)' }}
              aria-label="Search"
            >
              <Search size={18} />
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition-colors"
              style={{ color: 'var(--color-text-2)' }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md"
              style={{ color: 'var(--color-text-2)' }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentPath={currentPath}
        navLinks={navLinks}
      />
    </>
  );
}

