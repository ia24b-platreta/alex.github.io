import { useTheme } from '../theme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="icon-btn theme-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={!isDark}
      type="button"
    >
      <span className="text-faint">--theme=</span>
      <span className="text-accent">{isDark ? 'green' : 'paper'}</span>
    </button>
  );
}
