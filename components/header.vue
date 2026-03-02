<template>
  <header class="w-full py-5 pt-11 absolute top-0 z-50">
    <div class="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-8">
      
      <div class="flex justify-start xl:max-w-[25rem] md:max-w-sm lg:max-w-[20rem] w-full">
        <NuxtLink to="/" class="flex items-center gap-2 logo">
          <img src="http://admin.dspcrm.com/wp-content/uploads/2026/02/DSP-final-logo-4-cropped.svg" alt="DSP Logo" class="w-[75%] md:w-full"/>
        </NuxtLink>
      </div>

      <div 
        :class="[
          'mobile fixed top-0 left-0 w-full h-full bg-[#00296B] text-white z-50 px-8 py-10 transition-all duration-300 ease-in-out transform lg:hidden',
          isMenuOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-full pointer-events-none'
        ]"
      >
        <div class="flex items-start flex-col space-y-8 overflow-auto h-full text-left">
          <button @click="isMenuOpen = false" class="absolute right-[10%] focus:outline-none">
            <svg class="h-8 w-8" fill="white" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav class="flex flex-col space-y-6 w-full mt-10">
            <NuxtLink to="/" @click="isMenuOpen = false" class="text-xl font-semibold">Features</NuxtLink>
            <NuxtLink to="/" @click="isMenuOpen = false" class="text-xl font-semibold">Use Cases</NuxtLink>
            <NuxtLink to="/" @click="isMenuOpen = false" class="text-xl font-semibold">Resources</NuxtLink>
            <NuxtLink to="/" @click="isMenuOpen = false" class="text-xl font-semibold">Pricing</NuxtLink>
            
            <hr class="border-white/20 w-full">

            <a href="#" class="text-lg font-semibold">Free Trial</a>
            <a href="https://calendly.com/dspcrm-info/30min" target="_blank" class="border-2 border-white rounded-full px-5 py-3 text-lg font-semibold text-center hover:bg-white hover:text-[#00296B] transition-all">
              Sign up
            </a>
          </nav>
        </div>
      </div>

      <nav class="hidden lg:block text-white rounded-full px-6 py-4 ml-3">
        <div class="flex items-center space-x-1 text-[#00296B]">
         <li class="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-menu-megamenu mega-menu-item-has-children mega-align-bottom-left mega-menu-megamenu mega-menu-item-26" id="mega-menu-item-26">
                   <NuxtLink class="mega-menu-link router-link-active router-link-exact-active xl:px-4 px-2 xl:text-lg text-[14px] font-semibold rounded-full hover:bg-[#00296B]/10 py-2" to="/" aria-expanded="false" tabindex="0" >Features<span class="mega-indicator" aria-hidden="true"></span></NuxtLink>
