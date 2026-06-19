<template>
  <div>
    <Loader v-if="pending" />
    
    <!-- <article v-else-if="blogPost" class="mx-auto max-w-7xl px-5 pt-[150px] custom_family">
      <div class="mb-10">
        <span class="text-[#233267] font-bold text-[15px] tracking-widest uppercase mb-2 block">
          {{ blogPost.category }}
        </span>
        <h1 class="mb-8 text-[50px] font-medium leading-tight ">{{ blogPost.title }}</h1>
        <div class="mt-6 flex items-start gap-4">
          <img :src="blogPost.author.image" :alt="blogPost.author.name" class="w-12 h-12 rounded-full object-cover" />
          <div>
            <div class="mb-1 font-bold text-stone-600">
              <router-link to='/author' class="hover:text-[#233267] transition-colors">
                {{ blogPost.author.name }}
              </router-link>
            </div>
            <div class="text-sm text-stone-500">{{ blogPost.author.role }} · {{ blogPost.date }}</div>
          </div>
        </div>
      </div>

      <hr class="mb-8">

      <div class="flex gap-10 pb-10">
        <div class="flex-1">
          <div v-if="blogPost.featured_image" class="mb-10">
            <img :src="blogPost.featured_image" :alt="blogPost.title" class="w-full rounded-xl shadow-sm" />
          </div>

          <div 
            class="prose max-w-none blog-content" 
            v-html="blogPost.content" 
            ref="contentContainer"
          ></div>
        </div>

        <aside class="w-[340px] shrink-0">
          <div class="sticky top-24 space-y-8">
            <div class="rounded-xl bg-white shadow-md p-6 border">
                    <div class="mb-3 text-base font-semibold">
                        Try the DSPCRM platform
                    </div>

                    <p class="!text-muted mb-6">
                        We've helped productized agencies like yours sell $500M+
                        in services.
                    </p>

                    <div class="flex flex-wrap items-center gap-4">
                        
                        <div class="flex flex-col justify-center">
                            <div class="mx-auto">
                                <a href="" class="group/link btn-primary flex flex-none items-center gap-3 px-4 py-3">
                                    <span class="flex items-center -space-x-1">
                                        <img :src="blogPost.author.image" alt="Deian Isac" width="48" height="48" class="outline-accent group-hover/link:to-vermillion-300 group-hover/link:outline-vermillion-500 from-apricot-100 to-apricot-300 size-6 rounded-full bg-gradient-to-b shadow-sm outline outline-2 transition-all delay-75 duration-300" loading="lazy">
                                        <img :src="blogPost.author.image" alt="Alex Zakka" width="48" height="48" class="outline-accent group-hover/link:to-vermillion-300 group-hover/link:outline-vermillion-500 from-apricot-100 to-apricot-300 size-6 rounded-full bg-gradient-to-b shadow-sm outline outline-2 transition-all delay-75 duration-300" loading="lazy">
                                    </span>
                                    <span class="font-semibold">
                                        Book a Demo
                                    </span>
                                </a>
                            </div>
                        </div>

                        
                        <div class="flex-none text-left">
                            <span class="block text-sm text-black/60">
                                Ready?
                            </span>
                            <a  class="group/link">
                                <span class="text-body group-hover/link:text-accent block font-medium transition-colors delay-75 duration-300">
                                    Try It Free
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

            <div v-if="headings.length > 0" class="rounded-xl bg-white shadow-md p-6 border">
              <h4 class="text-xs font-medium tracking-wider text-stone-500 uppercase mb-4">On this page</h4>
              
              <ol class="border-stone-100 space-y-3 border-l" id="table-of-contents">
                <li v-for="(heading, index) in headings" :key="index">
                  <a 
                    :href="'#' + heading.id" 
                    @click.prevent="scrollToHeading(heading.id)"
                    class="block border-l-2 text-[13px] pl-3 leading-snug transition-all duration-300"
                    :class="[
                      activeId === heading.id 
                        ? 'border-[#233267] text-[#233267] font-semibold opacity-100' 
                        : 'border-transparent text-stone-500 opacity-70 hover:opacity-100 hover:text-[#233267]'
                    ]"
                  >
                    {{ heading.text }}
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </aside>
      </div>
    </article> -->

    <div v-if="error" class="text-center text-red-500 py-20 font-medium">
      Error loading blog post. Please try again.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useHead, useAsyncData } from '#imports'
