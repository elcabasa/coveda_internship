import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, onThemeChange }) {
  const isDark = theme === 'dark';

  return (
    <div
      className="theme-card inline-flex h-10 rounded-md border p-1 shadow-sm"
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 rounded px-2.5 text-sm font-semibold transition ${
          !isDark ? 'theme-toggle-active' : 'theme-toggle-inactive'
        }`}
        onClick={() => onThemeChange('light')}
        aria-pressed={!isDark}
      >
        <Sun size={15} />
        Light
      </button>
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 rounded px-2.5 text-sm font-semibold transition ${
          isDark ? 'theme-toggle-active' : 'theme-toggle-inactive'
        }`}
        onClick={() => onThemeChange('dark')}
        aria-pressed={isDark}
      >
        <Moon size={15} />
        Dark
      </button>
    </div>
  );
}
