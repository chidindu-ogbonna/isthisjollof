<template>
  <div class="max-w-screen-lg px-4 mx-auto sm:py-20 lg:py-0">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="mb-16 text-center">
        <h1 class="mb-2 text-4xl font-bold leading-10 md:mb-4 md:text-5xl">
          Is This
          <span class="text-orange-1">Jollof Rice</span>?
        </h1>
        <h2 class="text-lg font-medium leading-6 md:text-xl text-lighter-gray">
          Let your phone answer that question.
        </h2>
      </div>

      <input
        ref="camera"
        class="hidden"
        type="file"
        accept="image/*"
        capture
        @change="photoSelected"
      />
      <button
        v-ripple
        class="rounded-full scale-in-center focus:outline-none pulsate-fwd"
        @click="openCamera('button')"
      >
        <app-scan></app-scan>
      </button>
      <div
        class="flex items-center justify-center mt-5 cursor-pointer"
        @click="openCamera('text')"
      >
        <icon-camera class="w-5 h-5 mr-2 text-white"></icon-camera>
        Tap to Open Camera
      </div>
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
      const cameraBtn = this.$refs.camera
      cameraBtn.click()
    },

    photoSelected(event) {
      if (event.target && event.target.files.length > 0) {
        this.$store.dispatch('log/cameraEvent', {
          action: 'photos_selected',
          label: `selected_in: ${this.$route.name}`,
        })
        const imageURL = URL.createObjectURL(event.target.files[0])
        this.setImage(imageURL)
        this.$router.push('/result')
      } else {
        this.$notify({
          type: 'error',
          title: 'Image Not Selected',
        })
      }
    },

    setImage(imageURL) {
      this.$store.commit('app/setImage', imageURL)
    },
  },
}
</script>