import Loader from "@/components/Sections/Loader.vue"

const route = useRoute()
const slug = route.params.slug as string

// Reactive State
const blogPost = ref<any>(null)
const error = ref(false)
const headings = ref<{ text: string; id: string }[]>([])
const contentContainer = ref<HTMLElement | null>(null)
const activeId = ref<string | null>(null)
let observer: IntersectionObserver | null = null;

// --- 1. FUNCTIONS DEFINED FIRST ---

/**
 * Highlights the correct TOC link based on scroll position
 */
const setupObserver = () => {
  if (observer) observer.disconnect();
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Use isIntersecting to find which H2 is currently in view
      if (entry.isIntersecting) {
        activeId.value = entry.target.id;
      }
    });
  }, {
    // rootMargin helps trigger the "Active" state when the heading is near the top
    rootMargin: '0px 0px -75% 0px', 
    threshold: 0.1
  });

  const h2s = contentContainer.value?.querySelectorAll('h2');
  h2s?.forEach((h2) => observer?.observe(h2));
}

/**
 * Parses the v-html content to find H2 tags for the TOC
 */
const generateHeadings = async () => {
  await nextTick(); // Wait for v-html to be rendered
  if (contentContainer.value) {
    const h2Elements = contentContainer.value.querySelectorAll('h2')
    headings.value = Array.from(h2Elements).map((el, index) => {
      const id = el.id || `section-${index}`
      el.id = id // Inject ID if missing
      return { text: el.textContent?.trim() || '', id }
    })
    setupObserver();
  }
}

/**
 * Smoothly glides to the target section
 */
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 120; // Accounts for a sticky site header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({ 
      top: offsetPosition, 
      behavior: 'smooth' 
    });

    // Update the URL without jumping the page
    history.pushState(null, '', `#${id}`);
    activeId.value = id;
  }
}

// --- 2. DATA FETCHING ---

const { data, pending, error: fetchError } = await useAsyncData(
  `blog-${slug}`,
  () => $fetch(`https://admin.dspcrm.com/wp-json/custom/v1/blog/${slug}`),
  { lazy: true } // Allows component to mount and show Loader immediately
)

// --- 3. WATCHERS & LIFECYCLE ---

watch(data, (newData) => {
  if (newData) {
    blogPost.value = newData
    
    // Set SEO Meta
    useHead({
      title: blogPost.value.title,
      meta: [
        { name: 'description', content: blogPost.value.content.replace(/<[^>]+>/g, '').slice(0, 150) }
      ]
    })

    // Create TOC
    generateHeadings()
  }
}, { immediate: true })

watch(fetchError, (err) => {
  if (err) error.value = true
})

onMounted(() => {
  // Fallback for SSR hydration
  if (data.value) generateHeadings()
})

onUnmounted(() => {
  if (observer) observer.disconnect();
})
</script>

<style scoped>
/* Blog Content Typography */
.blog-content :deep(h2) {
  font-size: 36px;
  font-weight: 700;
  margin: 48px 0 24px;
  color: #1a1a1a;
  line-height: 1.2;
  scroll-margin-top: 130px; /* Offset for smooth scroll landing */
}

.blog-content :deep(h3) {
  font-size: 24px;
  font-weight: 600;
  margin: 32px 0 16px;
}

.blog-content :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  color: #374151;
  font-size: 18px;
}

.blog-content :deep(img) {
  border-radius: 1rem;
  width: 100%;
  margin: 2.5rem 0;
}

/* TOC Styling cleanup */
#table-of-contents li::before {
  content: none !important;
}

:deep(li) {
  padding-left: 0;
}

/* Global browser smooth scrolling */
:global(html) {
  scroll-behavior: smooth;
}
:deep(.btn-primary){
      color: #233267;
    border-radius: 6px;
    border: 2px solid #233267;
}
</style>