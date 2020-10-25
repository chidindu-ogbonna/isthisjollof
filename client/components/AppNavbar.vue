<template>
  <header
    class="fixed left-0 right-0 z-20 flex items-center justify-between w-full max-w-screen-lg px-4 mx-auto"
  >
    <n-link
      v-ripple
      to="/about"
      class="inline-flex flex-col items-center justify-center px-2 py-2 rounded-full focus:outline-none"
    >
      <icon-info class="w-6 h-6 md:w-8 md:h-8"></icon-info>
      <span class="text-xs md:text-sm">About</span>
    </n-link>
    <n-link
      v-if="$route.name !== 'camera'"
      to="/"
      class="text-lg font-bold text-light-gray"
    >
      IsThisJollof ?
    </n-link>
    <button
      v-ripple
      class="inline-flex flex-col items-center justify-center px-2 py-2 rounded-full focus:outline-none"
      @click="shareWithNative"
    >
      <icon-send class="w-6 h-6 md:w-8 md:h-8"></icon-send>
      <span class="text-xs md:text-sm">Share</span>
    </button>
  </header>
</template>

<script>
import IconSend from '@/assets/svg/send.svg?inline'
import IconInfo from '@/assets/svg/info-circle.svg?inline'

export default {
  components: {
    IconSend,
    IconInfo,
  },

  computed: {
    url() {
      return window.location.href
    },
  },

  methods: {
    async shareWithNative() {
      if (navigator.share) {
        await navigator.share({ title: 'IsThisJollof ?', url: this.url })
      } else {
        this.$notify({
          type: 'error',
          title: 'Device Not Supported',
        })
      }
    },
  },
}
</script>
