<template>
  <footer class="bg-[#F4F4F4] pt-0">
    <section class="max-w-screen-xl md:px-10 px-5 flex m-auto md:mt-10 flex-wrap">
    <div class="logo w-full">
          <router-link to="/">
            <img
              v-for="(item, index) in logo"
              :key="`logo-${index}`"
              :src="item.name"
              alt="logo"
              class="wow skewIn text-base text-[#5E6282] font-poppins font-medium mt-3 mb-1"
              :class="{ animated: visibleItems[index] }"
              :style="visibleItems[index] ? { transitionDelay: (index * 0.15) + 's' } : {}"
            />
          </router-link>
        </div>
        </section>
    <section class="max-w-screen-xl md:px-10 px-5 flex m-auto md:mt-8 flex-wrap">
      <div v-html="custom_html"></div>

      <div class="lg:max-w-[20%] md:max-w-[33%] sm:max-w-[90%] w-full mb-10 md:mb-0">
        
<div class="lg:max-w-[90%] md:max-w-[33%] w-full mb-10 lg:mb-0 md:mb-5 ">
        <h3 class="text-[#080809] mb-2 font-poppins font-bold text-xl">Company</h3>
       <p class="text-[18px] text-[#5E6282] font-poppins font-medium pt-3">DSP CRM LLC</p>
       <div class="flex list-none gap-2 mt-3 mb-3">
         <div
            ref="listItems"
            class="hover:text-blue-600  flex items-center gap-1 "
          >
       <router-link class="text-[#5E6282] font-medium" to="/terms">
        Terms
       </router-link>
      </div>
        <li
            ref="listItems"
            class="hover:text-blue-600  flex items-center gap-0"
          >
       <router-link class="text-[#5E6282] font-medium" to="/privacy-policy">
        Privacy
       </router-link>
      </li>
      </div>
      </div>
        <div>
          <div class="flex gap-2 items-center mt-5">
          <hr style="width: 60px;height: 2px;border-top-width: 2px; border-color: #A5A7B8;">
          <svg  xmlns="http://www.w3.org/2000/svg" class=" h-5 w-5 text-[#00296b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <hr style="width: 60px;height: 2px;border-top-width: 2px;border-color: #A5A7B8;" >
            </div>
          <p
            v-for="(item, index) in Contact"
            :key="`contact-${index}`"
            class="flex wow skewIn text-[15px] max-w-[220px] text-[#5E6282] font-poppins font-medium mt-3 mb-1"
            :class="{ animated: visibleItems[index] }"
            :style="visibleItems[index] ? { transitionDelay: (index * 0.15) + 's' } : {}"
          >
            <svg v-if="index === 10" xmlns="http://www.w3.org/2000/svg" class="mt-[4px] h-10 w-10 mr-2 text-[#00296b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-[4px] h-5 w-5 mr-2 text-[#00296b]">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"/>
              <rect x="3" y="6" width="18" height="12" rx="2" ry="2"/>
            </svg>

            <svg v-else-if="index === 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-[4px] h-5 w-5 mr-2 text-[#00296b]">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67 A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91 a16 16 0 0 0 6 6l1.27-1.27 a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 A2 2 0 0 1 22 16.92z"/>
            </svg>
            {{ item.name }}
          </p>
        </div>

        <div class="icons mt-5">
          <div class="inline-flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <a
                v-for="(item, index) in SoicalName"
                :key="index"
                :href="item.href"
                target="_blank"
                rel="noopener"
                class="group w-9 h-9 rounded-full bg-white shadow flex items-center justify-center transition-all duration-500 opacity-0 translate-y-3 hover:scale-110 hover:bg-[#00296B]"
                :class="{ 'opacity-100 translate-y-0': visibleItems[index] }"
              >
                <i :class="['fa-brands', `fa-${item.icon[1]}`, 'text-[#00296B] w-4 h-4 transition-colors duration-300 group-hover:text-white']"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:max-w-[18%] md:max-w-[33%] w-full mb-10 lg:mb-0 md:mb-5">
        <h3 class="text-[#080809] mb-2 font-poppins font-bold text-xl">{{ featuresTitle }}</h3>
        <ul class="space-y-2 text-[#5E6282] font-poppins font-medium text-[14px] list-disc pl-5 cursor-pointer">
          <li
            v-for="(item, index) in features"
            :key="`feature-${index}`"
            ref="listItems"
            class="hover:text-blue-600 wow skewIn flex items-center gap-1"
            :class="{ animated: visibleItems[index] }"
            :style="visibleItems[index] ? { transitionDelay: (index * 0.15) + 's' } : {}"
          >
            <a v-if="item.links" href="https://calendly.com/dspcrm-info/30min">{{ item.name }}</a>
            <span v-else>{{ item.name }}</span>
            <span v-if="item.badge && item.badge.url"><img :src="item.badge.url" /></span>
          </li>
        </ul>
      </div>

      <div class="lg:max-w-[25%] md:max-w-[33%] w-full mb-10 lg:mb-0 md:mb-5">
        <div>
          <h3 class="text-[#080809] mb-2 font-poppins font-bold text-xl">{{ featuresTitle2 }}</h3>
          <ul class="space-y-2 text-[#5E6282] font-poppins font-medium text-[14px] list-disc pl-5 cursor-pointer">
            <li
              v-for="(item, index) in features2"
              :key="`feature2-${index}`"
              ref="listItems"
              class="hover:text-blue-600 wow skewIn flex items-center gap-1"
              :class="{ animated: visibleItems[index] }"
              :style="visibleItems[index] ? { transitionDelay: (index * 0.15) + 's' } : {}"
            >
             <router-link v-if="item.links" :to="item.links">{{ item.name }}</router-link>
              <span v-else>{{ item.name }}</span>
              <span v-if="item.badge && item.badge.url"><img :src="item.badge.url" /></span>
            </li>
          </ul>
        </div>

        <div class="mt-16">
          <h3 class="text-[#080809] mb-2 font-poppins font-bold text-xl">{{ resourcesTitle }}</h3>
          <ul class="space-y-2 text-[#5E6282] font-poppins font-medium text-[14px] list-disc pl-5 cursor-pointer">
            <li
              v-for="(item, index) in resources"
              :key="`resource-${index}`"
              ref="listItems"
              class="hover:text-blue-600 wow skewIn flex items-center gap-1"
              :class="{ animated: visibleItems[index] }"
              :style="visibleItems[index] ? { transitionDelay: (index * 0.15) + 's' } : {}"
            >
              <a v-if="item.links" href="https://calendly.com/dspcrm-info/30min">{{ item.name }}</a>
              <span v-else>{{ item.name }}</span>
              <span v-if="item.badge && item.badge.url"><img :src="item.badge.url" /></span>
            </li>
          </ul>
        </div>
      </div>

      <div class="lg:max-w-[21%] md:max-w-[33%] w-full mb-10 lg:mb-0 md:mb-5">
        <h3 class="text-[#080809] mb-2 font-poppins font-bold text-xl">{{ ProductTitle }}</h3>
        <ul class="space-y-2 text-[#5E6282] font-poppins font-medium text-[14px] list-disc pl-5 cursor-pointer">
          <li
            v-for="(item, index) in Product"
            :key="`product-${index}`"
            ref="listItems"
            class="hover:text-blue-600 wow skewIn flex items-center gap-1"
            :class="{ animated: visibleItems[index] }"
            :style="visibleItems[index] ? { transitionDelay: (index * 0.15) + 's' } : {}"
          >
            <a v-if="item.links" href="https://calendly.com/dspcrm-info/30min">{{ item.name }}</a>
            <span v-else>{{ item.name }}</span>
            <span v-if="item.badge && item.badge.url"><img :src="item.badge.url" /></span>
          </li>
        </ul>
      </div>

      <div class="lg:max-w-[16%] md:max-w-[33%] w-full">
        <h3 class="text-[#080809] mb-2 font-poppins font-bold text-xl">{{ SupportTitle }}</h3>
        <ul class="space-y-2 text-[#5E6282] font-poppins font-medium text-[14px] list-disc pl-5 cursor-pointer">
          <li
            v-for="(item, index) in Support"
            :key="`support-${index}`"
            ref="listItems"
            class="hover:text-blue-600 wow skewIn flex items-center gap-1"
            :class="{ animated: visibleItems[index] }"
            :style="visibleItems[index] ? { transitionDelay: (index * 0.15) + 's' } : {}"
          >
            <router-link
        v-if="item.links"
        :to="item.links"
      >
        {{ item.name }}
      </router-link>

      <!-- Otherwise default to Calendly -->
      <a
        v-else
        href="https://calendly.com/dspcrm-info/30min"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ item.name }}
      </a>
            <span v-if="item.badge && item.badge.url" class="flex-shrink-0">
              <img :src="item.badge.url.replace('http://', 'https://')" :alt="item.badge.alt || 'badge'" class="h-4 w-auto inline-block" />
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section class="mt-16">
      <div class="copy_right flex">
        <p class="justify-center pt-10 text-sm text-[#5E6282] font-poppins pb-3 font-medium m-auto">
          © {{ new Date().getFullYear() }} - DSP CRM LLC
        </p>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      observer: null,
      banner: null,
      logo: [],
      Contact: [],
      features: [],
      features2: [],
      resources: [],
      Product: [],
      Support: [],
      featuresTitle: "",
      featuresTitle2: "",
      resourcesTitle: "",
      ProductTitle: "",
      SupportTitle: "",
      custom_html: "",
      SoicalName: [],
      visibleItems: [],
    };
  },

  // ✅ Watch for route changes to refresh data
  watch: {
    $route: {
      handler: "fetchData",
      immediate: false,
    },
  },

  async mounted() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const res = await fetch(
          `https://admin.dspcrm.com/wp-json/myapi/v1/page/181?timestamp=${Date.now()}`
        );
        const data = await res.json();

        // Map Footer Data
        this.banner = data.footer || {};
        this.logo = data.footer?.footer_logo ? [{ name: data.footer.footer_logo.url }] : [];
        this.Contact = data.footer?.footer_?.map((item) => ({ name: item.footer_location })) || [];

        // Map Sections
        this.features = data.feature_links?.links || [];
        this.featuresTitle = data.feature_links?.title || "";
        this.features2 = data.feature_links_2?.links || [];
        this.featuresTitle2 = data.feature_links_2?.title || "";
        this.resources = data.resources?.links || [];
        this.resourcesTitle = data.resources?.title || "";
        this.Product = data.product_copy?.links || [];
        this.ProductTitle = data.product_copy?.title || "";
        this.Support = data.support?.links || [];
        this.SupportTitle = data.support?.title || "";

        this.custom_html =
          typeof data.html_section === "object" && data.html_section?.section
            ? data.html_section.section
            : data.html_section || "";

        // Normalize Social Icons
        const faIconMap = {
          facebook: "facebook-f",
          twitter: "twitter",
          instagram: "instagram",
          linkedin: "linkedin-in",
          youtube: "youtube",
          tiktok: "tiktok",
        };
        const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "").replace("-", "");

        this.SoicalName = data.soical_icons?.icons_and_links?.map((item) => {
          const key = normalize(item.icons_name);
          return {
            href: item.icon_url?.url || "#",
            icon: ["fab", faIconMap[key] || "question-circle"],
          };
        }) || [];

        // Reset and Re-init Observer
        this.visibleItems = new Array(20).fill(false);
        this.$nextTick(() => {
          this.initObserver();
        });
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    },

    initObserver() {
      if (this.observer) {
        this.observer.disconnect();
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const elements = Array.from(this.$refs.listItems || []);
              const index = elements.indexOf(entry.target);
              if (index !== -1) {
                // Use $set if using Vue 2, or direct assignment for Vue 3
                this.visibleItems[index] = true;
              }
              this.observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (this.$refs.listItems) {
        Array.from(this.$refs.listItems).forEach((el) => this.observer.observe(el));
      }
    },
  },

  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>