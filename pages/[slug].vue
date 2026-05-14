<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import {
  useHead,
  useAsyncData,
  useRouter,
  useRoute,
  createError,
  navigateTo
} from '#imports'

import AOS from 'aos'
import 'aos/dist/aos.css'
import Loader from "@/components/Sections/Loader.vue"
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const router = useRouter()
const route = useRoute()
const showLoader = ref(true)

/* =========================
  FETCH DATA
========================= */
const { data: pageData } = await useAsyncData(
  `page-content-${route.params.slug}`,
  async () => {
    const wpPage: any = await $fetch(
      'https://admin.dspcrm.com/wp-json/wp/v2/pages',
      { params: { slug: route.params.slug } }
    )
    if (!wpPage?.length) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
    const id = wpPage[0].id
    const customData: any = await $fetch(
      `https://admin.dspcrm.com/wp-json/custom/v1/page-${id}`
    )
    return { ...customData, wp_id: id }
  },
  { server: true, lazy: false }
)

/* =========================
  SEO PARSER (Regex based)
========================= */
function parseSeoHtml(html: string) {
  if (!html) return { title: '', meta: [] }

  let title = ''
  const meta: any[] = []

  const titleMatch = html.match(/<title>(.*?)<\/title>/i)
  if (titleMatch) title = titleMatch[1]

  const metaTags = html.match(/<meta[^>]+>/gi) || []
  metaTags.forEach((tag) => {
    const attrs: any = {}
    const attrMatches = tag.match(/([\w:-]+)="([^"]*)"/g) || []
    attrMatches.forEach((attr) => {
      const [key, value] = attr.split('=')
      attrs[key] = value.replace(/"/g, '')
    })
    meta.push(attrs)
  })

  return { title, meta }
}

/* =========================
  SEO INJECTION
========================= */
const rawSeoHtml = computed(() => pageData.value?.SEO?.description || '')

useHead(() => {
  const parsed = parseSeoHtml(rawSeoHtml.value)
  return {
    title: parsed.title || 'DSPCRM - Page',
    meta: parsed.meta,
    link: [
      {
        rel: 'canonical',
        href: pageData.value?.SEO?.canonical_url || `https://dspcrm.com${route.path}`
      }
    ],
    ...(pageData.value?.Author_page_custom_css
      ? {
          style: [
            {
              id: 'dynamic-page-css',
              innerHTML: (pageData.value?.Author_page_custom_css || '')
                .replace(/<\/?style[^>]*>/gi, '')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .trim()
            }
          ]
        }
      : {})
  }
})

