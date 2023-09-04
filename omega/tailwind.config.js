const redOmega = '#CC0000'
const redOmega2 = '#B20202'
const redOmega3 = '#FF9A9A'
const blackOmega = '#161616'
const greyOmega = '#6B6B6B'

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        redOmega,
        blackOmega,
        greyOmega,
        redOmega2,
        redOmega3,
      },
      fontSize: {
        extraLarge: '36px',
        large: '24px',
        medium: '18px',
        normal: '16px',
        small: '14px',
        extraSmall: '12px',
      },
      fontFamily: {
        myriad: ['"Myriad Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), 
  // require('@tailwindcss/line-clamp'),
],
}
