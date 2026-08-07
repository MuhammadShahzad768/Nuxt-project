<style scoped>
  :root {
    --primary: #00296B;
    --accent: #2563EB;
    --accent-soft: rgba(37,99,235,0.12);
    --surface: #F8FAFC;
    --border: #E2E8F0;
    --border-input: #CBD5E1;
    --text: #0F172A;
    --text-muted: #64748B;
    --text-faint: #94A3B8;
    --error: #DC2626;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    background: var(--surface);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, .heading-font {
    font-family: 'Poppins', 'Inter', ui-sans-serif, system-ui, sans-serif;
  }

  .page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    .page { grid-template-columns: 1fr 1fr; }
  }

  /* ---------------- LEFT PANEL ---------------- */

  .left {
    position: relative;
    overflow: hidden;
    background: linear-gradient(160deg, #00296B 0%, #001A45 100%);
    padding: 2.5rem 1.5rem;
  }

  @media (min-width: 640px) { .left { padding: 3.5rem 2.5rem; } }
  @media (min-width: 1024px) {
    .left {
      padding: 4rem 3.5rem;
     
      display: flex;
    }
  }

  .left::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0);
    background-size: 28px 28px;
    pointer-events: none;
  }

  .glow {
    position: absolute;
    width: 480px;
    height: 480px;
    top: -120px;
    left: -120px;
    border-radius: 9999px;
    background: radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%);
    filter: blur(10px);
    pointer-events: none;
  }

  .left-inner {
    position: relative;
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 1024px) {
    .left-inner { margin: 0; height: 100%; }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 1024px) { .brand { margin-bottom: 3.5rem; } }

  .brand-mark {
    width: 330px;
    border-radius: 8px;
    background: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 0.9rem;
  }

  .brand-name {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .step-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .step-dot {
    width: 22px;
    height: 4px;
    border-radius: 9999px;
    background: rgba(255,255,255,0.18);
  }

  .step-dot.active { background: var(--accent); }

  .step-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(255,255,255,0.6);
    margin-left: 0.25rem;
  }
label{
font-family:Poppins, Inter, ui-sans-serif, system-ui, sans-serif
}
  .hero-title {
    color: #fff;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin: 0 0 1rem;
  }

  @media (min-width: 640px) { .hero-title { font-size: 2.35rem; } }

  .hero-sub {
    color: rgba(255,255,255,0.72);
    font-size: 1rem;
    line-height: 1.6;
    margin: 0 0 1.75rem;
  }

  .trust-list {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    margin-bottom: 2.5rem;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.875rem;
    color: rgba(255,255,255,0.82);
  }

  .check-circle {
    width: 18px;
    height: 18px;
    border-radius: 9999px;
    background: rgba(37,99,235,0.28);
    color: #9DBBFF;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .benefits-title {
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 1rem;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: auto;
  }

  .benefit-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px;
    padding: 1rem;
    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }

  .benefit-card:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.22);
    transform: translateY(-2px);
  }

  .benefit-icon {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: rgba(37,99,235,0.22);
    color: #7EA2FF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.65rem;
  }

  .benefit-icon svg { width: 17px; height: 17px; }

  .benefit-name {
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.25rem;
  }

  .benefit-desc {
    color: rgba(255,255,255,0.62);
    font-size: 0.75rem;
    line-height: 1.5;
    margin: 0;
  }

  .left-footer {
    display: none;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255,255,255,0.5);
    font-size: 0.75rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 2rem;
    margin-top: 2rem;
  }

  @media (min-width: 1024px) { .left-footer { display: flex; } }

  /* ---------------- RIGHT PANEL / FORM ---------------- */

  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 1.25rem;
  }

  @media (min-width: 640px) { .right { padding: 4rem 4rem; } }

  .right-inner { width: 100%; }
