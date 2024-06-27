/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        panda: {
          primary: "#ec4899",
          secondary: "#4ade80",
          accent: "#f87171",
          neutral: "#38bdf8",
          "base-100": "#f3f4f6",
          info: "#ff00ff",
          success: "#84cc16",
          warning: "#ca8a04",
          error: "#ef4444",
        },
      },
      "forest",
    ],
  },
};
