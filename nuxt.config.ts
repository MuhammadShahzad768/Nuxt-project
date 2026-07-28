
const getDynamicRoutes = async () => {
  try {
    const [pages, posts] = await Promise.all([
      fetch('https://admin.dspcrm.com/wp-json/wp/v2/pages?per_page=100').then(r => r.json()),
      fetch('https://admin.dspcrm.com/wp-json/wp/v2/posts?per_page=100').then(r => r.json())
    ])

    const pageRoutes = Array.isArray(pages) ? pages.map((page: any) => `/${page.slug}`) : []
    const postRoutes = Array.isArray(posts) ? posts.map((post: any) => `/blog/${post.slug}`) : []

    return [...pageRoutes, ...postRoutes]
  } catch (error) {
    console.error('Routes fetch karne mein error aaya:', error)
    return []
  }
}

const dynamicRoutes = await getDynamicRoutes()
const today = new Date().toISOString()

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
      failOnError: false,
      routes: [
        '/features/api/',
        ...dynamicRoutes
      ]
    }
  },

  compressPublicAssets: true,

  routeRules: {
    '/_nuxt/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    },
    '/**': {
      swr: 3600,
      headers: {
        'Cache-Control': 'public, max-age=3600'
      }
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
          content: 'DSP CRM default description' // Fixed typo 'defaultd'
        }
      ],

      script: [
        {
          src: 'https://admin.dspcrm.com/wp-content/plugins/mega-main-menu/js/mega-main-menu.js',
          defer: true,
          tagPosition: 'bodyClose'
        },
        {
          src: "https://www.google.com/recaptcha/api.js",
          async: true,
          defer: true
        }
       
      ],

      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'https://admin.dspcrm.com/wp-content/uploads/2026/02/Fav-icon-dsp.svg'
        },
        {
          rel: 'preload',
          href: '/_nuxt/fa-brands-400.BP5tdqmh.woff2', 
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],

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