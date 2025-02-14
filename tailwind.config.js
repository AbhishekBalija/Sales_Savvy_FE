
// import daisyui from "daisyui";

// /** @type {import('tailwindcss').Config} */
// import colors from "tailwindcss/colors";
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}", // Add this to include your source files
//     "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}", // Keep this if needed
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         rostey: ['Rostey', 'sans-serif'],
//         superwoobly: ['SuperWoobly', 'sans-serif'],
//         rekalgera: ['Rekalgera', 'sans-serif'],
//       },
//       colors: {
//         background: colors.white,
//         foreground: colors.gray[600],
//         muted: colors.gray[200],
//         primary: {
//           lighter: colors.gray[200],
//           DEFAULT: colors.gray[800],
//           dark: colors.gray[950],
//           foreground: colors.white,
//         },
//         secondary: {
//           lighter: colors.indigo[200],
//           DEFAULT: colors.indigo[500],
//           dark: colors.indigo[700],
//           foreground: colors.white,
//         },
//         red: {
//           lighter: colors.rose[200],
//           DEFAULT: colors.rose[500],
//           dark: colors.rose[700],
//         },
//         orange: {
//           lighter: colors.amber[200],
//           DEFAULT: colors.amber[500],
//           dark: colors.amber[700],
//         },
//         blue: {
//           lighter: colors.sky[200],
//           DEFAULT: colors.sky[500],
//           dark: colors.sky[700],
//         },
//         green: {
//           lighter: colors.emerald[200],
//           DEFAULT: colors.emerald[500],
//           dark: colors.emerald[700],
//         },
//       },
//       // Custom classes for toast positioning
//       spacing: {
//         "toast-top": "20px", // Distance from the top of the screen
//       },
//       keyframes: {
//         "slide-down": {
//           from: {
//             opacity: "0",
//             transform: "translateY(-20px)",
//           },
//           to: {
//             opacity: "1",
//             transform: "translateY(0)",
//           },
//         },
//       },
//       animation: {
//         "slide-down": "slide-down 0.3s ease-out", // Animation for toast
//       },
//     },
//   },
//   plugins: [daisyui,("@tailwindcss/forms")],
// };