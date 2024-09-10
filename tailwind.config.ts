import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/assets/**/*.svg",
    "./public/assets/**/*.png",
    "./public/assets/**/*.jpg",
    "./public/assets/**/*.jpeg",
    "./public/assets/**/*.gif",
    "./public/assets/**/*.ico",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "custom-radical": "radial-gradient(circle, gray 1px, transparent 2px)",
      },
      backgroundSize: {
        "dotted-size": "20px 20px",
      },
      backdropBlur: {
        backdropBlur: "2px",
      },
      backgroundBlendMode: {
        overlay: "overlay",
      },

      colors: {
        "textInput-color": "#f4f4f4",
        "sunset-primary": "#210062",
        "sunset-background": "#009FBD",
        "sunset-accent": "#77037B",
        "vintageGarden-primary": "#2D4659",
        "vintageGarden-background": "#FDFBDA",
        "vintageGarden-accent": "#819F7F",
        customOrange: "#FF7315",
        vintageGardenPrimary: "#2D4659",
        vintageGardenBackground: "#FDFBDA",
        vintageGardenAccent: "#819F7F",
        cosmicSymphonyPrimary: "#F0EB8D",
        cosmicSymphonyBackground: "#413543",
        cosmicSymphonyAccent: "#8F43EE",
        rusticCharmPrimary: "#EA5455",
        rusticCharmBackground: "#F9F5EB",
        rusticCharmAccent: "#002B5B",
        sunsetSerenadePrimary: "#210062",
        sunsetSerenadeBackground: "#009FBD",
        sunsetSerenadeAccent: "#77037B",
        industrialChicPrimary: "#F0F0F0",
        industrialChicBackground: "#F45050",
        industrialChicAccent: "#F9D949",
        blackoutNeutralsPrimary: "#222222",
        blackoutNeutralsBackground: "#F3EFE0",
        blackoutNeutralsAccent: "#22A39F",
        vibrantSpectrumPrimary: "#4A0E5C",
        vibrantSpectrumBackground: "#CCF0C3",
        vibrantSpectrumAccent: "#BCA3CA",
        coastalSunrisePrimary: "#FFBE00",
        coastalSunriseBackground: "#E6E6D4",
        coastalSunriseAccent: "#005874",
        oceanicSerenityPrimary: "#CBE4DE",
        oceanicSerenityBackground: "#2E4F4F",
        oceanicSerenityAccent: "#2C3333",
      },
      fontFamily: {
        "plex-mono": ["IBM Plex Mono"],
        stint: ["Stint Ultra Condensed, sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
};

export default config;
