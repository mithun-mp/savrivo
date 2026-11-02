import React from 'react';
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export const toastsStore = atom<Toast[]>([]);

export function addToast(type: Toast['type'], message: string, duration = 4000) {
  const id = Math.random().toString(36).slice(2);
  toastsStore.set([...toastsStore.get(), { id, type, message }]);
  setTimeout(() => removeToast(id), duration);
}

function removeToast(id: string) {
  toastsStore.set(toastsStore.get().filter(t => t.id !== id));
}

const icons = { success: CheckCircle, error: AlertCircle, info: Info };
const toastStyles: Record<string, React.CSSProperties> = {
  success: { background: 'var(--color-surface)', borderLeft: '3px solid var(--color-success)' },
  error:   { background: 'var(--color-surface)', borderLeft: '3px solid var(--color-error)' },
  info:    { background: 'var(--color-surface)', borderLeft: '3px solid var(--color-accent)' },
};
const iconColors = { success: 'var(--color-success)', error: 'var(--color-error)', info: 'var(--color-accent)' };

export function ToastProvider() {
  const toasts = useStore(toastsStore);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map(({ id, type, message }) => {
        const Icon = icons[type];
        return (
          <div
            key={id}
            className="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg shadow-sv-md max-w-xs"
            style={{ ...toastStyles[type], border: '1px solid var(--color-border)' }}
            role="alert"
          >
            <Icon size={16} style={{ color: iconColors[type], marginTop: 2, flexShrink: 0 }} aria-hidden="true" />
            <p className="text-sm flex-1" style={{ color: 'var(--color-text-1)' }}>{message}</p>
            <button
              onClick={() => removeToast(id)}
              className="shrink-0 opacity-50 hover:opacity-100"
              style={{ color: 'var(--color-text-2)' }}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

