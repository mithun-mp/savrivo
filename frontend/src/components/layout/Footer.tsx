import React from 'react';

const footerLinks = {
  discover: [
    { href: '/products', label: 'All Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/guides', label: 'Buying Guides' },
    { href: '/offers', label: 'Live Offers' },
  ],
  company: [
    { href: '/about', label: 'About SAVRIVO' },
    { href: '/contact', label: 'Contact' },
    { href: '/editorial-policy', label: 'Editorial Policy' },
  ],
  legal: [
    { href: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-auto"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="container-content py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a
              href="/"
              className="inline-flex items-center gap-2 font-bold tracking-[0.2em] text-sm mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              <svg width="22" height="22" viewBox="0 0 48 56" fill="none" aria-hidden="true">
                <path
                  d="M32 6 C22 6 14 11 14 19 C14 25 19 28 26 30 L30 31.5 C38 33.5 44 37 44 44 C44 51 37 50 30 50 C23 50 16 47 14 41"
                  stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"
                />
                <circle cx="28" cy="19" r="3" fill="var(--color-accent-2)" />
              </svg>
              SAVRIVO
            </a>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
              Smart Finds. Better Choices.<br />
              An independent product discovery platform for India.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-1)' }}>
              Discover
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.discover.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm transition-colors hover:underline underline-offset-2"
                    style={{ color: 'var(--color-text-2)' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-1)' }}>
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm transition-colors hover:underline underline-offset-2"
                    style={{ color: 'var(--color-text-2)' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-1)' }}>
              Legal
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm transition-colors hover:underline underline-offset-2"
                    style={{ color: 'var(--color-text-2)' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-2)' }}>
            © {year} SAVRIVO. All rights reserved.
          </p>
          <p className="text-xs text-center" style={{ color: 'var(--color-text-2)' }}>
            SAVRIVO earns commissions from qualifying purchases via affiliate links.{' '}
            <a href="/affiliate-disclosure" className="underline underline-offset-2">
              Learn more
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

