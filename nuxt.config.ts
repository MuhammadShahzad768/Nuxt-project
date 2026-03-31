export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  ssr: true,

  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-gtag',
  ],

  gtag: {
    id: 'G-XWL8VTL6T8'
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false
    }
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
      const pages: any = await fetch(
        'https://admin.dspcrm.com/wp-json/wp/v2/pages?per_page=100'
      ).then(r => r.json())

      const slugs = pages.map((p: any) => `/${p.slug}`)

      nitroConfig.prerender!.routes = ['/', ...slugs]
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },

      // ✅ KEEP ONLY essentials here
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // fallback only (will be overridden)
        {
          name: 'description',
          content: 'DSP CRM default description'
        }
      ],

      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-XWL8VTL6T8',
          async: true
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XWL8VTL6T8');
          `
        }
      ],

      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        },
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