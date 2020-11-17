<template>
  <header
    v-if="$route.name !== 'result'"
    class="fixed left-0 right-0 z-20 flex items-center justify-between w-full max-w-screen-lg px-4 py-2 mx-auto"
  >
    <n-link
      v-ripple
      :to="leftLink.link"
      class="inline-flex flex-col items-center justify-center px-2 rounded-full focus:outline-none"
    >
      <icon-info
        v-if="leftLink.showAbout"
        class="w-6 h-6 md:w-8 md:h-8"
      ></icon-info>
      <icon-arrow-left v-else class="w-6 h-6 md:w-8 md:h-8"></icon-arrow-left>
      <span class="text-xs md:text-sm">{{ leftLink.name }}</span>
    </n-link>
    <button
      v-ripple
      class="inline-flex flex-col items-center justify-center px-2 rounded-full focus:outline-none"
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
import IconArrowLeft from '@/assets/svg/arrow-left.svg?inline'

export default {
  components: {
    IconSend,
    IconInfo,
    IconArrowLeft,
  },

  computed: {
    url() {
      return window.location.href
    },

    leftLink() {
      if (this.$route.name === 'about') {
        return { name: 'Back', link: '/', showAbout: false }
      } else {
        return { name: 'About', link: '/about', showAbout: true }
      }
    },
  },

  methods: {
    async shareWithNative() {
      const action = 'share'
      const category = 'app'

      if (navigator.share) {
        await navigator.share({ title: 'Is This Jollof?', url: this.url })
        this.$store.dispatch('log/event', {
          action,
          label: 'navigator-share',
          category,
        })
      } else {
        const link = `http://twitter.com/share?text=${'Check this out: Is This Jollof?'}&url=https://isthisjollof.com`
        window.open(link, '_blank')
        this.$store.dispatch('log/event', {
          action,
          label: 'web-share',
          category,
        })
      }
    },
  },
}
</script>
