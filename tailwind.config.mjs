/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      willChange: {
        'scroll-position': 'scroll-position',
      },
      animation: {
        'gpu': 'transform translateZ(0)', // 하드웨어 가속 강제
      },
      transitionProperty: {
        'none': 'none',
      }
    },
  },
  plugins: [],
}