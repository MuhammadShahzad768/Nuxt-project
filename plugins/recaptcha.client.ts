import { VueReCaptcha } from 'vue-recaptcha-v3'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: '6LceFdwsAAAAACeTg53Wzlx3qSu4yAf6Va3Pa8WJ', // from Google reCAPTCHA admin
    loaderOptions: {
      autoHideBadge: true,
    },
  })
})
