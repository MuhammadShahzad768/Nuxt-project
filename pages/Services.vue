<!--
  /pages/services.vue  (Nuxt 3 + Vue 3)

  Notes for Shahzad:
  - Navbar/Footer NOT included here — they should already come from your
    default layout (layouts/default.vue), so this page just renders inside it.
  - Colors/fonts are set as CSS variables at the top of <style scoped> so you
    can drop in your real design tokens (from your global CSS / tailwind
    config) in 2 minutes if these don't match exactly — I inspected the live
    site's content/structure but not the compiled CSS, so treat the hex
    values below as close SaaS-standard defaults, not pixel-perfect extracts.
  - No external icon library dependency — all icons are inline SVG so this
    file works standalone. Swap the <IconX> components for your existing
    icon set if you have one (e.g. lucide) to keep bundle size down.
  - Fully responsive: 3 col -> 2 col -> 1 col grids, hero stacks on mobile.
-->

<script setup>
useSeoMeta({
  title: 'Services | DSP CRM — Sell, Service, Scale in One Platform',
  description:
    'Manage clients, billing, projects, support, and growth from one powerful platform built for modern service businesses.',
})

const services = [
  {
    icon: 'portal',
    title: 'Client Portal',
    desc: 'Give your clients a branded space to manage orders, projects, files, messages, and updates.',
    link: '/features/client-portal',
  },
  {
    icon: 'crm',
    title: 'CRM',
    desc: 'Manage leads, contacts, customers, and client relationships from one centralized platform.',
    link: '/features/crm',
  },
  {
    icon: 'billing',
    title: 'Billing & Invoicing',
    desc: 'Create invoices, manage subscriptions, collect payments, and simplify your entire billing process.',
    link: '/features/billing',
  },
  {
    icon: 'forms',
    title: 'Forms & Builder',
    desc: 'Create powerful forms for leads, onboarding, orders, applications, and client intake.',
    link: '/features/forms-builder',
  },
  {
    icon: 'helpdesk',
    title: 'Helpdesk',
    desc: 'Manage customer support, tickets, conversations, and client requests in one organized workspace.',
    link: '/features/helpdesk',
  },
  {
    icon: 'projects',
    title: 'Projects & Tasks',
    desc: 'Plan projects, assign tasks, track progress, and keep your entire team aligned.',
    link: '/features/projects',
  },
  {
    icon: 'referrals',
    title: 'Referrals',
    desc: 'Create referral programs and turn your existing customers and partners into a growth channel.',
    link: '/features/referrals',
  },
  {
    icon: 'analytics',
    title: 'Analytics',
    desc: 'Understand your business with useful insights into clients, revenue, sales, and performance.',
    link: '/features/analytics',
  },
  {
    icon: 'whitelabel',
    title: 'White Label',
    desc: 'Deliver a fully branded experience and build your own professional client-facing service platform.',
    link: '/features/white-label',
  },
  {
    icon: 'integrations',
    title: 'Integrations',
    desc: 'Connect DSPCRM with the tools and platforms your business already uses.',
    link: '/integrations',
  },
]

const featured = [
  {
    key: 'portal',
    heading: 'Give Your Clients a Better Experience',
    points: [
      'Branded client portal',
      'Client communication',
      'File sharing',
      'Orders and updates',
      'Centralized client information',
    ],
    cta: 'Explore Client Portal',
    ctaLink: '/features/client-portal',
    reverse: false,
  },
  {
    key: 'billing',
    heading: 'Get Paid Without the Hassle',
    points: ['Invoices', 'Subscriptions', 'Payments', 'Checkout', 'Billing history'],
    cta: 'Explore Billing',
    ctaLink: '/features/billing',
    reverse: true,
  },
  {
    key: 'crm',
    heading: 'Build Better Client Relationships',
    points: [
      'Contact management',
      'Lead management',
      'Client history',
      'Sales pipeline',
      'Centralized customer data',
    ],
    cta: 'Explore CRM',
    ctaLink: '/features/crm',
    reverse: false,
  },
  {
    key: 'projects',
    heading: 'Manage Your Work From One Place',
    points: [
      'Project management',
      'Task management',
      'Team assignments',
      'Deadlines',
      'Progress tracking',
    ],
    cta: 'Explore Projects',
    ctaLink: '/features/projects',
    reverse: true,
  },
  {
    key: 'helpdesk',
    heading: 'Support Your Clients Better',
    points: [
      'Support tickets',
      'Client conversations',
      'Team management',
      'Ticket status',
      'Client history',
    ],
    cta: 'Explore Helpdesk',
    ctaLink: '/features/helpdesk',
    reverse: false,
  },
]

