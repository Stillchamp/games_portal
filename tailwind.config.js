/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#dceeff',
          200: '#baddff',
          300: '#8fc6ff',
          400: '#5daaff',
          500: '#2b8dff',
          600: '#0f6fe6',
          700: '#0a57b4',
          800: '#0a478f',
          900: '#0b3b73',
        },
        accent: '#f76b6c',
        slate: {
          25: '#f8f9fb',
          50: '#f3f4f6',
          100: '#e7e9ed',
          200: '#cfd4dd',
          300: '#b0b8c6',
          400: '#8590a3',
          500: '#5b6980',
          600: '#445066',
          700: '#323b4c',
          800: '#202632',
          900: '#101319',
        },
        success: '#43c66c',
        warning: '#fbbf24',
        inactive: '#8d95a5',
      },
      boxShadow: {
        card: '0 10px 30px rgba(14, 89, 136, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
