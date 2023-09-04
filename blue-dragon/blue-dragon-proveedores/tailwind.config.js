const PRIMARY_COLOR = "#005C90";
const SECONDARY_COLOR = "#C0DAFF";
const LIGHT_BLUE = "#F1F6FD";
const LIGHT_BLUE_INTERMEDIO = "#C0DAFF";
const DARK_BLUE = "#002F50";
const GRAY_PAGE = "#EEEEEE";
const BLACK_TEXTS = "#303030";
const BLUE_TEXTS_BUTTONS = "#DAFFFF";
const LIGHT_GREEN = "#BFF2D6";
const ALERT_BUTTON = "#FF7971";
const RED_CANCEL = "#FF7971";
const AQUAMARINE = "#B5E4CA";
const GRAY_TEXTS = "#62727C";
const TEXT_OPACITY = "#868686";
const SUCCESS = "#027641";
const CHAT_BG = "#F5F7FB";

module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: PRIMARY_COLOR,
        secondary: SECONDARY_COLOR,
        "light-blue": LIGHT_BLUE,
        "light-blue-intermedio": LIGHT_BLUE_INTERMEDIO,
        "dark-blue": DARK_BLUE,
        "gray-page": GRAY_PAGE,
        "black-page": BLACK_TEXTS,
        "blue-texts-buttons": BLUE_TEXTS_BUTTONS,
        "light-green": LIGHT_GREEN,
        "alert-button": ALERT_BUTTON,
        "red-cancel": RED_CANCEL,
        aquamarine: AQUAMARINE,
        "gray-texts": GRAY_TEXTS,
        "text-opacity": TEXT_OPACITY,
        success: SUCCESS,
        "chat-bg": CHAT_BG,
      },
      boxShadow: {
        thru: "0 3px 17px 1px rgba(178, 172, 172, 0.22)",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(50px, 1fr))",
      },
    },
  },
  plugins: [],
};
