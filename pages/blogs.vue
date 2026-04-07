<template>
  <div class="min-h-screen bg-[#FAFAFA] custom_family">

    <section class="max-w-7xl mx-auto px-6 py-20">
      <div class="text-center mb-10 pt-20">
        <h2 class="xl:text-[45px] text-center text-[20px] text-[#00296b] font-bold leading-tight tracking-tight mb-0">
          Latest posts
        </h2>
        <p class="text-[#8a7560] text-sm">Read the latest guides for your firm</p>
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <p class="animate-pulse text-gray-400">Fetching latest insights...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div v-for="post in latestPosts" :key="post.id" 
             @click="navigateTo('/blog/' + post.slug)"
             class="bg-white blog_box rounded-[20px] overflow-hidden p-[15px] shadow-[0_0_20px_-11px_black] transition-all duration-300 cursor-pointer h-full flex flex-col hover:-translate-y-1 hover:shadow-lg group">
          
          <div class="w-full h-[200px] md:h-[240px] overflow-hidden bg-gray-100 rounded-t-[15px]">
            <img :src="post.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" :alt="post.title">
          </div>
          
          <div class="p-5 md:p-6 flex flex-col gap-[10px] flex-1">
            <div class="flex items-center gap-[15px] mb-3 text-sm">
              <span class="text-[#000] font-semibold uppercase tracking-wide text-xs">{{ post.category }}</span>
              <span class="text-gray-500 text-sm">{{ post.date }}</span>
            </div>
            <h3 class="text-lg md:text-xl font-bold text-[#00296b] leading-snug line-clamp-2">{{ post.title }}</h3>
            <p class="text-gray-500 text-[15px] leading-relaxed mb-5 flex-1 line-clamp-2">{{ post.excerpt }}</p>
            
            <div class="flex items-center gap-2 text-[#00296B] font-semibold text-[15px] group-hover:text-[#0052CC]">
              Read More
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[20px] transition-transform duration-300 group-hover:translate-x-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="growthSection.featured" class="max-w-7xl mx-auto pb-16 px-6 font-sans">
      <div class="headers pb-12 text-center">
        <h2 class="xl:text-[40px] text-[20px] text-[#00296b] font-bold">Scaling & Strategic Growth</h2>
        <p class="text-[#8a7560] text-sm">Deep dives into agency expansion</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <div class="max-w-8xl w-full flex flex-col md:flex-row bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
             @click="navigateTo('/blog/' + growthSection.featured.slug)">
          <div class="md:w-1/2 overflow-hidden">
            <img :src="growthSection.featured.image" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
          <div class="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-bold text-gray-900 leading-tight mb-2 hover:text-red-600 transition-colors">
               {{ limitWords(growthSection.featured.title, 10) }}
              </h3>
              <span class="text-xs text-gray-400 font-medium">Featured Guide</span>
              <p class="text-sm text-gray-500 mt-4 leading-relaxed line-clamp-3">
                {{ growthSection.featured.excerpt }}
              </p>
            </div>
            
            <div class="mt-8">
              <div class="flex items-center gap-3 mb-4">
                <img :src="growthSection.featured.authorImg" class="w-8 h-8 rounded-full" />
                <span class="text-sm font-semibold text-gray-700">{{ growthSection.featured.author }}</span>
              </div>
              <div class="flex items-center justify-between text-[11px] text-gray-400">
                <button class="text-red-500 font-bold uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all">
                  Read more <span class="text-lg leading-none">›</span>
                </button>
                <span>{{ growthSection.featured.date }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-3xl w-full">
          <div class="divide-y divide-gray-100">
            <article v-for="(post, index) in growthSection.list" :key="index" 
                     @click="navigateTo('/blog/' + post.slug)"
                     class="py-2 first:pt-0 group cursor-pointer">
              <h4 class="text-[15px] font-bold text-[#00296B] group-hover:text-[rgb(0, 0, 0)
] transition-colors mb-1">
               {{ limitWords(post.title, 10) }}
              </h4>
              <time class="text-xs text-[#00296B]">{{ post.date }}</time>
            </article>
          </div>
          
          <div class="mt-6 pt-6 border-t border-gray-100">
            <button class="text-[#00296B] text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all italic">
              View all in Growth <span class="text-lg leading-none">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// WordPress API Base URL
const WP_API = 'https://admin.dspcrm.com/wp-json/wp/v2';

// 1. Fetch Latest Posts (Top 3 Cards)
const { data: latestPosts, pending } = await useFetch(`${WP_API}/posts`, {
  params: {
    _embed: 1,
    per_page: 3,
    status: 'publish'
  },
  transform: (posts) => posts.map(post => ({
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    date: new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    excerpt: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 110) + '...',
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400',
    category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Insights'
  }))
});

// 2. Fetch Growth Category Posts
const { data: growthSection } = await useFetch(`${WP_API}/posts`, {
  params: {
    _embed: 1,
    per_page: 5,
    // categories: 5, // Change this to your actual category ID if needed
  },
  transform: (posts) => {
    if (!posts.length) return { featured: null, list: [] };
    
    const formatted = posts.map(post => ({
      title: post.title.rendered,
      slug: post.slug,
      date: new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      excerpt: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x600',
      author: post._embedded?.['author']?.[0]?.name || 'Admin',
      authorImg: post._embedded?.['author']?.[0]?.avatar_urls?.['96'] || 'https://via.placeholder.com/32'
    }));

    return {
      featured: formatted[0],
      list: formatted.slice(1)
    };
  }
});
const limitWords = (text, limit) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(' ') + '...';
};
// Utility to navigate
const navigateTo = (path) => {
  const router = useRouter();
  router.push(path);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;700&display=swap');

.custom_family {
  font-family: 'DM Sans', sans-serif;
}


.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>