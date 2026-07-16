<template>
   <section class="py-30 px-5 mt-[100px] shadow-xl md:py-10 custom_family founder" v-if="author">
        <div class="max-w-7xl mx-auto items-center justify-center rounded-[20px]">
            <div class="flex-col md:flex-col items-center justify-center gap-[60px] bg-white p-[30px] rounded-2xl md:gap-[60px] md:p-10 lg:p-[60px]">
                <div class="flex items-center justify-center mx-auto md:mx-0">
                   <div
  v-if="!author?.avatar"
  class="w-[70px] h-[70px] rounded-full bg-purple-700 text-white flex items-center justify-center text-[20px] font-semibold uppercase"
>
  {{ author?.name?.charAt(0) }}
</div>

<img
  v-else
  :src="author.avatar"
  :alt="author.name"
  class="w-[70px] h-[70px] rounded-full object-cover border-2 border-[#00296b]"
/>
                </div>
                <div class="flex flex-col gap-[7px] text-center md:text-left mt-[20px] md:mt-0 xl:mt-3">
                    
                        <h1 class="text-[45px] md:text-4xl lg:text-[42px] font-[600] text-[#00296b] mb-2 text-center">
                         {{ author.name }}
                        </h1>
                    
                   
                        <p class="text-lg text-[#000] font-[600] mb-6 text-center">
                            {{ author.role }}
                        </p>
                   
                  
                        <p class="text-center border-t-[1px] border-[#00296b] pt-[20px] text-base leading-relaxed text-gray-600 mb-5">
                          {{ author.bio }}
                        </p>
                 
                </div>
            </div>
        </div>
    </section>
    <section class="py-[60px] px-5 bg-white md:py-[0px] success " v-if="author">
        <div class="max-w-7xl mx-auto pb-10">
            <h2 class="custom_family xl:text-[45px] text-center text-[20px] text-[var(--bg-custom-color)] font-bold leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[70px] tracking-tight mb-0 aos-init aos-animate">
                Latest Articles
            </h2>
            <div class="flex flex-wrap gap-5  px-4 md:px-0 mt-6" >
            <div class="bg-white blog_box sm:w-[100%] mt-[0px] rounded-[20px] overflow-hidden p-[15px] shadow-[0_0_20px_-11px_black] transition-all duration-300 ease-in-out cursor-pointer h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,102,255,0.15)]" data-slug="getting-started-with-vue-3-a-comprehensive-guide" v-for="post in author.posts" :key="post.id">
                        <div class="w-full h-[200px] md:h-[240px] overflow-hidden bg-gray-100">
            <img width="300" height="169" src="https://admin.dspcrm.com/wp-content/uploads/2026/02/b238bcab-3565-4847-9d0f-4ac78d3d06be-300x169.png" class="rounded-tl-[20px] rounded-tr-[20px] w-full h-full object-cover wp-post-image" alt="" decoding="async" loading="lazy" srcset="https://admin.dspcrm.com/wp-content/uploads/2026/02/b238bcab-3565-4847-9d0f-4ac78d3d06be-300x169.png 300w, https://admin.dspcrm.com/wp-content/uploads/2026/02/b238bcab-3565-4847-9d0f-4ac78d3d06be-1024x576.png 1024w, https://admin.dspcrm.com/wp-content/uploads/2026/02/b238bcab-3565-4847-9d0f-4ac78d3d06be-768x432.png 768w, https://admin.dspcrm.com/wp-content/uploads/2026/02/b238bcab-3565-4847-9d0f-4ac78d3d06be.png 1280w" sizes="auto, (max-width: 300px) 100vw, 300px">                                                    </div>
                        <div class="p-5 md:p-6 flex flex-col gap-[10px]">
                            <div class="flex items-center  gap-[15px] mb-3 text-sm">
                                                                                                    <span class="text-[#000] font-semibold uppercase tracking-wide text-xs">Development</span>
                                                                <span class="text-gray-500 text-sm">February 23, 2026</span>
                            </div>
                            <h3 class="min-height-title text-lg md:text-xl font-bold text-[#00296b] font-[600]  leading-snug">{{ post.title }}</h3>
                            <p class="min-height-description text-gray-500 text-[15px] leading-relaxed mb-5 flex-1">You’re sending invoices, waiting days (or weeks) for clients to...</p>
                            <div class="flex items-center gap-2 text-[#00296b] font-semibold text-[15px] transition-all duration-300 hover:text-[#0052CC] group success">
                           <NuxtLink
  :to="`/blog/${post.slug}`"
  class="flex items-center gap-2 text-[#00296b] font-semibold text-[15px] transition-all duration-300 hover:text-[#0052CC] group-hover:translate-x-1"
>
  Read More
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-[20px] transition-transform duration-300 group-hover:translate-x-1"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
    />
  </svg>
</NuxtLink>
                            </div>
                        </div>
                    </div>
                            </div>
        </div>
    </section>
    </template>
    <script setup lang="ts">
const route = useRoute()

const { data: author } = await useAsyncData(
  () =>
    $fetch(
      `https://admin.dspcrm.com/wp-json/myapi/v1/author/${route.params.slug}`
    )
)
</script>
<style scoped>
.blog_box {
    max-width: 32%;
}
</style>