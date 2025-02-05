
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project structure
  ],
  theme: {
    extend: {
      // Custom classes for toast positioning
      spacing: {
        "toast-top": "20px", // Distance from the top of the screen
      },
      keyframes: {
        "slide-down": {
          from: {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "slide-down": "slide-down 0.3s ease-out", // Animation for toast
      },
    },
  },
  plugins: [daisyui],
};