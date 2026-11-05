import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'on-accent': 'rgb(var(--c-on-accent) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        'on-panel': 'rgb(var(--c-on-panel) / <alpha-value>)',
        'panel-soft': 'rgb(var(--c-panel-soft) / <alpha-value>)',
        danger: 'rgb(var(--c-danger) / <alpha-value>)',
        brand: 'rgb(var(--c-brand) / <alpha-value>)',
        tint: 'rgb(var(--c-tint) / <alpha-value>)',
        ice: 'rgb(var(--c-ice) / <alpha-value>)',
        ice2: 'rgb(var(--c-ice2) / <alpha-value>)',
        ok: 'rgb(var(--c-ok) / <alpha-value>)'
      },
      fontSize: { label: ['0.95rem', '1.3'], meta: ['0.875rem', '1.4'] },
      borderRadius: { DEFAULT: '16px', lg: '28px', xl: '40px' },
      fontFamily: { sans: ['Manrope Variable', 'system-ui', 'sans-serif'], serif: ['Cormorant Variable', 'Georgia', 'serif'] }
    }
  }
}
