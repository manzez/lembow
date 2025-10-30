/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          50: 'var(--purple-50)',
          100: 'var(--purple-100)',
          200: 'var(--purple-200)',
          300: 'var(--purple-300)',
          400: 'var(--purple-400)',
          500: 'var(--purple-500)',
          600: 'var(--purple-600)',
          700: 'var(--purple-700)',
          800: 'var(--purple-800)',
          900: 'var(--purple-900)',
        },
        mauve: {
          50: 'var(--mauve-50)',
          100: 'var(--mauve-100)',
          200: 'var(--mauve-200)',
          300: 'var(--mauve-300)',
          400: 'var(--mauve-400)',
          500: 'var(--mauve-500)',
          600: 'var(--mauve-600)',
          700: 'var(--mauve-700)',
          800: 'var(--mauve-800)',
          900: 'var(--mauve-900)',
        },
        violet: {
          50: 'var(--violet-50)',
          100: 'var(--violet-100)',
          200: 'var(--violet-200)',
          300: 'var(--violet-300)',
          400: 'var(--violet-400)',
          500: 'var(--violet-500)',
          600: 'var(--violet-600)',
          700: 'var(--violet-700)',
          800: 'var(--violet-800)',
          900: 'var(--violet-900)',
        },
      },
      animation: {
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'gradient': 'gradient-shift 3s ease infinite',
        'bounce-in': 'bounce-in 0.6s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'purple': '0 10px 25px -3px rgba(147, 51, 234, 0.2), 0 4px 6px -2px rgba(147, 51, 234, 0.05)',
        'purple-lg': '0 20px 40px -4px rgba(147, 51, 234, 0.3), 0 8px 16px -4px rgba(147, 51, 234, 0.1)',
        'mauve': '0 10px 25px -3px rgba(192, 38, 211, 0.2), 0 4px 6px -2px rgba(192, 38, 211, 0.05)',
        'glow': '0 0 20px rgba(147, 51, 234, 0.4)',
      },
    },
  },
  plugins: [],
}
