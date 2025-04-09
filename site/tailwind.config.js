/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        logoGray: "#575757", // C0 M0 Y0 K80
        backgroundBeige: "#ebd8b2", // C10 M15 Y35 K0
        pureWhite: "#FFFFFF", // C0 M0 Y0 K0
        coolBlue: "#788ca0", // C60 M40 Y30 K0
        goldenYellow: "#d3b768", // C20 M25 Y65 K5
        mediumGray: "#9d9d9d", // C0 M0 Y0 K50
        lightGray: "#dadada", // C0 M0 Y0 K20
      },
      fontFamily: {
        geologica: ["Geologica", "sans-serif"],
        playfair: ["'Playfair Display'", "serif"],
        roboto: ["Roboto Slab", "sans-serif"],
      },
      animation: {
        // Define the marquee animation
        // Adjust duration (e.g., 25s) to control speed
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        // Define the keyframes for the marquee
        marquee: {
          "0%": { transform: "translateX(0%)" },
          // Translate by -100% to move the entire duplicated block
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [require("tailwind-hamburgers")],
};
