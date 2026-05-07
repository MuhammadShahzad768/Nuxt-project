<template>
  <div class="flex min-h-screen bg-white custom_family">

    <!-- ── CENTERED FORM PANEL ── -->
    <div class="flex flex-1 items-center justify-center bg-white px-6 pb-12 md:px-9 mt-[150px]">
      <div class="w-full max-w-[560px]">

        <h1 class="mb-[14px]  text-[clamp(34px,4vw,45px)]
                   font-extrabold leading-[1.12] tracking-[-0.02em] text-[#00296B]">
          Create your<br>workspace
        </h1>
        <p class="mb-7 text-[14px] leading-[1.5] text-[#494949]">
          Try the Dspcrm platform for 14 days, no card required.
        </p>

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
          <div class="flex flex-col gap-[6px]">
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
</template>

<script setup>
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
const slides = [
  { quote: '"Instead of starting from scratch I rely on Wayfront for years of testing and experience."', author: 'Kenny Schumacher', role: 'Appraisal Saver', initials: 'KS' },
  { quote: '"The fastest way to scale your agency without the technical headaches."', author: 'Sarah Jenkins', role: 'Founder, ScaleUp', initials: 'SJ' }
];
</script>