<ul class="mega-sub-menu" style="">
<li class="mega-menu-item mega-menu-item-type-widget widget_custom_html mega-menu-column-standard mega-menu-columns-1-of-1 mega-menu-item-custom_html-3" style="--columns:1; --span:1" id="mega-menu-item-custom_html-3"><div class="textwidget custom-html-widget"><div class="bg-[#FAFAFA] py-10 px-5 rounded-xl mx-auto lg:rounded-md lg:shadow-lg max-w-7xl">
			<div class="flex flex-col lg:flex-row gap-6 items-center">
				<!-- Left Navigation -->
				<div class="grid grid-rows-1 md:grid-rows-3 gap-x-6 gap-y-6 flex-[2.8]">
					<div class="subitem-wrapper">
						<h5 class="text-[11px] font-bold text-[#233267] mb-2 pl-5">Sell</h5>
						<div class="sub-menu-items-wrapper grid grid-cols-3 gap-x-6 gap-y-6">
							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="SEO" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Client Portal</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Branded portal for orders, files, and messages.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Links" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Billing</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Subscriptions, invoices, and flexible checkout.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Local" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">CRM</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Track contacts, leads, and client history.</p>
								</div>
							</a>
						</div>
					</div>
					<div class="subitem-wrapper">
						<h5 class="text-[11px] font-bold text-[#233267] mb-2 pl-5">Service</h5>
						<div class="sub-menu-items-wrapper grid grid-cols-3 gap-x-6 gap-y-6">
							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="SEO" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Form &amp; Builder</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Drag &amp; drop forms with e-signatures.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Links" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Helpdesk</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Support tickets with full client context.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Local" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Local SEO</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">GMB optimization and local ranking packages.</p>
								</div>
							</a>
						</div>


					</div>
					<div class="subitem-wrapper">
						<h5 class="text-[11px] font-bold text-[#233267] mb-2 pl-5">Scale</h5>
						<div class="sub-menu-items-wrapper grid grid-cols-3 gap-x-6 gap-y-6">
							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="SEO" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Referrals</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Built-in affiliate and referral program.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Links" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Analytics</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Revenue insights and team performance.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">

								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Local" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">White-Label</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Let other agencies resell your services.</p>
								</div>
							</a>
						</div>
					</div>

				</div>

				<!-- Right Image -->
				<div class="bg-[url('http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-img.png')] bg-no-repeat bg-cover bg-center rounded-2xl p-6 text-white relative flex flex-col justify-between items-start shadow-lg flex-1 h-full">
					
					<div class="z-50">
						<h3 class="text-[15px] font-semibold leading-tight">All-in-one platform</h3>
						<p class="text-[15px] mt-5 font-medium leading-tight">Sell, service,scale <span class="font-semibold"> in oneplatform.</span></p>
					</div>
					<div class="relative z-10 mt-10">
						<a href="#" class="w-full text-center border border-white border-2 rounded-md py-1.5 px-5 text-[8px] font-light hover:bg-white hover:text-[#1a2b56] transition-all">Book a Demo</a>
					</div>
				</div>
	</div>
</div></div></li></ul>
</li>
          <li class="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-menu-megamenu mega-menu-item-has-children mega-align-bottom-left mega-menu-megamenu mega-menu-item-26" id="mega-menu-item-26">
                   <NuxtLink class="mega-menu-link router-link-active router-link-exact-active xl:px-4 px-2 xl:text-lg text-[14px] font-semibold rounded-full hover:bg-[#00296B]/10 py-2" to="/" aria-expanded="false" tabindex="0" >Use Cases<span class="mega-indicator" aria-hidden="true"></span></NuxtLink>
<ul class="mega-sub-menu" style="">
<li class="mega-menu-item mega-menu-item-type-widget widget_custom_html mega-menu-column-standard mega-menu-columns-1-of-1 mega-menu-item-custom_html-3" style="--columns:1; --span:1" id="mega-menu-item-custom_html-3"><div class="textwidget custom-html-widget"><div class="bg-[#FAFAFA] py-10 px-5 rounded-xl mx-auto lg:rounded-md lg:shadow-lg max-w-7xl">
			<div class="flex flex-col lg:flex-row gap-6 items-center">
				<!-- Left Navigation -->
				<div class="grid grid-rows-1 md:grid-rows-3 gap-x-6 gap-y-6 flex-[2.8]">
					<div class="subitem-wrapper">
						<h5 class="text-[11px] font-bold text-[#233267] mb-2 pl-5">Sell</h5>
						<div class="sub-menu-items-wrapper grid grid-cols-3 gap-x-6 gap-y-6">
							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://admin.dspcrm.com/wp-content/uploads/2026/03/mingcute_message-4-ai-fill.png" alt="SEO" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Client Portal</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Branded portal for orders, files, and messages.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Links" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Billing</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Subscriptions, invoices, and flexible checkout.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Local" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">CRM</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Track contacts, leads, and client history.</p>
								</div>
							</a>
						</div>
					</div>
					<div class="subitem-wrapper">
						<h5 class="text-[11px] font-bold text-[#233267] mb-2 pl-5">Service</h5>
						<div class="sub-menu-items-wrapper grid grid-cols-3 gap-x-6 gap-y-6">
							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="SEO" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Form &amp; Builder</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Drag &amp; drop forms with e-signatures.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Links" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Helpdesk</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Support tickets with full client context.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Local" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Local SEO</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">GMB optimization and local ranking packages.</p>
								</div>
							</a>
						</div>


					</div>
					<div class="subitem-wrapper">
						<h5 class="text-[11px] font-bold text-[#233267] mb-2 pl-5">Scale</h5>
						<div class="sub-menu-items-wrapper grid grid-cols-3 gap-x-6 gap-y-6">
							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="SEO" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Referrals</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Built-in affiliate and referral program.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">
								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Links" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">Analytics</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Revenue insights and team performance.</p>
								</div>
							</a>

							<a href="#" class="bg-[#D9D9D969] px-4 py-2 rounded-lg flex items-start gap-3 transition-all group cursor-pointer">

								<div class="mt-1 flex-shrink-0">
									<img src="http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-icon.svg" alt="Local" class="w-5 h-5 object-contain">
								</div>
								<div>
									<h4 class="font-bold text-[#233267] text-[15px]">White-Label</h4>
									<p class="text-[11px] font-light text-[#000000] leading-tight mt-1">Let other agencies resell your services.</p>
								</div>
							</a>
						</div>
					</div>

				</div>

				<!-- Right Image -->
				<div class="bg-[url('http://localhost/dsplocal/wp-content/uploads/2026/02/usecase-img.png')] bg-no-repeat bg-cover bg-center rounded-2xl p-6 text-white relative flex flex-col justify-between items-start shadow-lg flex-1 h-full">
					
					<div class="z-50">
						<h3 class="text-[15px] font-semibold leading-tight">All-in-one platform</h3>
						<p class="text-[15px] mt-5 font-medium leading-tight">Sell, service,scale <span class="font-semibold"> in oneplatform.</span></p>
					</div>
					<div class="relative z-10 mt-10">
						<a href="#" class="w-full text-center border border-white border-2 rounded-md py-1.5 px-5 text-[8px] font-light hover:bg-white hover:text-[#1a2b56] transition-all">Book a Demo</a>
					</div>
				</div>
	</div>
