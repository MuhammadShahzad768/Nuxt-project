/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './error.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.config.{js,ts}',
  ],

  safelist: [
    'mt-[170px]',
    'mb-[60px]',
    'max-w-[820px]',
    'rotate-[-5deg]',
    'shadow-[6px_6px_2px_0px_#00296B]',
    'border-[#00296B]',
    'text-[#00296b]',
    'bg-[#ffffff]',
    'w-[40%]',
    'w-[70%]',
    'gap-[30px]',
    'rounded-[10px]'
  ],

  theme: {
    extend: {},
  },

  plugins: [],
}