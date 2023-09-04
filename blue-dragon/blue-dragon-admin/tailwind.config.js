module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/screens/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* fontSize: {
        'sm': '13px'
      }, */
      colors: {
        Principal: "#005C90",
        secondary: "#C0DAFF",
        Claro: "#F1F6FD",
        Oscuro: "#002F50",
        Active: "#DAFFFF",
        ClaroDisable: "#92CAFF",
        TextOpacity: "#868686",
        backgroundPage: "#EEEEEE",
        alert: "#FF7971",
        success: "#BFF2D6",
        "chat-bg": "#F5F7FB",
      },
      width: {},
      height: {
        header: "66px",
      },
    },
  },
  plugins: [],
};
