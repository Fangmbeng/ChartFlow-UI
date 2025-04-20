/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // <== enables manual theme switching
    content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        animation: {
          slideSlow: 'slideSlow 60s linear infinite',
        },
        keyframes: {
          slideSlow: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(-100%)' },
          },
        },
      },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  }
  