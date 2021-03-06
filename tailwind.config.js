module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      inter: "Inter, sans-serif",
    },
    extend: {
      colors: {
        primary: "#4F3C74",
        "shades-100": "#BAAFD0",
        "shades-200": "#927EB9",
        "shades-300": "#8067B8",
        "shades-400": "#6A50A7",
        "shades-500": "#634D8D",
        "dark-100": "#2F3142",
        "dark-200": "#252836",
        "dark-300": "#1F1D2B",
        "neutral-100": "#F4F5F6",
        "neutral-200": "#D2D6DB",
        "neutral-300": "#A6AFBC",
        "neutral-400": "#5C6A80",
        "neutral-500": "#303B4D",
        "success-100": "#EBF4D8",
        "success-200": "#7CA922",
        "success-300": "#456603",
        "warning-100": "#FFDDB2",
        "warning-200": "#FF9F24",
        "warning-300": "#FF950A",
        "warning-400": "#DF6B00",
        "error-100": "#FFD9D0",
        "error-200": "#DF431E",
        "error-300": "#B62300",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      boxShadow: {
        "3xl": "0px 4px 40px 8px rgba(0,0,0,0.4)",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
};
