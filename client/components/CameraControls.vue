<template>
  <div
    class="fixed bottom-0 left-0 right-0 flex items-end justify-between w-full max-w-screen-sm px-4 py-8 mx-auto md:py-6"
  >
    <button
      v-ripple
      class="inline-flex items-center justify-center w-12 h-12 mx-5 rounded-full bg-red md:w-16 md:h-16 focus:outline-none"
      @click="$emit('close-camera')"
    >
      <icon-x class="w-8 h-8 md:w-10 md:h-10"></icon-x>
    </button>
    <button
      v-ripple
      class="inline-flex items-center justify-center w-16 h-16 mx-5 rounded-full bg-green md:w-20 md:h-20 focus:outline-none"
      @click="$emit('take-picture')"
    >
      <icon-camera class="w-10 h-10 md:w-12 md:h-12"></icon-camera>
    </button>
    <button
      v-ripple
      class="inline-flex items-center justify-center mx-5 bg-transparent rounded-full focus:outline-none"
      @click="$emit('open-photos')"
    >
      <icon-image class="w-12 h-12 text-white md:w-16 md:h-16"></icon-image>
    </button>
  </div>
</template>

<script>
import IconImage from '@/assets/svg/image.svg?inline'
import IconCamera from '@/assets/svg/camera.svg?inline'
import IconX from '@/assets/svg/x.svg?inline'

export default {
  components: { IconCamera, IconX, IconImage },
}
</script>
