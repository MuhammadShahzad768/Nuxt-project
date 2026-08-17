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
  padding: 150px 0 80px;
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
  text-decoration: none;
  color: inherit;
  min-height: 220px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}
.clients_box:hover {
  background-color: #00296B !important;
  color: white !important;
}
/* .service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: transparent;
} */
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
<template>
    <main class="services-page">
        <section class="content-img-section px-6 xl:px-4 custom_family bg-[#DFDFDF] xl:pt-[150px]">
        <div class="max-w-7xl mx-auto rounded-3xl p-0 xl:p-6 md:p-0 seo-agency inner_banner aos-init aos-animate" data-aos="fade-up">

            <div class="text-center">

                                <h1 data-v-442611b3="" class="text-[var(--bg-custom-color)] font-bold text-center m-auto xl:text-[42px] text-[22px] xl:leading-[55px] leading-[30px] max-w-4xl px-4">
                    <span data-v-442611b3="" class="font-medium">  POWERFUL TOOLS FOR </span><br data-v-442611b3="">
                   SERVICE BUSINESSES              </h1>
                
                
                                    <img src="http://admin.dspcrm.com/wp-content/uploads/2026/06/Dashboard-.svg" alt="Banner Image" class="xl:mt-12 xl:max-w-[85%] max-w-[95%] mt-12 relative m-auto rounded-2xl drop-shadow-2xl aos-init aos-animate" data-aos="zoom-in">
                
            </div>

                            <div class="w-full logos_section hidden flex flex-wrap justify-between mt-10 pb-10">
                                            <img class="w-[108px] h-auto object-contain" src="http://admin.dspcrm.com/wp-content/uploads/2026/03/wp-speed-fix.png" alt="Client Logo">
                                            <img class="w-[108px] h-auto object-contain" src="http://admin.dspcrm.com/wp-content/uploads/2026/03/word-agents.png" alt="Client Logo">
                                            <img class="w-[108px] h-auto object-contain" src="http://admin.dspcrm.com/wp-content/uploads/2026/03/ranked.png" alt="Client Logo">
                                            <img class="w-[108px] h-auto object-contain" src="http://admin.dspcrm.com/wp-content/uploads/2026/03/seo-bros.png" alt="Client Logo">
                                            <img class="w-[108px] h-auto object-contain" src="http://admin.dspcrm.com/wp-content/uploads/2026/03/get-me-link.png" alt="Client Logo">
                                            <img class="w-[108px] h-auto object-contain" src="http://admin.dspcrm.com/wp-content/uploads/2026/03/loganix.png" alt="Client Logo">
                                            <img class="w-[108px] h-auto object-contain" src="http://admin.dspcrm.com/wp-content/uploads/2026/03/amw.png" alt="Client Logo">
                                    </div>
            
                            <div class="local-seo_button m-auto max-w-[500px] flex flex-col items-center gap-5 justify-center lg:pb-16 pt-8 aos-init aos-animate" data-aos="fade-up">

                    <a href="/book-a-demo" target="_blank" rel="noopener noreferrer" class="max-w-[170px] transition-all duration-300 ease-in-out  md:block border-4 hover:bg-[#00296B] hover:border hover:text-white rounded-xl border-[var(--border-custom-color)] lg:py-4 lg:px-7 text-[#00296B] font-medium md:px-4 md:py-2 text-center py-3 px-3">
                        Book a Demo                    </a>

                    <p class="text-xl  md:block text-[var(--text-custom)] leading-tight">
                        Ready 
                        <a target="_blank" rel="noopener noreferrer" href="/book-a-demo" class="hover:underline font-bold">
                            Try it free
                        </a>
                    </p>

                </div>
            
        </div>
    </section>
   <!-- <section class="hero pt-[150px]">
      <div class="max-w-7xl mx-auto hero__grid">
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
    </section> -->
    <!-- ============ SERVICES GRID ============ -->
    <section class="section">
      <div class="max-w-7xl mx-auto">
        <!-- <div class="section__head">
          <h2 class="section__title">Everything Your Business Needs</h2>
          <p class="section__desc">
            Powerful tools designed to help you sell, manage, deliver, and scale your services.
          </p>
        </div> -->
        <div class="flex flex-col xl:max-w-[52%] w-full m-auto"><h2 class="xl:text-[45px] text-center text-[20px] text-[var(--bg-custom-color)] font-bold leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[70px] tracking-tight mb-0 aos-init aos-animate" data-aos="fade-up">Everything Your Business Needs</h2></div>
