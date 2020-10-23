<template>
  <div class="max-w-screen-lg px-4 mx-auto sm:py-12 lg:py-0">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="flex mb-10 text-base font-semibold" @click="openCamera">
        <icon-camera class="w-6 h-6 mr-2 md:w-8 md:h-8"></icon-camera>
        Tap to Scan
      </div>
      <button
        v-ripple
        class="rounded-full scale-in-center focus:outline-none pulsate-fwd"
        @click="openCamera"
      >
        <icon-scan class="w-56 h-56 md:w-64 md:h-64 text-orange-1"></icon-scan>
      </button>
    </div>
  </div>
</template>

<script>
import IconCamera from '@/assets/svg/camera.svg?inline'

export default {
  components: {
    IconCamera,
  },

  methods: {
    openCamera() {
      this.$router.push('/next')
    },
  },
}
</script>
