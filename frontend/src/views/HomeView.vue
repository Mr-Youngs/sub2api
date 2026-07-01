<template>
  <!-- Custom Home Content: Full Page Mode -->
  <div v-if="homeContent" class="min-h-screen">
    <!-- iframe mode -->
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <!-- HTML mode - SECURITY: homeContent is admin-only setting, XSS risk is acceptable -->
    <div v-else v-html="homeContent"></div>
  </div>

  <!-- Default Home Page -->
  <div
    v-else
    class="relative flex min-h-screen flex-col overflow-hidden bg-[#fefefd] dark:bg-[#1f2230]"
  >
    <!-- Background Decorations -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(41,44,59,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(41,44,59,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"
      ></div>
    </div>

    <!-- Header -->
    <header class="relative z-20 px-6 py-4">
      <nav class="mx-auto flex max-w-6xl items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="h-10 w-10 overflow-hidden rounded-lg shadow-sm">
            <img :src="siteLogo || '/logo.png'" alt="Logo" class="h-full w-full object-contain" />
          </div>
        </div>

        <!-- Nav Actions -->
        <div class="flex items-center gap-3">
          <!-- Language Switcher -->
          <LocaleSwitcher />

          <!-- Doc Link -->
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="home-icon-button"
            :title="t('home.viewDocs')"
          >
            <Icon name="book" size="md" />
          </a>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="home-icon-button"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>

          <!-- Login / Dashboard Button -->
          <router-link
            v-if="isAuthenticated"
            :to="dashboardPath"
            class="inline-flex items-center gap-1.5 rounded-md bg-[#292C3B] py-1 pl-1 pr-2.5 transition-colors hover:bg-[#3B4256] dark:bg-[#292C3B] dark:hover:bg-[#3B4256]"
          >
            <span
              class="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0C845] text-[10px] font-semibold text-[#292C3B]"
            >
              {{ userInitial }}
            </span>
            <span class="text-xs font-medium text-white">{{ t('home.dashboard') }}</span>
            <svg
              class="h-3 w-3 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </router-link>
          <router-link
            v-else
            to="/login"
            class="inline-flex items-center rounded-md bg-[#292C3B] px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-[#3B4256] dark:bg-[#292C3B] dark:hover:bg-[#3B4256]"
          >
            {{ t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 flex-1 px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <!-- Hero Section - Left/Right Layout -->
        <div class="mb-12 flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16">
          <!-- Left: Text Content -->
          <div class="flex-1 text-center lg:text-left">
            <h1
              class="mb-4 text-4xl font-semibold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
            >
              {{ siteName }}
            </h1>
            <p class="mb-8 max-w-2xl text-lg text-gray-600 dark:text-dark-300 md:text-xl">
              {{ siteSubtitle }}
            </p>

            <!-- CTA Button -->
            <div>
              <router-link
                :to="isAuthenticated ? dashboardPath : '/login'"
                class="btn btn-primary px-8 py-3 text-base"
              >
                {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
                <Icon name="arrowRight" size="md" class="ml-2" :stroke-width="2" />
              </router-link>
            </div>
          </div>

          <!-- Right: Terminal Animation -->
          <div class="flex flex-1 justify-center lg:justify-end">
            <div class="terminal-container">
            <div class="terminal-window">
                <!-- Window header -->
                <div class="terminal-header">
                  <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                  </div>
                  <span class="terminal-title">terminal</span>
                </div>
                <!-- Terminal content -->
                <div class="terminal-body">
                  <div class="code-line line-1">
                    <span class="code-prompt">$</span>
                    <span class="code-cmd">curl</span>
                    <span class="code-flag">-X POST</span>
                    <span class="code-url">/v1/messages</span>
                  </div>
                  <div class="code-line line-2">
                    <span class="code-comment"># routing to upstream...</span>
                  </div>
                  <div class="code-line line-3">
                    <span class="code-success">200 OK</span>
                    <span class="code-response">{ "content": "Hello!" }</span>
                  </div>
                  <div class="code-line line-4">
                    <span class="code-prompt">$</span>
                      <span class="cursor"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature Tags - Centered -->
        <div class="mb-12 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <div class="home-glass-chip inline-flex items-center gap-2.5 px-4 py-2">
            <Icon name="swap" size="sm" class="home-tag-icon" />
            <span class="text-sm font-medium text-gray-700 dark:text-dark-200">{{
              t('home.tags.subscriptionToApi')
            }}</span>
          </div>
          <div class="home-glass-chip inline-flex items-center gap-2.5 px-4 py-2">
            <Icon name="shield" size="sm" class="home-tag-icon" />
            <span class="text-sm font-medium text-gray-700 dark:text-dark-200">{{
              t('home.tags.stickySession')
            }}</span>
          </div>
          <div class="home-glass-chip inline-flex items-center gap-2.5 px-4 py-2">
            <Icon name="chart" size="sm" class="home-tag-icon" />
            <span class="text-sm font-medium text-gray-700 dark:text-dark-200">{{
              t('home.tags.realtimeBilling')
            }}</span>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="mb-12 grid gap-6 md:grid-cols-3">
          <!-- Feature 1: Unified Gateway -->
          <div class="home-feature-card group p-6">
            <div class="home-icon-tile mb-4">
              <Icon name="server" size="lg" />
            </div>
            <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {{ t('home.features.unifiedGateway') }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-600 dark:text-dark-400">
              {{ t('home.features.unifiedGatewayDesc') }}
            </p>
          </div>

          <!-- Feature 2: Account Pool -->
          <div class="home-feature-card group p-6">
            <div class="home-icon-tile mb-4">
              <Icon name="users" size="lg" />
            </div>
            <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {{ t('home.features.multiAccount') }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-600 dark:text-dark-400">
              {{ t('home.features.multiAccountDesc') }}
            </p>
          </div>

          <!-- Feature 3: Billing & Quota -->
          <div class="home-feature-card group p-6">
            <div class="home-icon-tile mb-4">
              <Icon name="creditCard" size="lg" />
            </div>
            <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {{ t('home.features.balanceQuota') }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-600 dark:text-dark-400">
              {{ t('home.features.balanceQuotaDesc') }}
            </p>
          </div>
        </div>

        <!-- Supported Providers -->
        <div class="mb-8 text-center">
          <h2 class="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            {{ t('home.providers.title') }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-dark-400">
            {{ t('home.providers.description') }}
          </p>
        </div>

        <div class="mb-16 flex flex-wrap items-center justify-center gap-4">
          <!-- Claude - Supported -->
          <div class="home-provider-chip flex items-center gap-2 px-5 py-3">
            <div class="home-provider-mark">
              <span>C</span>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-dark-200">{{ t('home.providers.claude') }}</span>
            <span class="home-status-badge">{{ t('home.providers.supported') }}</span>
          </div>
          <!-- GPT - Supported -->
          <div class="home-provider-chip flex items-center gap-2 px-5 py-3">
            <div class="home-provider-mark">
              <span>G</span>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-dark-200">GPT</span>
            <span class="home-status-badge">{{ t('home.providers.supported') }}</span>
          </div>
          <!-- Gemini - Supported -->
          <div class="home-provider-chip flex items-center gap-2 px-5 py-3">
            <div class="home-provider-mark">
              <span>G</span>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-dark-200">{{ t('home.providers.gemini') }}</span>
            <span class="home-status-badge">{{ t('home.providers.supported') }}</span>
          </div>
          <!-- Antigravity - Supported -->
          <div class="home-provider-chip flex items-center gap-2 px-5 py-3">
            <div class="home-provider-mark">
              <span>A</span>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-dark-200">{{ t('home.providers.antigravity') }}</span>
            <span class="home-status-badge">{{ t('home.providers.supported') }}</span>
          </div>
          <!-- More - Coming Soon -->
          <div class="home-provider-chip flex items-center gap-2 px-5 py-3 opacity-75">
            <div class="home-provider-mark home-provider-mark-muted">
              <span>+</span>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-dark-200">{{ t('home.providers.more') }}</span>
            <span class="home-status-badge home-status-badge-muted">{{ t('home.providers.soon') }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 px-6 py-8">
      <div
        class="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 text-center sm:flex-row sm:text-left"
      >
        <p class="text-sm text-gray-500 dark:text-dark-400">
          &copy; {{ currentYear }} {{ siteName }}. {{ t('home.footer.allRightsReserved') }}
        </p>
        <div class="flex items-center gap-4">
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-dark-400 dark:hover:text-white"
          >
            {{ t('home.docs') }}
          </a>
          <a
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-dark-400 dark:hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'

const { t } = useI18n()

const authStore = useAuthStore()
const appStore = useAppStore()

// Site settings - directly from appStore (already initialized from injected config)
const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'Sub2API')
const siteLogo = computed(() => appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '')
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'AI API Gateway Platform')
const docUrl = computed(() => appStore.cachedPublicSettings?.doc_url || appStore.docUrl || '')
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')

// Check if homeContent is a URL (for iframe display)
const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

// Theme
const isDark = ref(document.documentElement.classList.contains('dark'))

// GitHub URL
const githubUrl = 'https://github.com/Wei-Shaw/sub2api'

// Auth state
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')
const userInitial = computed(() => {
  const user = authStore.user
  if (!user || !user.email) return ''
  return user.email.charAt(0).toUpperCase()
})

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())

// Toggle theme
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  initTheme()

  // Check auth state
  authStore.checkAuth()

  // Ensure public settings are loaded (will use cache if already loaded from injected config)
  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})
</script>

<style scoped>
.home-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0.5rem;
  color: rgba(41, 44, 59, 0.62);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.home-icon-button:hover {
  color: #292c3b;
  background: rgba(240, 200, 69, 0.16);
}

:global(html.dark .home-icon-button) {
  color: rgba(254, 254, 253, 0.66);
}

:global(html.dark .home-icon-button:hover) {
  color: #f0c845;
  background: rgba(240, 200, 69, 0.12);
}

.home-glass-chip,
.home-feature-card,
.home-provider-chip {
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background: rgba(254, 254, 253, 0.78);
  box-shadow: 0 5px 14px rgba(31, 34, 48, 0.055);
  backdrop-filter: blur(16px) saturate(1.12);
  -webkit-backdrop-filter: blur(16px) saturate(1.12);
}

.home-feature-card,
.home-provider-chip {
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.home-feature-card:hover,
.home-provider-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(31, 34, 48, 0.09);
}

:global(html.dark .home-glass-chip),
:global(html.dark .home-feature-card),
:global(html.dark .home-provider-chip) {
  background: rgba(41, 44, 59, 0.82);
  box-shadow: 0 7px 18px rgba(0, 0, 0, 0.16);
}

:global(html.dark .home-feature-card:hover),
:global(html.dark .home-provider-chip:hover) {
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
}

.home-tag-icon {
  color: #dda931;
}

:global(html.dark .home-tag-icon) {
  color: #f0c845;
}

.home-icon-tile,
.home-provider-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #292c3b;
  background:
    linear-gradient(135deg, rgba(240, 200, 69, 0.96), rgba(221, 169, 49, 0.9)),
    #f0c845;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.36),
    0 8px 18px rgba(41, 44, 59, 0.1);
}

.home-icon-tile {
  width: 3rem;
  height: 3rem;
  border-radius: 8px;
  transition: transform 0.22s ease;
}

.home-feature-card:hover .home-icon-tile {
  transform: scale(1.04);
}

.home-provider-mark {
  width: 2rem;
  height: 2rem;
  border-radius: 7px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0;
}

.home-provider-mark-muted {
  color: #fefefd;
  background: #3b4256;
}

.home-status-badge {
  border-radius: 6px;
  padding: 0.125rem 0.375rem;
  font-size: 10px;
  font-weight: 600;
  color: #292c3b;
  background: rgba(240, 200, 69, 0.22);
}

.home-status-badge-muted {
  color: rgba(41, 44, 59, 0.68);
  background: rgba(41, 44, 59, 0.08);
}

:global(html.dark .home-status-badge) {
  color: #fefefd;
  background: rgba(240, 200, 69, 0.16);
}

:global(html.dark .home-status-badge-muted) {
  color: rgba(254, 254, 253, 0.68);
  background: rgba(254, 254, 253, 0.08);
}

/* Terminal Container */
.terminal-container {
  position: relative;
  display: inline-block;
}

/* Terminal Window */
.terminal-window {
  width: min(420px, calc(100vw - 3rem));
  background: linear-gradient(145deg, #292c3b 0%, #1f2230 100%);
  border-radius: 10px;
  box-shadow: 0 18px 40px -16px rgba(31, 34, 48, 0.42);
  overflow: hidden;
  transform: perspective(1000px) rotateX(1.5deg) rotateY(-1.5deg);
  transition: transform 0.3s ease;
}

.terminal-window:hover {
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-4px);
}

/* Terminal Header */
.terminal-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(41, 44, 59, 0.92);
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.terminal-buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btn-close {
  background: #DDA931;
}
.btn-minimize {
  background: #F0C845;
}
.btn-maximize {
  background: #FEFEFD;
}

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  font-family: ui-monospace, monospace;
  color: #F0C845;
  margin-right: 52px;
}

/* Terminal Body */
.terminal-body {
  padding: 20px 24px;
  font-family: ui-monospace, 'Fira Code', monospace;
  font-size: 14px;
  line-height: 2;
}

@media (max-width: 480px) {
  .terminal-header {
    padding: 10px 12px;
  }

  .terminal-body {
    padding: 16px;
    font-size: 12px;
  }

  .terminal-title {
    margin-right: 44px;
  }
}

.code-line {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  opacity: 0;
  animation: line-appear 0.5s ease forwards;
}

.line-1 {
  animation-delay: 0.3s;
}
.line-2 {
  animation-delay: 1s;
}
.line-3 {
  animation-delay: 1.8s;
}
.line-4 {
  animation-delay: 2.5s;
}

@keyframes line-appear {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.code-prompt {
  color: #F0C845;
  font-weight: bold;
}
.code-cmd {
  color: #FEFEFD;
}
.code-flag {
  color: #DDA931;
}
.code-url {
  color: #F0C845;
}
.code-comment {
  color: #Aab0c0;
  font-style: italic;
}
.code-success {
  color: #292C3B;
  background: rgba(240, 200, 69, 0.95);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}
.code-response {
  color: #F0C845;
}

/* Blinking Cursor */
.cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: #F0C845;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* Dark mode adjustments */
:global(html.dark .terminal-window) {
  box-shadow:
    0 18px 40px -16px rgba(0, 0, 0, 0.55),
    inset 0 0 0 1px rgba(254, 254, 253, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
</style>
