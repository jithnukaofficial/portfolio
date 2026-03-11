/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        bg: '#080c10',
        bg2: '#0d1117',
        surface: '#111820',
        border: '#1e2d3d',
        accent: '#00d4ff',
        accent2: '#00ff9d',
        accent3: '#ff6b35',
        muted: '#5a7a8a',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,212,255,0.4)' },
          '50%': { boxShadow: '0 0 20px 8px rgba(0,212,255,0)' },
        },
      },
    },
  },
  plugins: [],
}
