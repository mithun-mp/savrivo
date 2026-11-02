/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'sv-bg': 'var(--color-bg)',
        'sv-surface': 'var(--color-surface)',
        'sv-surface-subtle': 'var(--color-surface-subtle)',
        'sv-text-1': 'var(--color-text-1)',
        'sv-text-2': 'var(--color-text-2)',
        'sv-accent': 'var(--color-accent)',
        'sv-accent-hover': 'var(--color-accent-hover)',
        'sv-accent-2': 'var(--color-accent-2)',
        'sv-accent-badge': 'var(--color-accent-badge)',
        'sv-accent-badge-text': 'var(--color-accent-badge-text)',
        'sv-curated-badge': 'var(--color-curated-badge)',
        'sv-curated-text': 'var(--color-curated-text)',
        'sv-border': 'var(--color-border)',
        'sv-border-hover': 'var(--color-border-hover)',
        'sv-success': 'var(--color-success)',
        'sv-warning': 'var(--color-warning)',
        'sv-error': 'var(--color-error)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'sv-sm': 'var(--shadow-sm)',
        'sv-md': 'var(--shadow-md)',
        'sv-lg': 'var(--shadow-lg)',
      },
      maxWidth: {
        'content': '1440px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

