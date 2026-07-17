// 1. Dynamic routes ko top-level par fetch karein
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

// 2. Nuxt Config Export
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  ssr: true,

  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-gtag',
    '@nuxtjs/sitemap',
  ],
 site: {
    url: 'https://dspcrm.com',
    name: 'DSPCRM',
  },
  sitemap: {
    urls: [
      { loc: '/', priority: 1.0 },

      { loc: '/pricing', priority: 0.9 },
      { loc: '/features/client-portal/', priority: 0.9 },
      { loc: '/features/billing/', priority: 0.9 },
      { loc: '/features/crm/', priority: 0.9 },
      { loc: '/features/forms-builder/', priority: 0.9 },
      { loc: '/features/helpdesk/', priority: 0.9 },
      { loc: '/features/projects/', priority: 0.9 },
      { loc: '/features/referrals', priority: 0.9 },
      { loc: '/features/analytics/', priority: 0.9 },
      { loc: '/features/api/', priority: 0.9 },

      { loc: '/link-building-agencies/', priority: 0.8 },
      { loc: '/content-agencies/', priority: 0.8 },
      { loc: '/local-seo-agencies/', priority: 0.8 },
      { loc: '/social-media-marketing-agencies/', priority: 0.8 },
      { loc: '/seo-agencies/', priority: 0.8 },
      { loc: '/video-editing-agencies/', priority: 0.8 },

      { loc: '/integrations/', priority: 0.8 },
      { loc: '/onboarding/', priority: 0.8 },
      { loc: '/tools/', priority: 0.8 },
      { loc: '/case-studies/', priority: 0.8 },
      { loc: '/blogs/', priority: 0.8 },
      { loc: '/glossary/', priority: 0.8 },

      { loc: '/tools/agency-valuation-calculator/', priority: 0.7 },
      { loc: '/tools/pricing-matrix-calculator/', priority: 0.7 },
      { loc: '/tools/clv-calculator/', priority: 0.7 },
      { loc: '/tools/growth-calculator/', priority: 0.7 },
      { loc: '/tools/growth-ceiling/', priority: 0.7 },
      { loc: '/tools/client-portal-roi-calculator/', priority: 0.7 },
      { loc: '/tools/agency-pricing-calculator/', priority: 0.7 },
      { loc: '/tools/retainer-calculator/', priority: 0.7 },
      { loc: '/tools/package-profitability-calculator/', priority: 0.7 },
      { loc: '/tools/capacity-calculator/', priority: 0.7 },
      { loc: '/tools/package-optimizer/', priority: 0.7 },
      { loc: '/tools/standardization-roi/', priority: 0.7 },
      { loc: '/tools/simple-clv/', priority: 0.7 },
      { loc: '/tools/scalability-calculator/', priority: 0.7 },
      { loc: '/tools/package-development-calculator/', priority: 0.7 },
      { loc: '/tools/team-cost-calculator/', priority: 0.7 },
      { loc: '/tools/bundle-pricing-calculator', priority: 0.7 },

      { loc: '/about/', priority: 0.6 },
      { loc: '/contact-us/', priority: 0.6 },
      { loc: '/branding/', priority: 0.5 },

      { loc: '/terms/', priority: 0.3 },
      { loc: '/privacy-policy/', priority: 0.3 },
    ],
  },
  // nuxt-gtag settings (Manual script ki zaroorat nahi hai)
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
  }, // FIX: Bracket sahi tarah close kiya taake app block andar rahe

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
        // NOTE: Gtag scripts yahan se remove kar diye hain kyunki 'nuxt-gtag' module already enabled hai.
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