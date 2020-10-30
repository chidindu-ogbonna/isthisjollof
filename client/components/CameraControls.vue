<template>
  <div
    class="fixed bottom-0 left-0 right-0 flex items-end justify-between w-full max-w-screen-sm px-4 py-8 mx-auto md:py-6"
    style="background: var(--dark-gray-4)"
  >
    <button
      v-ripple.click
      class="inline-flex items-center px-2 py-2 text-white transition-opacity duration-200 ease-in-out rounded-md focus:outline-none bg-orange-1 hover:opacity-50"
      @click="$emit('open-camera')"
    >
      <icon-camera class="w-5 h-5 mr-2"></icon-camera>
      Open Camera
    </button>

    <button
      v-ripple.click
      class="inline-flex items-center px-2 py-2 text-white transition-opacity duration-200 ease-in-out rounded-md focus:outline-none bg-blue hover:opacity-50"
      @click="shareWithNative"
    >
      <icon-send class="w-5 h-5 mr-2"></icon-send>
      Share
    </button>
  </div>
</template>

<script>
import IconCamera from '@/assets/svg/camera.svg?inline'
import IconSend from '@/assets/svg/send.svg?inline'

export default {
  components: { IconCamera, IconSend },

  computed: {
    url() {
      return window.location.href
    },
  },

  methods: {
    async shareWithNative() {
      const action = 'share'
      const category = 'app'

      if (navigator.share) {
        await navigator.share({ title: 'IsThisJollof ?', url: this.url })
        this.$store.dispatch('log/event', { action, label: '', category })
      } else {
        const error = new Error('DeviceNotSupported')
        this.$store.dispatch('log/error', { fatal: false, action, error })
        this.$notify({
          type: 'error',
          title: 'Device Not Supported',
        })
      }
    },
  },
}
</script>
