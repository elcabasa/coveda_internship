import { RefreshCcw, Store } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header({ productCount, theme, onRefresh, onThemeChange }) {
  return (
    <header className="theme-surface border-b transition-colors">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-md bg-stone-900 text-white">
            <Store size={22} />
          </div>
          <div>
            <p className="theme-accent text-xs font-bold uppercase tracking-wide">
              Level 2 React Frontend
            </p>
            <h1 className="theme-text text-2xl font-extrabold">
              StockRoom
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="theme-card rounded-md border px-3 py-2 text-sm font-semibold">
            {productCount} products tracked
          </span>
          <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
          <button type="button" className="btn btn-secondary" onClick={onRefresh}>
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>
      </div>
    </header>
  );
}
