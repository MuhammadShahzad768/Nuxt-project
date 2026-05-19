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
    },
    // ✅ ADD: Compression
    compressPublicAssets: true,
    // ✅ ADD: Route rules for caching
    routeRules: {
      '/_nuxt/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      }
    }
  },

  // ✅ ADD: Global route rules for all file types
  routeRules: {
    // Nuxt build files (JS, CSS) - cache forever
    '/_nuxt/**': { 
      headers: { 
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff'
      } 
    },
    
    // Assets folder
    '/assets/**': { 
      headers: { 
        'Cache-Control': 'public, max-age=31536000, immutable' 
      } 
    },

    // Images, fonts, and other static assets
    '/**/*.{png,jpg,jpeg,gif,webp,svg,ico,woff,woff2,ttf,otf,eot}': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    },

    // Pages - 1 hour cache with background revalidation
    '/**': { 
      swr: 3600, // stale-while-revalidate
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400'
      }
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

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'DSP CRM defaultd description'
        }
      ],

      script: [
         {
          src: "https://www.google.com/recaptcha/api.js",
          async: true,
          defer: true
        },
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
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'https://admin.dspcrm.com/wp-content/uploads/2026/02/Fav-icon-dsp.svg'
        }
      ]
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  // ✅ ADD: Vite optimization for better chunking
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'swiper': ['swiper'],
            'aos': ['aos']
          }
        }
      }
    }
  }
})