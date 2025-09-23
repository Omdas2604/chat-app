// Import the plugin at the top using the 'import' syntax
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'message-in': 'message-in 0.5s ease-out forwards',
      },
      keyframes: {
        'message-in': {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    // Use the imported plugin variable here instead of 'require'
    scrollbarHide
  ],
}