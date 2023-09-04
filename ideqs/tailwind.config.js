const grisNeutral100 = '#DFDFDF'
const grisNeutral300 = '#B3B3BF'
const grisNeutral500 = '#7D848E'
const grisNeutral700 = '#465569'
const grisNeutral900 = '#465569'
const grisBordesPdf = '#3A3D40'

const azulPrimary100 = '#D8F0FF'
const azulPrimary300 = '#B6E3FF'
const azulPrimary500 = '#6DC6FD'
const azulPrimary700 = '#2490D3'
const azulPrimary900 = '#086EAE'
const azulPrimaryDark = '#00305D'

const azulSecondary100 = '#F6FAFF'
const azulSecondary300 = '#E9F3FF'
const azulSecondary500 = '#D8EAFF'
const azulSecondary700 = '#B8DAFF'
const azulSecondary900 = '#95C2F4'
const azulSecondaryDark = '#044167'

const complementar = '#3E5271'
const shades = '#F6FAFF'

const yellowTable = '#FEFF97'
const blueTable = '#94DDFF'
const greenTable = '#73FF73'
const redTable = '#FF6633'
const purpleTable = '#5576A1'

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        grisNeutral100,
        grisNeutral300,
        grisNeutral500,
        grisNeutral700,
        grisNeutral900,
        grisBordesPdf,
        azulPrimary100,
        azulPrimary300,
        azulPrimary500,
        azulPrimary700,
        azulPrimary900,
        azulSecondary100,
        azulSecondary300,
        azulSecondary500,
        azulSecondary700,
        azulSecondary900,
        azulPrimaryDark,
        azulSecondaryDark,
        complementar,
        shades,
        yellowTable,
        blueTable,
        greenTable,
        redTable,
        purpleTable
      },
      fontSize: {
        textSize1: '49px',
        textSize2: '39px',
        textSize3: '31px',
        textSize4: '25px',
        textSize5: '20px',
        textSize6: '16px',
        textSize7: '13px',
        textSize8: '10px'
      },
      fontFamily: {
        myriad: ['"Myriad Pro"', 'sans-serif']
      },
      dropShadow: {
        box: ['0px 16px 30px rgba(154, 212, 249, 0.35)']
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
