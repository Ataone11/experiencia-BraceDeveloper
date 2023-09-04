module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    ".src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "loading": "#425AC5",
        "primary-button-bg": "#425AC5",
        "primary-button-text": "white",
        "cancel-button-border": "#220F80",
        "cancel-button-bg": "white",
        "cancel-button-text": "#220F80",
      },
      backgroundImage: {
        'inset': "linear-gradient(89.56deg, #9955D4 -2.8%, #425AC5 103.24%)",
      },
      boxShadow:{
        'box': '0px 2px 10px rgba(176, 174, 174, 0.25)'
      },
      screens: {
        'dl': {'min':'768px', 'max':'1485px'}
      },
    },
  },
  plugins: [],
};