const advantages = [
  'Manage everything from one place',
  'Improve client experience',
  'Automate repetitive work',
  'Simplify billing',
  'Organize projects',
  'Improve team productivity',
  'Scale your services',
  'Create a professional branded experience',
]

const useCases = [
  { icon: 'seo', title: 'SEO Agencies', desc: 'Sell audits, outreach, and ongoing packages.', link: '/seo-agencies' },
  { icon: 'marketing', title: 'Digital Marketing Agencies', desc: 'Run campaigns, retainers, and client reporting in one hub.', link: '/use-cases' },
  { icon: 'content', title: 'Content Agencies', desc: 'Sell content packages and guide your writers.', link: '/content-agencies' },
  { icon: 'social', title: 'Social Media Agencies', desc: 'Sell and deliver monthly campaigns with zero hassle.', link: '/social-media-marketing-agencies' },
  { icon: 'links', title: 'Link Building Agencies', desc: 'Manage catalogs, orders, and delivery in one hub.', link: '/link-building-agencies' },
  { icon: 'local', title: 'Local SEO Agencies', desc: 'Market GMB services and ongoing website packages.', link: '/local-seo-agencies' },
  { icon: 'video', title: 'Video Agencies', desc: 'Offer unlimited edits or monthly episode packages.', link: '/video-editing-agencies' },
  { icon: 'freelance', title: 'Freelancers', desc: 'Run a lean, branded operation without the overhead.', link: '/use-cases' },
]
</script>

