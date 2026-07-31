export default defineNuxtPlugin(() => {
  // Load CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css'
  document.head.appendChild(link)

  // Load the ESM bundle exactly like the CDN script, isolated from Vite/Nuxt's Vue
  const script = document.createElement('script')
  script.type = 'module'
  script.innerHTML = `
    import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
    createChat({
      webhookUrl: 'https://n8n.srv1254428.hstgr.cloud/webhook/a3cb34b2-e2ef-4c3c-b050-34b9b190e355/chat',
      initialMessages: [
        "Hi! 👋 I'm the DSP CRM assistant.",
        "Ask me anything about our features, pricing, or how we help agencies."
      ],
      i18n: {
        en: {
          title: 'DSP CRM Assistant',
          subtitle: 'Ask me anything about DSP CRM.',
          inputPlaceholder: 'Type your question...',
          getStarted: 'New Conversation',
          closeButtonTooltip: 'Close chat',
        },
      },
    });
  `
  document.body.appendChild(script)
})