<template>
  <div class="camera__layout">
    <main class="camera__layout-content">
      <div class="img-container">
        <img :src="selectedPhoto" alt="" />
        <div
          v-if="processing"
          class="fixed flex flex-col items-center justify-center w-full h-full"
        >
          <app-loader class="mb-4"></app-loader>
          <p class="text-lg font-medium">Processing...</p>
        </div>
      </div>
    </main>

    <input
      ref="camera"
      class="hidden"
      type="file"
      accept="image/*"
      capture
      @change="photoSelected"
    />

    <input
      ref="photos"
      class="hidden"
      type="file"
      accept="image/*"
      @change="photoSelected"
    />

    <transition name="top-slide">
      <div
        v-if="showResult"
        class="fixed top-0 left-0 right-0 z-20 flex flex-col items-center justify-center max-w-screen-sm py-4 mx-auto shadow-xl"
        :class="[result.value ? 'bg-green' : 'bg-red']"
      >
        <div class="flex justify-end w-full px-8">
          <button
            v-ripple.click
            class="p-2 rounded-full focus:outline-none"
            style="background: rgba(249, 249, 249, 0.4)"
            @click="showResult = !showResult"
          >
            <icon-x class="w-6 h-6 text-white"></icon-x>
          </button>
        </div>
        <div class="text-4xl font-bold text-white">
          <p v-if="result.value">Is Jollof!</p>
          <p v-else>Not Jollof!</p>
          <icon-rice class="w-24 h-24 mx-auto"></icon-rice>
        </div>
      </div>
    </transition>

    <transition name="bottom-slide">
      v-if="!processing"
      <camera-controls
        @close-camera="closeCamera"
        @open-camera="openCamera"
        @open-photos="openPhotos"
      ></camera-controls>
    </transition>
  </div>
</template>

<script>
import IconRice from '@/assets/svg/rice.svg?inline'
import IconX from '@/assets/svg/x.svg?inline'

export default {
  name: 'Result',

  components: { IconRice, IconX },

  data() {
    return {
      processing: true,
      result: null,
      showResult: null,
    }
  },

  computed: {
    selectedPhoto() {
      return this.$store.state.app.selectedPhoto
    },
  },

  mounted() {
    if (!this.selectedPhoto) {
      this.$router.push({ name: 'index' })
    } else {
      this.processImage()
    }
  },

  methods: {
    processImage() {
      setTimeout(() => {
        this.showResult = true
        this.result = { value: true }
        this.processing = false
      }, 5000)
    },

    openCamera(trigger) {
      this.$store.dispatch('log/cameraEvent', {
        action: 'open_camera',
        label: trigger,
      })
      const cameraBtn = this.$refs.camera
      cameraBtn.click()
    },

    closeCamera() {
      this.$store.dispatch('log/cameraEvent', {
        action: 'camera_close',
        label: `closed_in: ${this.$route.name}`,
      })
      this.$router.push('/')
    },

    openPhotos() {
      if (this.processing) return
      const photosBtn = this.$refs.photos
      photosBtn.click()
      this.$store.dispatch('log/cameraEvent', {
        action: 'photos_open',
        label: `closed_in: ${this.$route.name}`,
      })
    },

    photoSelected(event) {
      if (event.target && event.target.files.length > 0) {
        this.$store.dispatch('log/cameraEvent', {
          action: 'photos_selected',
          label: `selected_in: ${this.$route.name}`,
        })
        const imageURL = URL.createObjectURL(event.target.files[0])
        this.$store.commit('app/setImage', imageURL)
        this.processing = true
        this.processImage()
      } else {
        this.$notify({
          type: 'error',
          title: 'Image Not Selected',
        })
      }
    },
  },
}
</script>

<style lang="scss">
.camera__layout {
  position: absolute;
  width: 100%;
  height: 100%;

  &-content {
    height: inherit;

    video {
      transform: translateX(-50%) translateY(-50%);
      top: 50%;
      left: 50%;
      max-width: none;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      position: absolute;
    }
  }
}

.img-container {
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transition: all 0.4s ease-in-out;
  height: 100%;
  width: 100%;

  & > div {
    background: rgba(4, 12, 20, 0.85);
  }

  img {
    width: auto;
    height: auto;
    margin: auto;
  }
}
</style>