.right-inner {
    background: #fff;
    border: 1px solid #E2E8F0;
    padding: 30px 45px;
    border-radius: 20px;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -12px rgba(15, 23, 42, 0.10);
}
  .card {
    background: #fff;
    border: 1px solid #E2E8F0;
    border-radius: 20px;
    box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 12px 32px -12px rgba(15,23,42,0.10);
    padding: 1.75rem;
  }

  @media (min-width: 640px) { .card { padding: 2rem; } }

  .progress {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .progress-step {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .progress-num {
    width: 20px;
    height: 20px;
    border-radius: 9999px;
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress-num.current { background: #2563EB; color: #fff; }
  .progress-num.upcoming { background: #E2E8F0; color: #94A3B8; }

  .progress-text { font-size: 0.75rem; font-weight: 500; color: #475569; }
  .progress-text.upcoming { color: var(--text-faint); }

  .progress-line { flex: 1; height: 1px; background: var(--border); }

  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary);
    margin: 0 0 0.25rem;
    letter-spacing: -0.01em;
  }

  .card-sub {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin: 0 0 1.5rem;
  }

  .card-sub a { color: var(--accent); font-weight: 500; text-decoration: none; }
  .card-sub a:hover { text-decoration: underline; }

  .field { margin-bottom: 1rem; }
  .field.checkbox-field { margin-bottom: 1.5rem; }

  label.field-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    color: #334155;
    margin-bottom: 0.4rem;
  }
/* 
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    border: 1px solid #CBD5E1;
    border-radius: 10px;
    padding: 0.65rem 0.85rem;
    font-size: 0.9rem;
    color: var(--text);
    background: #fff;
    font-family: inherit;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  } */

  /* input::placeholder { color: var(--text-faint); } */

  /* input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.14);
  } */

  input.error { border-color: var(--error); }
  input.error:focus { box-shadow: 0 0 0 3px rgba(220,38,38,0.12); }

  .error-text {
    font-size: 0.78rem;
    color: var(--error);
    margin: 0.35rem 0 0;
  }

  .helper-text {
    font-size: 0.75rem;
    color: var(--text-faint);
    margin: 0.4rem 0 0;
  }

  .password-wrap { position: relative; }

  .password-wrap input { padding-right: 2.5rem; }

  .toggle-password {
    position: absolute;
    right: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-faint);
    cursor: pointer;
    display: flex;
    padding: 0;
  }

  .toggle-password svg { width: 17px; height: 17px; }

  .url-group {
    display: flex;
    align-items: stretch;
    border: 1px solid var(--border-input);
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .url-group:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.14);
  }

  .url-group.error { border-color: var(--error); }

  .url-group input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    padding: 0.65rem 0.85rem;
    font-size: 0.9rem;
  }

  .url-suffix {
    display: flex;
    align-items: center;
    padding: 0 0.85rem;
    background: #F1F5F9;
    color: var(--text-muted);
    font-size: 0.85rem;
    font-weight: 500;
    white-space: nowrap;
    border-left: 1px solid var(--border);
  }

  .checkbox-row {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    cursor: pointer;
  }

  input[type="checkbox"].dsp-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 5px;
    border: 1.5px solid var(--border-input);
    flex-shrink: 0;
    margin-top: 2px;
    cursor: pointer;
    position: relative;
    transition: border-color 0.15s ease, background-color 0.15s ease;
  }

  input[type="checkbox"].dsp-checkbox:checked {
    background: var(--accent);
    border-color: var(--accent);
  }

  input[type="checkbox"].dsp-checkbox:checked::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 1px;
    width: 5px;
    height: 9px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .checkbox-text {
    font-size: 0.875rem;
    color: #475569;
    line-height: 1.45;
  }

  .checkbox-text a { color: var(--accent); font-weight: 500; text-decoration: none; }
  .checkbox-text a:hover { text-decoration: underline; }

  .cta {
    width: 100%;
    font-family: inherit;
    border-radius: 12px;
    padding: 0.75rem 1rem;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  }

  .cta:hover:not(:disabled) {
    background: var(--accent);
    box-shadow: 0 8px 20px -8px rgba(37,99,235,0.55);
  }

  .cta:active:not(:disabled) { transform: translateY(1px); }
  .cta:disabled { opacity: 0.7; cursor: not-allowed; }

  .cta svg { width: 16px; height: 16px; }

  .spin { animation: dsp-spin 0.8s linear infinite; }
  @keyframes dsp-spin { to { transform: rotate(360deg); } }

  .mobile-footer {
    text-align: center;
    font-size: 0.75rem;
    color: var(--text-faint);
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
  }

  @media (min-width: 1024px) { .mobile-footer { display: none; } }

  .mobile-footer svg { width: 13px; height: 13px; flex-shrink: 0; }

  /* success state */
  .success-icon {
    width: 52px;
    height: 52px;
    border-radius: 9999px;
    background: var(--accent-soft);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.25rem;
  }

  .success-icon svg { width: 26px; height: 26px; }

  .hidden { display: none; }

  /* ---------------- TESTIMONIAL SLIDER ---------------- */

  .testimonial {
    position: relative;
    margin-top: 1.75rem;
    padding: 1.25rem 1.4rem;
    border-radius: 16px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    min-height: 122px;
  }

  .testimonial-track {
    position: relative;
    min-height: 74px;
  }

  .testimonial-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.45s ease, transform 0.45s ease;
    pointer-events: none;
  }

  .testimonial-slide.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .testimonial-quote {
    font-size: 0.85rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.82);
    margin: 0 0 0.85rem;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .testimonial-avatar {
    width: 30px;
    height: 30px;
    border-radius: 9999px;
    background: rgba(37,99,235,0.28);
    color: #9DBBFF;
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .testimonial-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
    line-height: 1.3;
  }

  .testimonial-role {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.55);
    margin: 0;
    line-height: 1.3;
  }

  .testimonial-dots {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 1.9rem;
  }

  .testimonial-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: rgba(255,255,255,0.22);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.2s ease, width 0.2s ease;
  }

  .testimonial-dot.active {
    background: #fff;
    width: 16px;
    border-radius: 9999px;
  }
