/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      keyframes: {
        move1: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(1000%)' },
        },
        move2: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        move1: 'move1 3s linear infinite',
        move2: 'move2 4s linear infinite',
      },
    },
  },
};