/* =========================
  SECTIONS
========================= */
const apiSections = computed(() => {
  if (!pageData.value) return {}
  const excludeKeys = ['id', 'title', 'link', 'wp_id', 'SEO', 'Author_page_custom_css']
  return Object.keys(pageData.value).reduce((acc, key) => {
    const value = (pageData.value as any)[key]
    if (typeof value === 'string' && !excludeKeys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
})

/* =========================
  PAGE CLASS
========================= */
const wpClass = computed(() => {
  return pageData.value?.wp_id ? `page-id-${pageData.value.wp_id}` : ''
})

/* =========================
  SCRIPTS
========================= */
function initializeScripts() {
  document.querySelectorAll('.testimonialSwiper, .mySwiper').forEach((slider: any) => {
    if (slider.swiper) return
    new Swiper(slider, {
      modules: [Autoplay, Pagination],
      loop: true,
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true
      }
    })
  })
  AOS.init({ duration: 1000, once: true })
}


//Calculator
const initCalculator = () => {
  console.log('🔥 Initializing calculator...');
  
  // 🧹 CLEANUP previous listeners
  calculatorListeners.forEach(cleanup => cleanup());
  calculatorListeners = [];
  
  const btn = document.getElementById("calculateBtn") as HTMLButtonElement;
  
  if (!btn) {
    console.warn('❌ Calculator button missing');
    return;
  }

  // Parse functions
  const parseNumber = (val: string): number => {
    return parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
  };

  const parsePercent = (val: string): number => {
    return (parseFloat(val.replace("%", "").replace(/[^0-9.-]+/g, "")) || 0) / 100;
  };

  // Get form data safely
  const getFormData = () => {
    // Helper to extract value whether ID is on the input or its wrapper div
    const getVal = (id: string): string | undefined => {
      // Use querySelectorAll to catch duplicate IDs a page builder might have created
      const elements = document.querySelectorAll(`[id="${id}"]`);
      if (elements.length === 0) return undefined;

      // Find the *visible* instance of this ID on the page (ignores hidden mobile/desktop clones)
      let targetEl = elements[elements.length - 1]; 
      for (let i = elements.length - 1; i >= 0; i--) {
        if ((elements[i] as HTMLElement).offsetParent !== null) {
          targetEl = elements[i];
          break;
        }
      }

      if (targetEl.tagName === 'INPUT' || targetEl.tagName === 'SELECT') {
        return (targetEl as HTMLInputElement | HTMLSelectElement).value;
      }
      
      const child = targetEl.querySelector('input, select') as HTMLInputElement | HTMLSelectElement | null;
      return child ? child.value : undefined;
    };

    return {
      profit: parseNumber(getVal("profit") || '0'),
      recurringRevenue: parsePercent(getVal("recurring") || '0'),
      topClientRevenue: parsePercent(getVal("topClient") || '0'),
      service: getVal("service") || 'SEO & Digital Marketing',
      ownerDependency: getVal("owner") || "I'm involved but not essential",
      years: getVal("years") || '3-5 years',
      teamSize: getVal("team") || '2-5 people'
    };
  };

  const generateRecommendations = (data: any) => {
    let risks: string[] = [];
    let growth: string[] = [];

    // Risks
    if (data.ownerDependency !== "Not involved") {
        risks.push("Document key processes and train team members to reduce owner dependency.");
    }
    if (data.topClientRevenue > 0.25) {
        risks.push("Diversify your client base. High concentration in one client significantly lowers your multiple.");
    }
    if (data.teamSize === "2-5 people") {
        risks.push("Build out your middle management or key contractors to distribute risk.");
    }
    if (risks.length === 0) {
        risks.push("Consistently review client contracts and service agreements to lock in your current low-risk profile.");
    }

    // Growth
    if (data.recurringRevenue < 0.6) {
        growth.push("Develop more subscription-based or retainer service offerings.");
    } else {
        growth.push("Increase pricing on your highly-demanded recurring services.");
    }

    if (data.service === "Web Development" || data.service === "Design") {
        growth.push("Add automated maintenance plans to convert one-off projects into recurring monthly revenue.");
    }

    growth.push("Implement professional business management tools like Wayfront to track margins and capacity.");
    growth.push("Track key metrics monthly to monitor progress and valuation improvements.");

    return { risks, growth };
  };

  // Core calculation
  const calculateValuation = (data: any) => {
    let multiple = 3;

    // Recurring revenue
    if (data.recurringRevenue >= 0.8) multiple += 1;
    else if (data.recurringRevenue >= 0.5) multiple += 0.5;

    // Top client risk
    let riskLevel = "Low";
    if (data.topClientRevenue > 0.4) {
      multiple -= 1;
      riskLevel = "High";
    } else if (data.topClientRevenue > 0.25) {
      multiple -= 0.5;
      riskLevel = "Medium";
    }

    const serviceMap: Record<string, number> = {
      "SEO & Digital Marketing": 0.5,
      "Paid Advertising": 0.4,
      "Web Development": 0.2,
      "Design": 0.1
    };

    const ownerMap: Record<string, number> = {
      "Not involved": 1,
      "I'm involved but not essential": 0.5,
      "Highly dependent": -1
    };

    const yearsMap: Record<string, number> = {
      "0-2 years": -0.5,
      "3-5 years": 0.3,
      "5+ years": 0.7
    };

    const teamMap: Record<string, number> = {
      "2-5 people": 0.2,
      "6-10 people": 0.5,
      "10+ people": 1
    };

    multiple += serviceMap[data.service] || 0;
    multiple += ownerMap[data.ownerDependency] || 0;
    multiple += yearsMap[data.years] || 0;
    multiple += teamMap[data.teamSize] || 0;

    multiple = Math.min(Math.max(multiple, 1), 6);

    const valuation = Math.round(data.profit * multiple);
    
    // Estimate +/- 10% for range
    const valLow = Math.round(valuation * 0.9);
    const valHigh = Math.round(valuation * 1.1);

    // Calculate industry benchmark based on multiple
    let benchmark = "Average";
    if (multiple >= 4.5) benchmark = "Above Average";
    else if (multiple <= 3.0) benchmark = "Below Average";

    return {
      valuation: valuation,
      valLow: valLow,
      valHigh: valHigh,
      multiple: multiple.toFixed(1),
      riskLevel: riskLevel,
      benchmark: benchmark,
      service: data.service,
      recurring: Math.round(data.recurringRevenue * 100)
    };
  };

  // Update UI
  const updateUI = (result: any, data: any) => {
    // Old simple UI fallback
    const valuationEl = document.getElementById("valuation");
    const multipleEl = document.getElementById("multiple");
    if (valuationEl) valuationEl.innerText = `$${result.valuation.toLocaleString()}`;
    if (multipleEl) multipleEl.innerText = `${result.multiple}x Multiple`;

    // New Advanced UI elements
    const rangeEl = document.getElementById("val-range");
    const valMultipleEl = document.getElementById("val-multiple");
    const riskEl = document.getElementById("val-risk");
    const benchEl = document.getElementById("val-benchmark");
    const analysisEl = document.getElementById("val-analysis");
    const resultContainer = document.getElementById("result-container");

    if (rangeEl) rangeEl.innerHTML = `$${result.valLow.toLocaleString()} - <br>$${result.valHigh.toLocaleString()}`;
    if (valMultipleEl) valMultipleEl.innerText = `${result.multiple}x`;
    if (riskEl) riskEl.innerText = result.riskLevel;
    if (benchEl) benchEl.innerText = result.benchmark;
    
    if (analysisEl) {
      analysisEl.innerText = `Your agency is valued at ${result.multiple}x annual profit, which is ${result.benchmark.toLowerCase()} for the industry. This valuation is based on your ${result.service.toLowerCase()} service offering, ${result.recurring}% recurring revenue, and ${result.riskLevel.toLowerCase()} risk profile.`;
    }

    const recs = generateRecommendations(data);
    const riskListEl = document.getElementById("risk-list");
    const growthListEl = document.getElementById("growth-list");
    
    const iconSVG = `<svg class="w-5 h-5 text-[#FA461E] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;

    if (riskListEl) {
       riskListEl.innerHTML = recs.risks.map(r => `<li class="flex items-start gap-3 mb-3">${iconSVG}<span class="text-gray-600 text-sm xl:text-base leading-relaxed">${r}</span></li>`).join('');
    }
    
    if (growthListEl) {
       growthListEl.innerHTML = recs.growth.map(r => `<li class="flex items-start gap-3 mb-3">${iconSVG}<span class="text-gray-600 text-sm xl:text-base leading-relaxed">${r}</span></li>`).join('');
    }

    if (resultContainer) {
      resultContainer.classList.remove('hidden');
    }
    
    // Hide recommendations box upon a very new calculation until they explicitly click the button again
    const recContainer = document.getElementById("recommendations-container");
    if (recContainer) {
      recContainer.classList.add('hidden');
    }

    console.log('✅ Updated:', result);
  };

  // Main handler
  const handleCalculate = (e?: Event) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    
    console.log('🔘 Calculate clicked');
    const data = getFormData();
    console.log('📊 Data:', data);
    
    const result = calculateValuation(data);
    updateUI(result, data);
  };

  // 🎯 Add SINGLE event listener per element
  btn.addEventListener("click", handleCalculate);
  calculatorListeners.push(() => btn.removeEventListener("click", handleCalculate));

  // Recommendation Button logic
  const recBtn = document.getElementById("getRecommendationsBtn");
  const recContainer = document.getElementById("recommendations-container");
  if (recBtn && recContainer) {
    const showRecs = (e: Event) => {
      e.preventDefault();
      recContainer.classList.remove('hidden');
      setTimeout(() => {
         recContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    };
    recBtn.addEventListener("click", showRecs);
    calculatorListeners.push(() => recBtn.removeEventListener("click", showRecs));
  }

  console.log('✅ Calculator ready and waiting for click!');
};
/* =========================
  FILTERS
========================= */
function initFilters() {
  const categoryItems = document.querySelectorAll('.toogle_sidebar li')
  const typeItems = document.querySelectorAll('.type_sidebar li')
  const toolBoxes = document.querySelectorAll('.tool_box')
  if (!toolBoxes.length) return

  const applyFilters = () => {
    const activeCategory =
      (document.querySelector('.toogle_sidebar li.active')?.getAttribute('data-filter') || 'all').toLowerCase()
    const activeType =
      (document.querySelector('.type_sidebar li.active')?.getAttribute('data-type') || 'all').toLowerCase()

    toolBoxes.forEach((box: HTMLElement) => {
      const category = box.getAttribute('data-category')?.toLowerCase() || ''
      const type = box.getAttribute('data-type')?.toLowerCase() || ''
      const show =
        (activeCategory === 'all' || category === activeCategory) &&
        (activeType === 'all' || type === activeType)
      box.classList.toggle('show', show)
      box.classList.toggle('hide', !show)
    })

    // 🔑 Hide headings if all their boxes are hidden
    const headings = document.querySelectorAll('.content_side h2')
    headings.forEach((heading: HTMLElement) => {
      const container = heading.nextElementSibling // the div with tool_box children
      if (!container) return
      const boxes = container.querySelectorAll('.tool_box')
      const allHidden = Array.from(boxes).every(box => box.classList.contains('hide'))
      heading.style.display = allHidden ? 'none' : ''
      container.setAttribute("style", allHidden ? "display:none" : "") // optional: hide container too
    
     if (allHidden) {
      heading.classList.add('hide')
      heading.classList.remove('mt-16') // remove margin classes
      container.classList.add('hide')
    } else {
      heading.classList.remove('hide')
      container.classList.remove('hide')
      // optional: restore margin classes if needed
      if (!heading.classList.contains('mb-6') && !heading.classList.contains('mt-16')) {
        heading.classList.add('mb-6') // or whichever margin you want as default
      }
    }
    })
  }

  categoryItems.forEach((item: HTMLElement) => {
    item.addEventListener('click', () => {
      categoryItems.forEach(li => li.classList.remove('active'))
      item.classList.add('active')
      applyFilters()
    })
  })

  typeItems.forEach((item: HTMLElement) => {
    item.addEventListener('click', () => {
      typeItems.forEach(li => li.classList.remove('active'))
      item.classList.add('active')
      applyFilters()
    })
  })

  applyFilters()
}
/* =========================
  MOUNTED
========================= */
onMounted(() => {
  document.addEventListener('click', (e: any) => {
    const link = e.target.closest('a')
    if (!link) return
    const url = link.getAttribute('href')
    if (!url) return
    if (url.startsWith('/')) {
      e.preventDefault()
      navigateTo(url)
    }
  })

  setTimeout(() => {
    showLoader.value = false
    nextTick(() => {
      const BASE_URL = 'https://admin.dspcrm.com'
      document.querySelectorAll('.success img').forEach((img: HTMLImageElement) => {
        let src = img.getAttribute('src') || img.src
        if (src && !src.startsWith('http')) {
          img.src = `${BASE_URL}${src}`
        }
      })
      initializeScripts()
      initCalculator()
      initFilters()
    })
  }, 300)
})
</script>

<template>
  <div>
    <Loader v-if="showLoader" />
    <div class="wp-content" :class="[{ 'content-hidden': showLoader }, wpClass]">
      <div v-if="pageData">
        <div v-for="(sectionContent, key) in apiSections" :key="key" v-html="sectionContent" />
      </div>
      <div v-else-if="!showLoader" class="error">
        <h1 class="text-3xl font-bold">Page Not Found</h1>
        <button @click="router.push('/')" class="mt-4 underline">Go Home</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.max-w-8xl){
  max-width: 90rem;
  margin: 0 auto;
}
.content-hidden {
  visibility: hidden;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.tool_box) {
  transition: all 0.4s ease;
  max-width:31.4%;
  width:100%;
  border:2.17px solid #fff
}

:deep(.tool_box.hide) {
  opacity: 0;
  transform: scale(0.9);
  pointer-events: none;
  position: absolute;
}

.wp-content {
  width: 100%;
  min-height: 80vh;
}

.content-hidden {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}
:deep(.page-id-1159 .head.text-center ){
    max-width: 700px;
    margin: auto;
}

:deep(.page-id-1159 .head.text-center h2) {
    margin-bottom: 40px;
    line-height: 110%;
}
@media screen and (min-width:320px) and (max-width:768px){
:deep(.tool_box) {
  max-width:100%;
}
:deep(.page-id-659 .left_right) {
     padding-top: 20px;
    padding-bottom: 20px;
}
:deep(.page-id-649 .left_right) {
     padding-top: 20px;
    padding-bottom: 20px;
}
:deep(.page-id-662 .left_right) {
     padding-top: 30px;
    padding-bottom: 30px;
}
:deep(.page-id-662 .local-seo_button) {
    padding-bottom: 40px;
}
:deep(.page-id-1154 .reday) {
    padding-top: 0;
}
}
@media screen and (min-width:1024px) and (max-width:1200px) {
  :deep(h1),:deep(h2){
font-size:35px !important;
line-height:40px !important;

}
:deep(.tool_box) {
  max-width:45%;
}
}
</style>