<template>
  <main class="services-page">
    <!-- ============ HERO ============ -->
    <section class="hero">
      <div class="container hero__grid">
        <div class="hero__content">
          <span class="eyebrow">POWERFUL TOOLS FOR SERVICE BUSINESSES</span>
          <h1 class="hero__title">Everything You Need to Run Your Service Business</h1>
          <p class="hero__desc">
            Manage clients, billing, projects, support, and growth from one powerful
            platform built for modern service businesses.
          </p>
          <div class="hero__actions">
            <NuxtLink to="/trial" class="btn btn--primary">Get Started</NuxtLink>
            <NuxtLink to="/book-a-demo" class="btn btn--ghost">Book a Demo</NuxtLink>
          </div>
        </div>

        <div class="hero__visual" aria-hidden="true">
          <div class="mock-dashboard">
            <div class="mock-dashboard__bar">
              <span></span><span></span><span></span>
            </div>
            <div class="mock-dashboard__row">
              <div class="mock-card mock-card--tall"></div>
              <div class="mock-dashboard__col">
                <div class="mock-card"></div>
                <div class="mock-card"></div>
              </div>
            </div>
            <div class="mock-dashboard__row mock-dashboard__row--wide">
              <div class="mock-card mock-card--wide"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ SERVICES GRID ============ -->
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Everything Your Business Needs</h2>
          <p class="section__desc">
            Powerful tools designed to help you sell, manage, deliver, and scale your services.
          </p>
        </div>

        <div class="services-grid">
          <NuxtLink
            v-for="s in services"
            :key="s.title"
            :to="s.link"
            class="service-card"
          >
            <div class="service-card__icon">
              <IconIllustration :name="s.icon" />
            </div>
            <h3 class="service-card__title">{{ s.title }}</h3>
            <p class="service-card__desc">{{ s.desc }}</p>
            <span class="service-card__arrow">
              Learn more
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8h9m0 0L8.5 4m4 4L8.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ============ FEATURED SERVICES (alternating) ============ -->
    <section
      v-for="(f, i) in featured"
      :key="f.key"
      class="feature-row"
      :class="{ 'feature-row--reverse': f.reverse }"
    >
      <div class="container feature-row__grid">
        <div class="feature-row__visual" aria-hidden="true">
          <div class="mock-panel">
            <div class="mock-panel__bar"><span /><span /><span /></div>
            <div class="mock-panel__lines">
              <div class="mock-line" v-for="n in 4" :key="n" :style="{ width: 90 - n * 12 + '%' }" />
            </div>
          </div>
        </div>

        <div class="feature-row__content">
          <h2 class="feature-row__heading">{{ f.heading }}</h2>
          <ul class="feature-row__points">
            <li v-for="p in f.points" :key="p">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="var(--accent-soft)" />
                <path d="M5.5 9.2l2.2 2.2 4.8-5" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ p }}
            </li>
          </ul>
          <NuxtLink :to="f.ctaLink" class="btn btn--primary btn--sm">{{ f.cta }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ============ WHY DSPCRM ============ -->
    <section class="section section--tinted">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">One Platform. Less Complexity.</h2>
        </div>

        <div class="advantages-grid">
          <div v-for="a in advantages" :key="a" class="advantage-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="var(--accent)" />
              <path d="M6 10.2l2.4 2.4 5.2-5.6" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ a }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ AGENCY USE CASES ============ -->
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Built For Modern Service Businesses</h2>
        </div>

        <div class="usecases-grid">
          <NuxtLink
            v-for="u in useCases"
            :key="u.title"
            :to="u.link"
            class="usecase-card"
          >
            <div class="usecase-card__icon">
              <IconIllustration :name="u.icon" small />
            </div>
            <div class="usecase-card__text">
              <h3>{{ u.title }}</h3>
              <p>{{ u.desc }}</p>
            </div>
            <svg class="usecase-card__arrow" width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 8h9m0 0L8.5 4m4 4L8.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ============ FINAL CTA ============ -->
    <section class="final-cta">
      <div class="container final-cta__inner">
        <h2>Ready to Simplify Your Service Business?</h2>
        <p>
          Bring your clients, projects, billing, support, and operations together in one
          powerful platform.
        </p>
        <div class="final-cta__actions">
          <NuxtLink to="/trial" class="btn btn--primary">Get Started</NuxtLink>
          <NuxtLink to="/book-a-demo" class="btn btn--outline-light">Book a Demo</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
/*
  Lightweight inline-icon component. Kept in the same file so the page is
  drop-in ready. If you already have an icon set (lucide-vue-next etc.) in
  the project, delete this block and swap <IconIllustration> for your
  existing component/icon names — the icon prop names above already map
  1:1 to sensible icon names (portal, crm, billing, forms, helpdesk,
  projects, referrals, analytics, whitelabel, integrations, seo, marketing,
  content, social, links, local, video, freelance).
*/
import { h } from 'vue'

