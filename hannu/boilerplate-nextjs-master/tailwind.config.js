const blueHannu = "#3089b0";

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blueHannu,
      },
      fontSize: {
        extraLarge: "36px",
        large: "24px",
        medium: "18px",
        normal: "16px",
        small: "14px",
        extraSmall: "12px",
      },
      fontFamily: {
        myriad: ['"Myriad Pro"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