<p class="mt-[20px] xl:mt-[40px] max-w-[100%] xl:max-w-[36%] text-center text-[#999999] font-semibold text-base m-auto"> Powerful tools designed to help you sell, manage, deliver, and scale your services.</p>
        <div class="services-grid  mt-8 xl:mt-16  gap-[2%] gap-y-[20px] xl:gap-y-[30px] overflow-hidden">
         
        <NuxtLink
  v-for="s in services"
  :key="s.box_title"
  :to="s.link || `/features/${s.box_title.toLowerCase().replace(/ /g, '-')}/`"
  class="service-card"
>
  <div class="w-full group max-w-[100%] box-border bg-white overflow-hidden border border-[#999999] rounded-xl">

    <div class="clients_box pl-6 pr-6 pt-8 pb-4">

      <div class="flex items-baseline">

        <div class="relative h-[40px] w-[50px]">
          <div 
            class="relative h-[40px] w-[40px] group-hover:text-red-500"
            v-if="s.box_svg"
            v-html="s.box_svg"
          ></div>
           <div 
            class="relative h-[40px] w-[40px] group-hover:text-red-500"
            v-else
            
          >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78 78" class="w-10 h-10  text-white">   <path d="M69.0848 26.8632H8.88431C8.88431 27.1752 8.88431 27.4482 8.88431 27.7134C8.88431 39.4914 8.93891 51.2694 8.85311 63.0474C8.82971 66.5184 11.5129 69.1937 14.9761 69.1626C25.0225 69.069 35.0767 69.1313 45.1231 69.1313C46.5739 69.1313 47.5099 69.771 47.8531 70.9722C48.2353 72.3294 47.3306 73.7724 45.9422 73.9908C45.6145 74.0453 45.2869 74.0532 44.9515 74.0532C34.9519 74.0532 24.9523 74.061 14.9527 74.0532C9.33671 74.0532 5.11691 70.6056 4.10291 65.1768C3.96251 64.4124 3.95471 63.609 3.95471 62.8212C3.94691 50.4816 3.94691 38.142 3.95471 25.8024C3.95471 21.7074 3.89231 17.6124 4.04831 13.5252C4.23551 8.74377 8.69711 4.37577 13.4707 4.07937C14.1571 4.04037 14.8435 4.00917 15.5299 4.00917C31.3327 4.00917 47.1278 4.04037 62.9306 3.98577C68.3516 3.97017 72.1268 7.26957 73.3592 11.0526C73.757 12.2616 73.9754 13.5876 73.9832 14.859C74.03 24.96 74.0144 35.0532 74.0066 45.1542C74.0066 46.5738 73.4294 47.502 72.3452 47.8686C70.7384 48.4146 69.116 47.2524 69.0926 45.4818C69.0614 43.4226 69.0848 41.3634 69.0848 39.2964C69.0848 35.178 69.0848 31.0518 69.0848 26.8554V26.8632ZM69.0848 21.918C69.0848 19.4298 69.1004 17.0196 69.0848 14.6094C69.0536 11.4036 66.62 8.95437 63.422 8.95437C47.1355 8.93877 30.8491 8.93877 14.5627 8.95437C11.3569 8.95437 8.92331 11.4036 8.89211 14.6094C8.86871 16.848 8.89211 19.0866 8.89211 21.3252C8.89211 21.5202 8.92331 21.7152 8.94671 21.9258H69.0848V21.918Z"></path>   <path '="" d="M62.8991 67.7352C62.0411 68.8506 61.2065 69.8958 60.4109 70.98C59.3189 72.4542 57.8681 73.1172 56.0897 72.696C54.2723 72.267 53.3207 70.98 53.0087 69.1392C51.9869 63.219 50.9105 57.2988 49.8731 51.3786C49.5689 49.6392 49.9823 48.126 51.4955 47.0808C52.9385 46.0902 54.4517 46.1292 55.9493 46.9872C61.2299 50.0292 66.5027 53.079 71.7833 56.121C73.3979 57.057 74.2013 58.4298 73.9439 60.294C73.7021 62.0334 72.6257 63.0864 70.9799 63.609C69.6773 64.0224 68.3747 64.4358 66.9785 64.8882C67.1501 65.1456 67.2905 65.3718 67.4387 65.5824C68.4839 67.08 69.5447 68.5698 70.5821 70.083C71.4245 71.3076 71.1983 72.813 70.0829 73.6008C68.9207 74.4198 67.4387 74.1234 66.5495 72.8676C65.4887 71.3778 64.4513 69.8724 63.3983 68.3748C63.2579 68.172 63.1019 67.977 62.9147 67.7274L62.8991 67.7352ZM57.5561 66.6276C58.7105 65.1222 59.7401 63.8118 60.7385 62.4702C61.2611 61.7682 61.9007 61.3002 62.7431 61.0584C64.2017 60.6294 65.6447 60.1536 67.0955 59.6934C67.2671 59.6388 67.4231 59.553 67.6805 59.4438C63.4139 56.9868 59.2643 54.5922 55.0055 52.1352C55.8635 57.0024 56.6903 61.7136 57.5561 66.6354V66.6276Z"></path>   <path '="" d="M27.5807 15.5376C27.5183 16.887 26.4107 17.9088 25.0613 17.8698C23.7119 17.823 22.5965 16.6296 22.6745 15.3114C22.7525 13.9932 23.9225 12.909 25.2095 12.9636C26.5667 13.0182 27.6353 14.1882 27.5729 15.5376H27.5807Z"></path>   <path '="" d="M30.8411 15.4206C30.8411 14.0946 31.9331 12.9792 33.2513 12.9558C34.5695 12.9324 35.7551 14.1024 35.7551 15.4206C35.7551 16.7622 34.6007 17.8854 33.2435 17.862C31.9019 17.8386 30.8333 16.7544 30.8411 15.4128V15.4206Z"></path>   <path '="" d="M19.4377 15.4674C19.4221 16.809 18.3457 17.8776 16.9963 17.8776C15.6235 17.8776 14.5393 16.7778 14.5549 15.3894C14.5705 14.0556 15.6625 12.9636 16.9963 12.9636C18.3457 12.9636 19.4533 14.0946 19.4377 15.4674Z"></path> </svg>
        </div>
        </div>

        <p class="text-[#00296B] text-lg font-semibold group-hover:text-white">
          {{ s.title }}
        </p>

      </div>


      <p class="text-[#999999] text-sm mt-2 mb-16 max-w-[85%] font-medium group-hover:text-white">
        {{ s.desc }}
      </p>


     <img
  v-if="s.img"
  :src="s.img"
  :alt="s.box_title"
  width="800"
  height="500"
  class="w-full h-auto transition-all duration-300 min-h-[214px] max-h-[250px]"
