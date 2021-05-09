<template>
  <div
    class="fixed bottom-0 left-0 right-0 flex items-end justify-between w-full max-w-screen-sm px-4 mx-auto text-sm rounded-full mb:pb-6"
  >
    <!-- style="
      background: var(--dark-gray-4);
      backdrop-filter: saturate(180%) blur(5px);
    " -->
    <div
      class="flex items-end justify-between w-full px-4 py-4 pb-10 bg-black shadow-lg"
      style="border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem"
    >
      <button
        v-ripple.click
        class="inline-flex flex-col items-center justify-center px-2 rounded-full focus:outline-none"
        @click="$emit('go-back')"
      >
        <icon-arrow-left class="w-8 h-8 md:w-8 md:h-8"></icon-arrow-left>
      </button>

      <button
        v-ripple.click
        class="inline-flex flex-col items-center justify-center px-2 rounded-full focus:outline-none"
        @click="$emit('open-camera')"
      >
        <icon-camera class="w-8 h-8 md:w-8 md:h-8"></icon-camera>
      </button>

      <button
        v-ripple.click
        class="inline-flex flex-col items-center justify-center px-2 rounded-full focus:outline-none"
        @click="$emit('share')"
      >
        <icon-send class="w-8 h-8 md:w-8 md:h-8"></icon-send>
      </button>
    </div>
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
