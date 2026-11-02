import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Crumb { label: string; href?: string; }

interface BreadcrumbProps {
  items: Crumb[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.label,
      ...(item.href ? { "item": `https://savrivo.in${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 flex-wrap">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <ChevronRight size={14} style={{ color: 'var(--color-border)' }} aria-hidden="true" />}
            {item.href && i < items.length - 1 ? (
              <a
                href={item.href}
                className="text-xs hover:underline underline-offset-2"
                style={{ color: 'var(--color-text-2)' }}
              >
                {item.label}
              </a>
            ) : (
              <span className="text-xs font-medium" style={{ color: 'var(--color-text-1)' }} aria-current="page">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}