const paths = {
  portal: 'M4 4h16v4H4zM4 10h7v10H4zM13 10h7v6h-7z',
  crm: 'M4 20h4V10H4zM10 20h4V4h-4zM16 20h4v-8h-4z',
  billing: 'M4 6h16v12H4zM4 10h16M8 15h4',
  forms: 'M6 3h9l3 3v15H6zM9 12h6M9 16h6',
  helpdesk: 'M4 5h16v10H8l-4 4z',
  projects: 'M4 5h6v6H4zM14 5h6v6h-6zM4 13h6v6H4zM14 13h6v6h-6z',
  referrals: 'M8 12a4 4 0 100-8 4 4 0 000 8zM16 20a4 4 0 100-8 4 4 0 000 8zM10.5 10.5l3.5 5',
  analytics: 'M4 20V10M11 20V4M18 20v-7',
  whitelabel: 'M12 3l8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4',
  integrations: 'M9 3h6v6H9zM9 15h6v6H9zM3 9h6v6H3zM15 9h6v6h-6z',
  seo: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.35-4.35',
  marketing: 'M4 14l6-6 4 4 6-6M20 6h-4v4',
  content: 'M6 4h9l3 3v13H6zM9 12h6M9 16h6',
  social: 'M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.6 13.5l6.8-4M8.6 10.5l6.8 4',
  links: 'M9 15l6-6M8 12a4 4 0 010-5.7l2-2a4 4 0 015.7 5.7M16 12a4 4 0 010 5.7l-2 2a4 4 0 01-5.7-5.7',
  local: 'M12 21s-7-6.1-7-11a7 7 0 1114 0c0 4.9-7 11-7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  video: 'M4 6h12v12H4zM16 10l5-3v10l-5-3z',
  freelance: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
}

export default {
  name: 'IconIllustration',
  props: {
    name: { type: String, required: true },
    small: { type: Boolean, default: false },
  },
  render() {
    const size = this.small ? 22 : 26
    return h(
      'svg',
      {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
      },
      [
        h('path', {
          d: paths[this.name] || paths.portal,
          stroke: 'currentColor',
          'stroke-width': 1.6,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ]
    )
  },
}
</script>

<style scoped>
/* =========================================================
   DESIGN TOKENS — replace with your real values from
   assets/css/main.css or tailwind.config.js if these differ.
   ========================================================= */
.services-page {
  --ink: #0f1222;
  --ink-soft: #565b74;
  --paper: #ffffff;
  --tint: #f6f7fb;
  --border: #e7e8f0;
  --accent: #4f46e5;      /* primary brand indigo */
  --accent-dark: #3f37c9;
  --accent-soft: #eeecfd;
  --radius-lg: 20px;
  --radius-md: 14px;
  --radius-sm: 10px;
  --shadow-sm: 0 1px 2px rgba(15, 18, 34, 0.04), 0 1px 1px rgba(15, 18, 34, 0.03);
  --shadow-md: 0 12px 30px -12px rgba(15, 18, 34, 0.18);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--ink);
  background: var(--paper);
}

.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---------- shared ---------- */
.eyebrow {
  display: inline-block;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 18px;
}

.section {
  padding: 88px 0;
}
.section--tinted {
  background: var(--tint);
}
.section__head {
  max-width: 620px;
  margin-bottom: 48px;
}
.section__title {
  font-size: clamp(28px, 3.2vw, 38px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
}
.section__desc {
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 24px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, opacity 0.15s ease;
  border: 1px solid transparent;
  white-space: nowrap;
}
.btn--sm {
  padding: 11px 20px;
  font-size: 14.5px;
}
.btn--primary {
  background: var(--accent);
  color: #fff;
  box-shadow: var(--shadow-sm);
}
.btn--primary:hover {
  background: var(--accent-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.btn--ghost {
  background: var(--paper);
  color: var(--ink);
  border-color: var(--border);
}
.btn--ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.btn--outline-light {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}
.btn--outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ---------- hero ---------- */
.hero {
  padding: 100px 0 80px;
  background: linear-gradient(180deg, var(--tint) 0%, var(--paper) 100%);
}
.hero__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: center;
}
.hero__title {
  font-size: clamp(32px, 4.2vw, 50px);
  line-height: 1.12;
  letter-spacing: -0.02em;
  font-weight: 700;
  margin: 0 0 20px;
}
.hero__desc {
  font-size: 18px;
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 480px;
  margin: 0 0 32px;
}
.hero__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

/* decorative dashboard mock */
.hero__visual {
  display: flex;
  justify-content: center;
}
.mock-dashboard {
  width: 100%;
  max-width: 460px;
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 18px;
}
.mock-dashboard__bar {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
}
.mock-dashboard__bar span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--border);
}
.mock-dashboard__row {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}
.mock-dashboard__col {
  display: grid;
  gap: 12px;
}
.mock-card {
  background: var(--tint);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  min-height: 60px;
}
.mock-card--tall {
  min-height: 132px;
  background: var(--accent-soft);
  border-color: var(--accent-soft);
}
.mock-card--wide {
  min-height: 70px;
}
.mock-dashboard__row--wide {
  grid-template-columns: 1fr;
}

/* ---------- services grid ---------- */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.service-card {
  display: flex;
  flex-direction: column;
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 26px;
  text-decoration: none;
  color: inherit;
  min-height: 220px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}
.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: transparent;
}
.service-card__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--accent-soft);
  color: var(--accent);
  margin-bottom: 18px;
}
.service-card__title {
  font-size: 18px;
  font-weight: 650;
  margin: 0 0 10px;
}
.service-card__desc {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin: 0 0 18px;
  flex-grow: 1;
}
.service-card__arrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
}
.service-card__arrow svg {
  transition: transform 0.18s ease;
}
.service-card:hover .service-card__arrow svg {
  transform: translateX(3px);
}