</div></div></li></ul>
</li>
          <NuxtLink to="/" class="xl:px-4 px-2 xl:text-lg text-[14px] font-semibold rounded-full hover:bg-[#00296B]/10 py-2">Resources</NuxtLink>
          <NuxtLink to="/pricing" class="xl:px-4 px-2 xl:text-lg text-[14px] font-semibold rounded-full hover:bg-[#00296B]/10 py-2">Pricing</NuxtLink>
        </div>
      </nav>

      <div class="lg:hidden flex items-center">
        <button @click="isMenuOpen = true" class="focus:outline-none">
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      <div class="hidden lg:flex flex-1 justify-end items-center">
        <div class="flex items-center space-x-8">
          <a href="#" class="text-[#00296B] font-semibold text-lg">Free Trial</a>
          <a href="https://calendly.com/dspcrm-info/30min" target="_blank" class="text-[#00296B] border-2 border-[#00296B] rounded-full px-6 py-2 text-lg font-semibold hover:bg-[#00296B] hover:text-white transition-all">
            Sign up
          </a>
        </div>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isMenuOpen = ref(false)

/* 1. Fetch SEO Data (SSR Friendly) */

  

/* 3. Handle Dynamic Assets (Styles/Links from API) */
onMounted(async () => {
  try {
    const res = await fetch(`https://admin.dspcrm.com/wp-json/myapi/v1/page/491?timestamp=${Date.now()}`);
    const data = await res.json();

    const htmlContent = data?.html_section?.section || "";
    if (!htmlContent) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const head = document.head;

    tempDiv.querySelectorAll("link, style").forEach((el) => {
      // Avoid duplicating tags
      const identifier = el.tagName === 'LINK' ? `[href="${el.href}"]` : '';
      if (!identifier || !head.querySelector(identifier)) {
        head.appendChild(el);
      }
    });
  } catch (err) {
    console.error("Asset Injection Error:", err);
  }
})
</script>

<style scoped>
.mobile {
  will-change: transform, opacity;
}
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

header {
  font-family: "Inter", sans-serif !important;
}

.custom-logo-link img {
  width: 75%;
}

/* Base Mega Menu Styles */
#mega-menu-menu-1 {
  display: flex !important;
  align-items: center !important;
  list-style: none !important;
}

#mega-menu-menu-1 .mega-menu-item {
  position: relative;
  list-style: none !important;
}

