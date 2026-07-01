<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed right-4 top-4 z-[9999] space-y-2"
      aria-live="polite"
      aria-atomic="true"
    >
      <TransitionGroup
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-2 scale-[0.98]"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-2 scale-[0.98]"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'pointer-events-auto min-w-[300px] max-w-sm overflow-hidden rounded-md',
            'bg-[#FEFEFD] text-[#292C3B] shadow-[0_12px_30px_rgba(31,34,48,0.14)]',
            'dark:bg-[#292C3B] dark:text-[#FEFEFD] dark:shadow-[0_14px_34px_rgba(0,0,0,0.28)]'
          ]"
        >
          <div class="px-4 py-3">
            <div class="flex items-start gap-3">
              <!-- Icon -->
              <div :class="['mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md', getIconShellClass(toast.type)]">
                <Icon
                  :name="getToastIconName(toast.type)"
                  size="sm"
                  :class="getIconColor(toast.type)"
                  aria-hidden="true"
                />
              </div>

              <!-- Content -->
              <div class="min-w-0 flex-1">
                <p v-if="toast.title" class="text-sm font-semibold text-[#292C3B] dark:text-[#FEFEFD]">
                  {{ toast.title }}
                </p>
                <p
                  :class="[
                    'text-sm leading-relaxed',
                    toast.title
                      ? 'mt-1 text-[#292C3B]/70 dark:text-[#FEFEFD]/70'
                      : 'text-[#292C3B] dark:text-[#FEFEFD]'
                  ]"
                >
                  {{ toast.message }}
                </p>
              </div>

              <!-- Close button -->
              <button
                @click="removeToast(toast.id)"
                class="-m-1 flex-shrink-0 rounded-md p-1 text-[#292C3B]/40 transition-colors hover:bg-[#F0C845]/10 hover:text-[#292C3B] dark:text-[#FEFEFD]/50 dark:hover:bg-[#F0C845]/10 dark:hover:text-[#FEFEFD]"
                aria-label="Close notification"
              >
                <Icon name="x" size="sm" />
              </button>
            </div>
          </div>

          <!-- Progress bar -->
          <div v-if="toast.duration" class="h-0.5 bg-[#292C3B]/5 dark:bg-[#FEFEFD]/10">
            <div
              :class="['h-full toast-progress', getProgressBarColor(toast.type)]"
              :style="{ animationDuration: `${toast.duration}ms` }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/icons/Icon.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const toasts = computed(() => appStore.toasts)

const getToastIconName = (type: string): 'checkCircle' | 'xCircle' | 'exclamationTriangle' | 'infoCircle' => {
  switch (type) {
    case 'success':
      return 'checkCircle'
    case 'error':
      return 'xCircle'
    case 'warning':
      return 'exclamationTriangle'
    case 'info':
    default:
      return 'infoCircle'
  }
}

const getIconColor = (type: string): string => {
  const colors: Record<string, string> = {
    success: 'text-[#DDA931]',
    error: 'text-red-500',
    warning: 'text-[#DDA931]',
    info: 'text-[#DDA931]'
  }
  return colors[type] || colors.info
}

const getIconShellClass = (type: string): string => {
  const colors: Record<string, string> = {
    success: 'bg-[#F0C845]/20',
    error: 'bg-red-500/10',
    warning: 'bg-[#F0C845]/20',
    info: 'bg-[#F0C845]/20'
  }
  return colors[type] || colors.info
}

const getProgressBarColor = (type: string): string => {
  const colors: Record<string, string> = {
    success: 'bg-[#DDA931]',
    error: 'bg-red-500/80',
    warning: 'bg-[#DDA931]',
    info: 'bg-[#DDA931]'
  }
  return colors[type] || colors.info
}

const removeToast = (id: string) => {
  appStore.hideToast(id)
}
</script>

<style scoped>
.toast-progress {
  width: 100%;
  animation-name: toast-progress-shrink;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes toast-progress-shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