/* ---------- featured alternating rows ---------- */
.feature-row {
  padding: 72px 0;
  border-top: 1px solid var(--border);
}
.feature-row__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.feature-row--reverse .feature-row__grid {
  direction: rtl;
}
.feature-row--reverse .feature-row__grid > * {
  direction: ltr;
}
.feature-row__heading {
  font-size: clamp(24px, 2.6vw, 32px);
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 22px;
}
.feature-row__points {
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
  display: grid;
  gap: 14px;
}
.feature-row__points li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15.5px;
  color: var(--ink);
}

.mock-panel {
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 22px;
}
.mock-panel__bar {
  display: flex;
  gap: 6px;
  margin-bottom: 18px;
}
.mock-panel__bar span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
}
.mock-panel__lines {
  display: grid;
  gap: 12px;
}
.mock-line {
  height: 12px;
  border-radius: 6px;
  background: var(--tint);
}
.mock-line:first-child {
  background: var(--accent-soft);
}

/* ---------- advantages ---------- */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px 32px;
}
.advantage-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15.5px;
  font-weight: 500;
}

/* ---------- use cases ---------- */
.usecases-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.usecase-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 22px;
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.18s ease, transform 0.18s ease;
}
.usecase-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.usecase-card__icon {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
}
.usecase-card__text {
  flex-grow: 1;
}
.usecase-card__text h3 {
  font-size: 15.5px;
  font-weight: 650;
  margin: 0 0 4px;
}
.usecase-card__text p {
  font-size: 13.5px;
  color: var(--ink-soft);
  margin: 0;
  line-height: 1.5;
}
.usecase-card__arrow {
  flex-shrink: 0;
  color: var(--ink-soft);
}

/* ---------- final CTA ---------- */
.final-cta {
  background: var(--ink);
  color: #fff;
  padding: 90px 0;
}
.final-cta__inner {
  text-align: center;
  max-width: 620px;
}
.final-cta h2 {
  font-size: clamp(28px, 3.4vw, 38px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 16px;
}
.final-cta p {
  font-size: 16.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 32px;
}
.final-cta__actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .usecases-grid {
    grid-template-columns: 1fr;
  }
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }
  .hero {
    padding: 64px 0 48px;
    text-align: center;
  }
  .hero__desc {
    margin-left: auto;
    margin-right: auto;
  }
  .hero__actions {
    justify-content: center;
  }
  .feature-row__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .feature-row--reverse .feature-row__grid {
    direction: ltr;
  }
  .feature-row--reverse .feature-row__visual {
    order: -1;
  }
}

@media (max-width: 640px) {
  .section {
    padding: 56px 0;
  }
  .services-grid {
    grid-template-columns: 1fr;
  }
  .service-card {
    min-height: unset;
  }
  .btn {
    width: 100%;
  }
  .hero__actions {
    flex-direction: column;
  }
  .final-cta__actions {
    flex-direction: column;
  }
}
</style>