/>

<img
  v-else
  src="http://admin.dspcrm.com/wp-content/uploads/2026/06/Dashboard-.svg"
  :alt="s.box_title"
  width="800"
  height="500"
  class="w-full h-auto transition-all duration-300 min-h-[214px] max-h-[250px]"
/>
    </div>

  </div>
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
      <div class="max-w-7xl mx-auto">
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
    <script setup>
//   const services = ref([]);
   useSeoMeta({
  title: 'Services | DSP CRM — Sell, Service, Scale in One Platform',
  description:
    'Manage clients, billing, projects, support, and growth from one powerful platform built for modern service businesses.',
})
// const { data, pending, error } = await useAsyncData('wpPageData', () => 
//   $fetch("https://admin.dspcrm.com/wp-json/myapi/v1/page/7", {
//     params: { timestamp: Date.now() }
//   })
// );

// watch(data, (newData) => {
//   services.value = newData?.acf?.clients?.clients_boxes || [];

//   console.log(services.value);
// }, { immediate: true });
const services = [
  {
    svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78 78" class="w-10 h-10  text-white">   <path d="M69.0848 26.8632H8.88431C8.88431 27.1752 8.88431 27.4482 8.88431 27.7134C8.88431 39.4914 8.93891 51.2694 8.85311 63.0474C8.82971 66.5184 11.5129 69.1937 14.9761 69.1626C25.0225 69.069 35.0767 69.1313 45.1231 69.1313C46.5739 69.1313 47.5099 69.771 47.8531 70.9722C48.2353 72.3294 47.3306 73.7724 45.9422 73.9908C45.6145 74.0453 45.2869 74.0532 44.9515 74.0532C34.9519 74.0532 24.9523 74.061 14.9527 74.0532C9.33671 74.0532 5.11691 70.6056 4.10291 65.1768C3.96251 64.4124 3.95471 63.609 3.95471 62.8212C3.94691 50.4816 3.94691 38.142 3.95471 25.8024C3.95471 21.7074 3.89231 17.6124 4.04831 13.5252C4.23551 8.74377 8.69711 4.37577 13.4707 4.07937C14.1571 4.04037 14.8435 4.00917 15.5299 4.00917C31.3327 4.00917 47.1278 4.04037 62.9306 3.98577C68.3516 3.97017 72.1268 7.26957 73.3592 11.0526C73.757 12.2616 73.9754 13.5876 73.9832 14.859C74.03 24.96 74.0144 35.0532 74.0066 45.1542C74.0066 46.5738 73.4294 47.502 72.3452 47.8686C70.7384 48.4146 69.116 47.2524 69.0926 45.4818C69.0614 43.4226 69.0848 41.3634 69.0848 39.2964C69.0848 35.178 69.0848 31.0518 69.0848 26.8554V26.8632ZM69.0848 21.918C69.0848 19.4298 69.1004 17.0196 69.0848 14.6094C69.0536 11.4036 66.62 8.95437 63.422 8.95437C47.1355 8.93877 30.8491 8.93877 14.5627 8.95437C11.3569 8.95437 8.92331 11.4036 8.89211 14.6094C8.86871 16.848 8.89211 19.0866 8.89211 21.3252C8.89211 21.5202 8.92331 21.7152 8.94671 21.9258H69.0848V21.918Z"></path>   <path '="" d="M62.8991 67.7352C62.0411 68.8506 61.2065 69.8958 60.4109 70.98C59.3189 72.4542 57.8681 73.1172 56.0897 72.696C54.2723 72.267 53.3207 70.98 53.0087 69.1392C51.9869 63.219 50.9105 57.2988 49.8731 51.3786C49.5689 49.6392 49.9823 48.126 51.4955 47.0808C52.9385 46.0902 54.4517 46.1292 55.9493 46.9872C61.2299 50.0292 66.5027 53.079 71.7833 56.121C73.3979 57.057 74.2013 58.4298 73.9439 60.294C73.7021 62.0334 72.6257 63.0864 70.9799 63.609C69.6773 64.0224 68.3747 64.4358 66.9785 64.8882C67.1501 65.1456 67.2905 65.3718 67.4387 65.5824C68.4839 67.08 69.5447 68.5698 70.5821 70.083C71.4245 71.3076 71.1983 72.813 70.0829 73.6008C68.9207 74.4198 67.4387 74.1234 66.5495 72.8676C65.4887 71.3778 64.4513 69.8724 63.3983 68.3748C63.2579 68.172 63.1019 67.977 62.9147 67.7274L62.8991 67.7352ZM57.5561 66.6276C58.7105 65.1222 59.7401 63.8118 60.7385 62.4702C61.2611 61.7682 61.9007 61.3002 62.7431 61.0584C64.2017 60.6294 65.6447 60.1536 67.0955 59.6934C67.2671 59.6388 67.4231 59.553 67.6805 59.4438C63.4139 56.9868 59.2643 54.5922 55.0055 52.1352C55.8635 57.0024 56.6903 61.7136 57.5561 66.6354V66.6276Z"></path>   <path '="" d="M27.5807 15.5376C27.5183 16.887 26.4107 17.9088 25.0613 17.8698C23.7119 17.823 22.5965 16.6296 22.6745 15.3114C22.7525 13.9932 23.9225 12.909 25.2095 12.9636C26.5667 13.0182 27.6353 14.1882 27.5729 15.5376H27.5807Z"></path>   <path '="" d="M30.8411 15.4206C30.8411 14.0946 31.9331 12.9792 33.2513 12.9558C34.5695 12.9324 35.7551 14.1024 35.7551 15.4206C35.7551 16.7622 34.6007 17.8854 33.2435 17.862C31.9019 17.8386 30.8333 16.7544 30.8411 15.4128V15.4206Z"></path>   <path '="" d="M19.4377 15.4674C19.4221 16.809 18.3457 17.8776 16.9963 17.8776C15.6235 17.8776 14.5393 16.7778 14.5549 15.3894C14.5705 14.0556 15.6625 12.9636 16.9963 12.9636C18.3457 12.9636 19.4533 14.0946 19.4377 15.4674Z"></path> </svg>`,
    icon: 'portal',
    title: 'Client Portal',
    desc: 'Give your clients a branded space to manage orders, projects, files, messages, and updates.',
    link: '/features/client-portal',
    img: 'http://admin.dspcrm.com/wp-content/uploads/2026/06/Dashboard-.svg'
  },
  {
    icon: 'crm',
    title: 'CRM',
    desc: 'Manage leads, contacts, customers, and client relationships from one centralized platform.',
    link: '/features/crm',
    img: 'http://admin.dspcrm.com/wp-content/uploads/2026/07/image-16.svg'
  },
  {
    icon: 'billing',
    title: 'Billing & Invoicing',
    desc: 'Create invoices, manage subscriptions, collect payments, and simplify your entire billing process.',
    link: '/features/billing',
    img : "http://admin.dspcrm.com/wp-content/uploads/2026/06/image-1.svg"
  },
  {
    icon: 'forms',
    title: 'Forms & Builder',
    desc: 'Create powerful forms for leads, onboarding, orders, applications, and client intake.',
    link: '/features/forms-builder',
    img : `http://admin.dspcrm.com/wp-content/uploads/2026/06/image-11.svg`,
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
    