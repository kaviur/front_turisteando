import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ff0178",
          "primary-content": "#f3f4f6",
          secondary: "#ff5b03",
          accent: "#7C8DB0",
          neutral: "#f3f4f6",
          "base-100": "#f3f4f6",
          info: "#67e8f9",
          success: "#34d399",
          warning: "#fde047",
          error: "#f43f5e",
        },
      },
    ],
  },
  theme: {
    extend: {
      height: {
        '128': '32rem', // Adjust the value as needed
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
