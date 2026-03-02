// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
ssr: true,
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  app: {
    head: {
      title: 'DSP CRM | All-in-One Client Portal for Digital Agencies',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'DSP CRM is a complete client portal software for European digital agencies. Manage billing, projects, onboarding, and reporting efficiently with ease.'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        },
        { rel: 'canonical', href: 'https://dspcrm.com/' },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'https://admin.dspcrm.com/wp-content/uploads/2026/02/Fav-icon-dsp.svg'
        }
      ]
    }
  },

  css: [
    '~/assets/css/main.css'
  ]
})