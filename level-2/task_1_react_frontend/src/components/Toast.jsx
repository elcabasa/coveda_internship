import { CheckCircle2, X, XCircle } from 'lucide-react';

export default function Toast({ type, message, onClose }) {
  if (!message) {
    return null;
  }

  const isError = type === 'error';
  const Icon = isError ? XCircle : CheckCircle2;

  return (
    <div className="theme-surface fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-lg border p-4">
      <div className="flex gap-3">
        <Icon
          className={
            isError
              ? 'text-rose-600 dark:text-rose-400'
              : 'text-emerald-700 dark:text-emerald-300'
          }
          size={22}
        />
        <p className="theme-text min-w-0 flex-1 text-sm font-semibold">
          {message}
        </p>
        <button
          type="button"
          className="theme-muted flex size-7 shrink-0 items-center justify-center rounded-md hover:bg-black/5"
          onClick={onClose}
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