/* Header Link Styling */
#mega-menu-menu-1 > li.mega-menu-item > a.mega-menu-link {
  color: #00296b !important;
  padding: 0.5rem 0.5rem !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  border-radius: 9999px !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center;
  gap: 6px;
}

#mega-menu-menu-1 > li.mega-menu-item > a.mega-menu-link:hover {
  background-color: rgba(0, 41, 107, 0.1) !important;
}

/* Chevron Indicators */
.mega-menu .mega-indicator,
.mega-menu-toggle,
.mega-close {
  display: none !important;
}

#mega-menu-menu-1 .mega-menu-item-has-children > a.mega-menu-link::after,
#mobileMenu .mega-menu-item-has-children a.mega-menu-link::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid currentColor;
  transition: transform 0.5s ease;
  margin-top: 2px;
}

#mega-menu-menu-1 .mega-menu-item-has-children:hover > a.mega-menu-link::after,
#mobileMenu .mega-menu-item.is-active > a.mega-menu-link::after {
  transform: rotate(180deg);
}

/* Mobile Layout Adjustments */
#mobileMenu a.mega-menu-link {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 20px;
}

/* Desktop Nav Bar */
@media (min-width: 1280px) {
  #mega-menu-menu-1 > li.mega-menu-item > a.mega-menu-link {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    font-size: 1.125rem !important;
  }
}

/* Desktop Dropdown Behavior */
@media (min-width: 1024px) {
  #mega-menu-menu-1 .mega-sub-menu {
    opacity: 0;
    pointer-events: none;
    position: fixed;
    left: 0;
    right: 0;
    width: 100vw;
    padding-top: 24px;
    z-index: 999;
    transition: all 0.5s ease;
    transform: translateY(20px);
    margin: 0 !important;
  }
  #mega-menu-menu-1 .mega-menu-item:hover > .mega-sub-menu {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
  }
}

/* Mobile Dropdown Behavior (Fixes overlapping) */
@media (max-width: 1023px) {
  #mobileMenu {
    overflow-x: hidden;
  }

  /* Sub Menu */
  #mobileMenu .mega-sub-menu {
    display: block !important;
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    min-height: 100vh;
    z-index: 100;
    background: #fafafa !important;
    margin: 0 !important;
    padding: 0 !important;
    visibility: hidden;
    opacity: 0;
    transform: translateX(-100%);
    transition:
      transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.5s ease;
  }

  /* Active state */
  #mobileMenu .mega-menu-item.is-active > .mega-sub-menu {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }

  /* Colors */
  #mobileMenu .mega-sub-menu h4,
  #mobileMenu .mega-sub-menu h5 {
    color: #233267 !important;
  }
  #mobileMenu .mega-sub-menu p {
    color: #4b5563 !important;
  }

  #mobileMenu a.mega-menu-link {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center;
    width: 100%;
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: 20px;
    color: white !important;
  }
}
.mega-sub-menu{
    width: 1060px;
    position: absolute;
    display: block;
    top: 120px;
    left: 50%;
    transform: translate(-50%);
}
li{
  position:static;
}
li:before{
  content:none;
}
li::marker{
  content:none;
}
/* Ensure the parent li can trigger the hover */
.mega-menu-item {
  position: static; /* Required for full-width mega menus */
}

/* Desktop Hover Trigger */
@media (min-width: 1024px) {
  /* Show the menu when the parent LI is hovered */
  .mega-menu-item:hover > .mega-sub-menu {
    opacity: 1 !important;
    pointer-events: all !important;
    transform: translate(-50%, 0) !important; /* Adjusting for your centered positioning */
    visibility: visible;
  }

  /* Transition for the sub-menu */
  .mega-sub-menu {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    visibility: hidden;
    /* Keeps the menu centered based on your existing style */
    transform: translate(-50%, 10px); 
  }
}

/* Hover effect for individual items inside the mega menu */
.sub-menu-items-wrapper a {
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
}

.sub-menu-items-wrapper a:hover {
  background-color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
  border-color: #e5e7eb;
}

/* Subtle icon bounce on hover */
.sub-menu-items-wrapper a:hover img {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>