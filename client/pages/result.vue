<template>
  <div class="camera__layout">
    <transition name="top-slide">
      <div
        v-if="showResult"
        class="fixed top-0 left-0 right-0 z-20 max-w-screen-sm px-2 mx-auto"
      >
        <div
          class="flex flex-col items-center justify-center w-full h-full px-4 py-8 rounded-b-lg shadow-xl"
          :class="[result.value ? 'bg-green' : 'bg-red']"
        >
          <div class="text-4xl font-bold text-white shake">
            <p v-if="result.value">Is Jollof!</p>
            <p v-else>Not Jollof!</p>
            <icon-check v-if="result.value" class="w-20 h-20"></icon-check>
            <icon-cancel v-else class="w-20 h-20"></icon-cancel>
          </div>
        </div>
      </div>
    </transition>

    <main class="camera__layout-content">
      <div class="img-container">
        <img :src="selectedPhoto" alt="" />
        <div
          v-if="processing"
          style="background: rgba(4, 12, 20, 0.5)"
          class="fixed flex flex-col items-center justify-center w-full h-full"
        >
          <div
            class="flex flex-col items-center justify-center p-6 rounded-lg"
            style="
              background: rgba(245, 245, 245, 0.5);
              backdrop-filter: saturate(180%) blur(5px);
            "
          >
            <app-loader class="mb-4"></app-loader>
            <p class="text-sm font-medium text-gray-1">Image processing...</p>
          </div>
        </div>
      </div>

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
    </main>

    <transition name="bottom-slide">
      <!-- v-if="!processing" -->
      <result-footer
        @go-back="closeCamera"
        @open-camera="openCamera"
        @share="shareWithNative"
      ></result-footer>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Result',

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

    url() {
      return 'https://isthisjollof.com/'
    },
  },

  created() {
    if (!this.selectedPhoto) {
      this.$router.push({ name: 'index' })
    }
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
        // this.processing = false
      }, 100)
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

  img {
    width: auto;
    height: auto;
    margin: auto;
  }
}

.shake {
  animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  animation-delay: 2s;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