</style>
<template>
  <div class="page custom_family">

    <!-- ================= LEFT PANEL ================= -->
    <div class="left">
      <div class="glow"></div>
      <div class="left-inner">

        <div class="brand">
          <nuxt-link to="/" class="brand-name">
          <img
            class="brand-mark"
            src="http://admin.dspcrm.com/wp-content/uploads/2026/08/dsp-logo-white-webp.webp"
            alt="DSP CRM Logo"
          />
          </nuxt-link>
        </div>
        <h1 class="hero-title">Create your DSP CRM workspace</h1>
        <p class="hero-sub">Set up your workspace and start managing clients, projects, billing, and team collaboration in minutes.</p>

        <div class="trust-list">
          <div class="trust-item">
            <span class="check-circle">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
            No credit card required
          </div>
          <div class="trust-item">
            <span class="check-circle">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
            14-day free trial
          </div>
          <div class="trust-item">
            <span class="check-circle">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
            Setup takes less than 2 minutes
          </div>
        </div>

        <!-- TESTIMONIAL SLIDER -->
        <div
          class="testimonial"
          role="region"
          aria-label="Customer testimonials"
          @mouseenter="pauseSlider"
          @mouseleave="resumeSlider"
        >
          <div class="testimonial-track">
            <transition name="fade-slide" mode="out-in">
              <div class="testimonial-slide active" :key="currentSlide">
                <p class="testimonial-quote">&ldquo;{{ testimonials[currentSlide].quote }}&rdquo;</p>
                <div class="testimonial-author">
                  <span class="testimonial-avatar">{{ testimonials[currentSlide].initials }}</span>
                  <div>
                    <p class="testimonial-name">{{ testimonials[currentSlide].name }}</p>
                    <p class="testimonial-role">{{ testimonials[currentSlide].role }}</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div class="testimonial-dots">
            <button
              v-for="(t, i) in testimonials"
              :key="i"
              type="button"
              class="testimonial-dot"
              :class="{ active: i === currentSlide }"
              :aria-label="`Show testimonial ${i + 1}`"
              @click="goToSlide(i)"
            ></button>
          </div>
        </div>

      </div>
    </div>

    <!-- ================= RIGHT PANEL / FORM ================= -->
    <div class="right">
      <div class="right-inner">

       <div class="w-full max-w-[560px]">

        <!-- <h1 class="mb-[14px]  text-[clamp(34px,4vw,45px)]
                   font-extrabold leading-[1.12] tracking-[-0.02em] text-[#00296B]">
          Create your<br>workspace
        </h1> -->

        <!-- Success Alert -->
        <div v-if="successMsg"
             class="mb-5 flex items-center gap-[9px] rounded-lg border border-[rgba(60,180,80,0.2)]
                    bg-[rgba(60,180,80,0.1)] px-4 py-3 text-[13.5px] text-[#6ddb88]">
          <i class="fa-solid fa-circle-check"></i> {{ successMsg }}
        </div>

        <!-- Generic API Error -->
        <div v-if="apiError"
             class="mb-5 flex items-center gap-[9px] rounded-lg border border-[rgba(220,60,50,0.2)]
                    bg-[rgba(220,60,50,0.08)] px-4 py-3 text-[13.5px] text-[#f07070]">
          <i class="fa-solid fa-circle-exclamation"></i> {{ apiError }}
        </div>

        <form @submit.prevent="handleRegistration" class="flex flex-col gap-[18px]">

          <!-- Name -->
          <div class="flex flex-col gap-[6px] ">
            <label class="text-[13.5px] font-semibold tracking-[0.01em] text-[#00296B]">Your name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Jim Smith"
              :class="[
                'w-full rounded-lg border-[1.5px] bg-[#f9f9f9] px-[14px] py-[11px]',
                'text-[14px] text-[#333] outline-none transition-[border-color,box-shadow] duration-200',
                'placeholder:text-[#aaa]',
                'focus:border-[#00296B] focus:shadow-[0_0_0_3px_rgba(0,41,107,0.10)]',
                errors.name
                  ? 'border-[#c04040] shadow-[0_0_0_3px_rgba(192,64,64,0.10)]'
                  : 'border-[#ddd]'
              ]"
              @blur="touch('name')"
            >
            <p v-if="errors.name" class="flex items-center gap-[5px] text-[12px] leading-[1.4] text-[#f07070]">
              <i class="fa-solid fa-circle-exclamation text-[10px]"></i> {{ errors.name }}
            </p>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-[6px]">
            <label class="text-[13.5px] font-semibold tracking-[0.01em] text-[#00296B]">Your email</label>
            <div class="relative">
              <input
                v-model="form.email"
                type="email"
                placeholder="jim@agency.com"
                :class="[
                  'w-full rounded-lg border-[1.5px] bg-[#f9f9f9] px-[14px] py-[11px]',
                  'text-[14px] text-[#333] outline-none transition-[border-color,box-shadow] duration-200',
                  'placeholder:text-[#aaa]',
                  'focus:border-[#00296B] focus:shadow-[0_0_0_3px_rgba(0,41,107,0.10)]',
                  (errors.email || existenceErrors.email)
                    ? 'border-[#c04040] shadow-[0_0_0_3px_rgba(192,64,64,0.10)]'
                    : 'border-[#ddd]'
                ]"
                @blur="onEmailBlur"
              >
              <div v-if="pending.email" class="absolute right-3 top-1/2 -translate-y-1/2">
                <i class="fa-solid fa-circle-notch animate-spin text-[#aaa]"></i>
              </div>
            </div>
            <p v-if="errors.email || existenceErrors.email"
               class="flex items-center gap-[5px] text-[12px] leading-[1.4] text-[#f07070]">
              <i class="fa-solid fa-circle-exclamation text-[10px]"></i>
              {{ errors.email || existenceErrors.email }}
            </p>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-[6px]">
            <label class="text-[13.5px] font-semibold tracking-[0.01em] text-[#00296B]">Choose a password</label>
            <div class="relative flex items-center">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Secure password..."
                :class="[
                  'w-full rounded-lg border-[1.5px] bg-[#f9f9f9] py-[11px] pl-[14px] pr-[42px]',
                  'text-[14px] text-[#333] outline-none',
                  'transition-[border-color,box-shadow] duration-200 placeholder:text-[#aaa]',
                  'focus:border-[#00296B] focus:shadow-[0_0_0_3px_rgba(0,41,107,0.10)]',
                  errors.password
                    ? 'border-[#c04040] shadow-[0_0_0_3px_rgba(192,64,64,0.10)]'
                    : 'border-[#ddd]'
                ]"
                @blur="touch('password')"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-[13px] flex items-center border-none bg-transparent p-0
                       text-[#aaa] transition-colors duration-150 hover:text-[#333] cursor-pointer"
              >
                <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
              </button>
            </div>

            <!-- Strength meter -->
            <div v-if="form.password" class="mt-[6px] flex items-center gap-2">
              <div class="flex gap-1">
                <div
                  v-for="i in 4" :key="i"
                  class="h-1 w-10 rounded-full transition-[background] duration-300"
                  :style="{ background: i <= passwordStrength ? strengthColor : '#ddd' }"
                ></div>
              </div>
              <span class="text-[11.5px] font-semibold transition-[color] duration-300"
                    :style="{ color: strengthColor }">
                {{ strengthLabel }}
              </span>
            </div>

            <p v-if="errors.password" class="flex items-center gap-[5px] text-[12px] leading-[1.4] text-[#f07070]">
              <i class="fa-solid fa-circle-exclamation text-[10px]"></i> {{ errors.password }}
            </p>
          </div>

          <!-- Workspace URL -->
          <div class="flex flex-col gap-[6px]">
            <label class="text-[13.5px] font-semibold tracking-[0.01em] text-[#00296B]">
              Choose a workspace URL
            </label>
            <div :class="[
              'flex items-center overflow-hidden rounded-lg border-[1.5px] bg-[#f9f9f9]',
              'transition-[border-color,box-shadow] duration-200',
              'focus-within:border-[#00296B] focus-within:shadow-[0_0_0_3px_rgba(0,41,107,0.10)]',
              (errors.workspace || existenceErrors.workspace)
                ? 'border-[#c04040] shadow-[0_0_0_3px_rgba(192,64,64,0.10)]'
                : 'border-[#ddd]'
            ]">
              <span class="select-none border-r-[1.5px] border-[#ddd] bg-[#f0f0f0]
                           px-3 py-[11px] text-[13.5px] text-[#aaa] whitespace-nowrap">
                https://
              </span>
              <input
                v-model="form.workspace"
                type="text"
                placeholder="agency"
                class="min-w-0 flex-1 border-none bg-transparent px-[10px] py-[11px]
                       text-[14px] text-[#333] outline-none placeholder:text-[#aaa]"
                @blur="onWorkspaceBlur"
              >
              <div v-if="pending.workspace" class="px-2">
                <i class="fa-solid fa-circle-notch animate-spin text-xs text-[#aaa]"></i>
              </div>
              <span class="select-none border-l-[1.5px] border-[#ddd] bg-[#f0f0f0]
                           px-3 py-[11px] text-[13.5px] text-[#aaa] whitespace-nowrap">
                .dspcrm.app
              </span>
            </div>

            <p v-if="errors.workspace || existenceErrors.workspace"
               class="flex items-center gap-[5px] text-[12px] leading-[1.4] text-[#f07070]">
              <i class="fa-solid fa-circle-exclamation text-[10px]"></i>
              {{ errors.workspace || existenceErrors.workspace }}
            </p>
            <p v-else class="text-[12px] leading-[1.55] text-[#aaa]">
              Once you set up a custom domain, your team will access DSPCRM from here.
            </p>
          </div>

          <!-- Checkbox -->
          <div class="flex flex-col gap-1">
            <label class="flex cursor-pointer items-start gap-[11px]">
              <div class="shrink-0 pt-px">
                <input
                  v-model="form.agreed"
                  type="checkbox"
                  class="absolute h-0 w-0 opacity-0"
                  @change="touch('agreed')"
                >
                <div :class="[
                  'flex h-[17px] w-[17px] items-center justify-center rounded-[4px]',
                  'border-[1.5px] transition-[background,border-color] duration-[180ms]',
                  form.agreed
                    ? 'border-[#00296B] bg-[#00296B]'
                    : errors.agreed
                      ? 'border-[#c04040] bg-white shadow-[0_0_0_3px_rgba(192,64,64,0.10)]'
                      : 'border-[#ddd] bg-white'
                ]">
                  <svg v-if="form.agreed" width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l2.5 2.5L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <span class="text-[13px] leading-[1.5] text-[#494949]">
                I agree to the
                 <router-link  to="/Terms"  class="text-[#00296B] no-underline transition-colors duration-150 hover:underline" target="_blank"> Terms of Service</router-link>
               
                and
                 <router-link  to="/Privacy-Policy" class="text-[#00296B] no-underline transition-colors duration-150 hover:underline" target="_blank">  Privacy Policy</router-link>
                
              </span>
            </label>
            <p v-if="errors.agreed" class="pl-7 flex items-center gap-[5px] text-[12px] leading-[1.4] text-[#f07070]">
              <i class="fa-solid fa-circle-exclamation text-[10px]"></i> {{ errors.agreed }}
            </p>
          </div>
 <!-- reCAPTCHA widget -->
          <div class="g-recaptcha" :data-sitekey="siteKey"></div>
          <p v-if="recaptchaError" class="flex items-center gap-[5px] text-[12px] leading-[1.4] text-[#f07070]">
            <i class="fa-solid fa-circle-exclamation text-[10px]"></i> {{ recaptchaError }}
          </p>
          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="flex w-full cursor-pointer items-center justify-center rounded-[9px] border-none
                   bg-[#00296B] px-6 py-[14px] text-[15px] font-semibold text-white
                   transition-[background,transform,box-shadow] duration-200
                   hover:bg-[#001a47] hover:-translate-y-px hover:shadow-[0_4px_24px_rgba(0,41,107,0.3)]
                   disabled:cursor-not-allowed disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
          >
            <span v-if="loading" class="flex items-center gap-[9px]">
              <i class="fa-solid fa-circle-notch animate-spin"></i> Creating...
            </span>
            <span v-else class="flex items-center gap-[9px]">
              Create workspace
              <i class="fa-solid fa-chevron-right text-xs"></i>
            </span>
          </button>
        </form>
      </div>
    </div>
</div>  
  </div>
</template>
<script setup>
import SignUp from '~/layouts/SignUp.vue'
definePageMeta({
  layout: 'SignUp'
}); 
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
import { ref, onMounted, computed } from 'vue'
const API_URL = 'https://dspcrm.app/api/v1/register-workspace';

// ── Form & State ──────────────────────────────────────────────────────
const loading = ref(false);
const successMsg = ref('');
const apiError = ref('');
const recaptchaError = ref(null)

// Replace with your real site key from Google reCAPTCHA admin
const siteKey = '6Ldspt0sAAAAAPkbuf5w8IqH_lR3tULW4ckX9GSb'
const showPassword = ref(false);
const currentSlide = ref(0);

const form = ref({
  name: '',
  email: '',
  password: '',
  workspace: '',
  agreed: false,
  plan_slug: route.query.plan || 'basic',
  billing_cycle: route.query.cycle || 'monthly'
});

// ── Validation Logic ──────────────────────────────────────────────────
const touched = ref({ name: false, email: false, password: false, workspace: false, agreed: false });
const pending = ref({ email: false, workspace: false });
const existenceErrors = ref({ email: '', workspace: '' });

const rules = {
  name:      (v) => v.trim().length >= 2 ? '' : 'Name is required (min 2 chars).',
  email:     (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email.',
  password:  (v) => v.length >= 8 ? '' : 'Password must be at least 8 characters.',
  workspace: (v) => /^[a-z0-9-]+$/.test(v) ? '' : 'Use only lowercase, numbers, and hyphens.',
  agreed:    (v) => v ? '' : 'You must accept the terms.'
};

const errors = computed(() => ({
  name:      touched.value.name      ? rules.name(form.value.name)           : '',
  email:     touched.value.email     ? rules.email(form.value.email)         : '',
  password:  touched.value.password  ? rules.password(form.value.password)   : '',
  workspace: touched.value.workspace ? rules.workspace(form.value.workspace) : '',
  agreed:    touched.value.agreed    ? rules.agreed(form.value.agreed)       : ''
}));

const touch = (field) => touched.value[field] = true;

// ── Async Existence Checks ────────────────────────────────────────────
const onEmailBlur = async () => {
  touch('email');

};

const onWorkspaceBlur = async () => {
};

// ── Password Strength ─────────────────────────────────────────────────
const passwordStrength = computed(() => {
  const v = form.value.password;
  if (!v) return 0;
  let s = 0;
  if (v.length >= 8)           s++;
  if (/[A-Z]/.test(v))        s++;
  if (/[0-9]/.test(v))        s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return s;
});
const strengthLabel = computed(() => ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength.value]);
const strengthColor = computed(() => ['', '#ef4444', '#f59e0b', '#facc15', '#22c55e'][passwordStrength.value]);

// ── Submit ────────────────────────────────────────────────────────────
const handleRegistration = async () => {
  recaptchaError.value = null
  apiError.value = '';
  successMsg.value = '';
   

  // 1. reCAPTCHA ٹوکن حاصل کرنے کا صحیح طریقہ
  let token = '';
  if (window.grecaptcha) {
    token = window.grecaptcha.getResponse();
  }

  if (!token) {
    recaptchaError.value = 'Please verify the reCAPTCHA before submitting.'
    return
  }
  apiError.value = '';
  successMsg.value = '';
  existenceErrors.value.workspace = '';
  existenceErrors.value.email = '';

  Object.keys(touched.value).forEach((key) => {
    touched.value[key] = true;
  });

  if (
    Object.values(errors.value).some(error => error) ||
    existenceErrors.value.email ||
    existenceErrors.value.workspace
  ) {
    return;
  }

  loading.value = true;

  try {
    const formData = new URLSearchParams({
      domain_name: form.value.workspace.trim().toLowerCase(),
      name: form.value.name.trim(),
      email: form.value.email.trim().toLowerCase(),
      password: form.value.password,
      password_confirmation: form.value.password,
      plan_slug: form.value.plan_slug,
      billing_cycle: form.value.billing_cycle,
      recaptcha_token: token // include token if you want backend validation later
    });

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: formData
    });

    const responseText = await res.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Invalid JSON Response:', responseText);
      throw new Error('Server returned an invalid response. Please try again later.');
    }

    if (!res.ok) {
      const msg = data?.errors
        ? Object.values(data.errors).flat()[0]
        : data?.message || 'An error occurred.';

      const msgLower = String(msg).toLowerCase();

      if (msgLower.includes('domain')) {
        existenceErrors.value.workspace = msg;
      } else if (msgLower.includes('email')) {
        existenceErrors.value.email = msg;
      } else {
        apiError.value = msg;
      }

      return;
    }

    successMsg.value = data?.message || 'Workspace created successfully!';

    setTimeout(() => {
      router.push({
        path: '/welcome',
        query: {
          email: form.value.email.trim().toLowerCase()
        }
      });
    }, 800);

  } catch (error) {
    console.error('Registration Error:', error);
    apiError.value =
      error instanceof Error
        ? error.message
        : 'Network error. Please try again.';
  } finally {
    loading.value = false;
  }
};
const cycle = ref('monthly')

onMounted(() => {
   if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
  const savedCycle = localStorage.getItem('cycle')
  form.value.billing_cycle = route.query.cycle || savedCycle || 'monthly'
  form.value.plan_slug = route.query.plan || form.value.plan_slug
})

// ── Slides ────────────────────────────────────────────────────────────
// ── Testimonial Slider ───────────────────────────────────────────────
const testimonials = [
  {
    quote: "DSP CRM cut our client onboarding time in half. Everything from leads to invoices lives in one place now.",
    name: "Sarah Bennett",
    role: "Founder, Bennett Digital",
    initials: "SB"
  },
  {
    quote: "The client portal alone was worth switching for. Our clients finally see project status without emailing us.",
    name: "Marcus Lee",
    role: "Operations Lead, Northwind Agency",
    initials: "ML"
  },
  {
    quote: "Setup genuinely took minutes. We had our whole team moved over from spreadsheets by the end of the week.",
    name: "Priya Nair",
    role: "Co-founder, Nairworks Studio",
    initials: "PN"
  }
]
let sliderTimer = null

function goToSlide(index) {
  currentSlide.value = (index + testimonials.length) % testimonials.length
}
function startSlider() {
  sliderTimer = setInterval(() => goToSlide(currentSlide.value + 1), 2000)
}
function pauseSlider() {
  clearInterval(sliderTimer)
}
function resumeSlider() {
  clearInterval(sliderTimer)
  startSlider()
}
</script>
