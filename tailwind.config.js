/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#04cefe",
        card: "#141414",
        text: "#ffffff",
        dimWhite: "#e4e4e4",
        background: "#000000",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        spartan: ["League Spartan", "sans-serif"],
      },
    },
    screens: {
      xxs: "200px",
      xs: "400px",
      ss: "620px",
      ssm: "700px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
      tablet: "800px",
    
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
