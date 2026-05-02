/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: { 300: '#22d3ee', 400: '#06b6d4', 500: '#0891b2' },
        amber: { 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b' },
        purple: { 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7' },
      },
    },
  },
  plugins: [],
};