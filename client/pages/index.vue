<template>
  <div class="max-w-screen-lg px-4 mx-auto sm:py-12 lg:py-0">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div
        class="flex items-center justify-center mb-10 text-xl font-medium"
        @click="openCamera('text')"
      >
        <icon-camera class="w-6 h-6 mr-2 md:w-8 md:h-8"></icon-camera>
        Tap to Scan
      </div>
      <button
        v-ripple
        class="rounded-full scale-in-center focus:outline-none pulsate-fwd"
        @click="openCamera('button')"
      >
        <icon-scan class="w-56 h-56 md:w-64 md:h-64 text-orange-1"></icon-scan>
      </button>
    </div>
  </div>
</template>

<script>
import IconCamera from '@/assets/svg/camera.svg?inline'

export default {
  name: 'Index',
  components: {
    IconCamera,
  },

  methods: {
    openCamera(trigger) {
      this.$store.dispatch('log/cameraEvent', {
        action: 'open_camera',
        label: trigger,
      })
      this.$router.push('/camera')
    },
  },
}
</script>
