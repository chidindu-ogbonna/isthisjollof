<template>
  <div
    class="fixed bottom-0 left-0 right-0 flex items-end justify-between w-full max-w-screen-sm px-4 py-8 mx-auto text-sm md:py-6"
    style="background: var(--dark-gray-4)"
  >
    <button
      v-ripple.click
      class="inline-flex flex-col items-center justify-center px-2 rounded-full focus:outline-none"
      @click="$emit('go-back')"
    >
      <icon-arrow-left class="w-6 h-6 md:w-8 md:h-8"></icon-arrow-left>
      <span class="text-xs md:text-sm">Back</span>
    </button>

    <button
      v-ripple.click
      class="inline-flex flex-col items-center justify-center px-2 rounded-full focus:outline-none"
      @click="$emit('open-camera')"
    >
      <icon-camera class="w-6 h-6 md:w-8 md:h-8"></icon-camera>
      <span class="text-xs md:text-sm">Camera</span>
    </button>

    <button
      v-ripple.click
      class="inline-flex flex-col items-center justify-center px-2 rounded-full focus:outline-none"
      @click="$emit('share')"
    >
      <icon-send class="w-6 h-6 md:w-8 md:h-8"></icon-send>
      <span class="text-xs md:text-sm">Share</span>
    </button>
  </div>
</template>

<script>
import IconCamera from '@/assets/svg/camera.svg?inline'
import IconSend from '@/assets/svg/send.svg?inline'
import IconArrowLeft from '@/assets/svg/arrow-left.svg?inline'

export default {
  components: { IconCamera, IconSend, IconArrowLeft },
}
</script>
