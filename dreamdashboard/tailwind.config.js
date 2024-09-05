/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      blue: '#004cb0',
      blacklight600: "#3d3d3d",
      red: "#dc3545",
      skyblue: "#007DB5",
      textblack: "#2B2B2B",
      darkblue: "#0852C4",
      greylight: "#92929D",
      blacklight: "#4f4f55",
      lightgreen: "#25ab71",
      darkgreen: "#008000",
      darkgrey: "#B9B9B9",
      lightblue: "#5B97D5",
      grey100: "#92929D",
      lightgrey: "#EDF0F3",
      lightgrey300: "#f4f4f4",
      blue1: "#0051CC",
      blue2: "#e6ebff",
      bluelight1: "#0A9EE2",
      lightskyblue: "#E0F5FF",
      darkestblue: "#dce7f7",
      lightsky100: "#f7f9f9",
      grey300: "#414141",
      blue200: "#098ECB",
      grey400: "#535353",
      grey500: "#9E9E9E",
      grey100: "#ebebe4",
      lightgrey_100: '#E0E0E0'
    },
    screens: {
      "2xl": { max: "1399px" },
      // => @media (max-width: 1399px) { ... }

      xl: { max: "1199px" },
      // => @media (max-width: 1199px) { ... }

      lg: { max: "991px" },
      // => @media (max-width: 991px) { ... }

      "ipad-l": { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },

    fontSize: {
      xs: ["0.75rem", "1.125rem"],
      sm: ["0.875rem", "1.5rem"],
      md: ["1.25rem", "1.875rem"],
      base: [".875rem", "1.25rem"],
      baselg: [".9375rem", "1.375rem"],
      normaltext: ["1.125rem", "1.75rem"],
      body: ["1rem", "1.625rem"],
      lg: ["1.625rem", "2.5rem"],
      lg2: ["2rem", "3.125rem"],
      xl: ["2.625rem", "3.75rem"],
      xxl: ["3.75rem", "5rem"],
    },

    extend: {
      backgroundColor: {
        "blue-opacity": "rgba(8, 82, 196, 0.2784)",
        "dashboard-card": "rgba(255, 255, 255, 0.3)",
        // "dashboard-card-second": "rgba(93, 173, 226, 0.1)",
        // "dashboard-card-third": "rgba(93, 173, 226, 0.6)",
        "loader-background": "rgba(255,255,255,0.75)",        
      },
      backgroundImage: (theme) => ({
        "gradient-blue":
          "linear-gradient(90deg, rgba(45, 160, 218, 1) 0%, rgba(23, 121, 211, 1) 35%, rgba(0, 81, 204, 1) 100%)",
      }),
      padding: {
        "0-important": "0 !important",
      },
      boxShadow: {
        "dashboard-card": "0px 10px 10px 0px rgba(0, 0, 0, 0.031)",
        "input-field": "0px 2px 24px 0px rgba(0, 0, 0, 0.1)",
      },
      borderColor: {
        "dashboard-card": "rgba(0, 0, 0, 0.1)",
      },
      maxWidth: {
        'none': 'none',
      },
      height: {
        'calc-100-minus-58': 'calc(100% - 58px)',
      }
    },
  },
  plugins: [function ({ addUtilities }) {
    const newUtilities = {
      '.max-w-none-important': {
        'max-width': 'none !important',
      },
      '.w-auto-important': {
        'width': 'auto !important',
      },
    };
    addUtilities(newUtilities, ['responsive', 'hover']);
  },],
};
