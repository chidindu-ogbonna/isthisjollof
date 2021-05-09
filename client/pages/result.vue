<template>
  <div class="camera__layout">
    <transition name="top-slide">
      <div
        v-if="showResult"
        class="fixed top-0 left-0 right-0 z-20 max-w-screen-sm mx-auto"
      >
        <div
          class="flex flex-col items-center justify-center w-full h-full px-4 py-8 rounded-b-lg shadow-xl"
          :class="[result.is_jollof ? 'bg-green' : 'bg-red']"
        >
          <div class="text-4xl font-bold text-white shake">
            <p v-if="result.is_jollof">Is Jollof!</p>
            <p v-else>Not Jollof!</p>
            <icon-check v-if="result.is_jollof" class="w-20 h-20"></icon-check>
            <icon-cancel v-else class="w-20 h-20"></icon-cancel>
          </div>
        </div>
      </div>
    </transition>

    <main class="camera__layout-content">
      <div class="img-container">
        <img ref="selectedPhoto" :src="imagePreview" alt="" />
        <transition name="fade">
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
              <p class="text-sm text-gray-1">Image processing...</p>
            </div>
          </div>
        </transition>
      </div>

      <input
        ref="cameraBtn"
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
      <result-footer
        @go-back="closeCamera"
        @open-camera="openCamera"
        @share="share"
      ></result-footer>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Result',

  data() {
    return {
      processing: false,
      result: null,
      showResult: false,
      model: null,
      selectedFile: null,
      imagePreview: null,
    }
  },

  computed: {
    url() {
      return 'https://isthisjollof.com/'
    },
  },

  created() {
    const selectedFile = this.$store.state.app.selectedFile
    if (!selectedFile) {
      this.$router.push({ name: 'index' })
    } else {
      this.imagePreview = URL.createObjectURL(selectedFile)
      this.selectedFile = selectedFile
      this.processImage()
    }
  },

  methods: {
    async processImage() {
      try {
        this.processing = true

        const result = await this.$store.dispatch('app/predictImage', {
          image: this.selectedFile,
        })
        this.processing = false
        this.result = result
        this.showResult = true
      } catch (error) {
        // console.log(error)
        this.processing = false
        this.showResult = false
        this.$notify({
          type: 'error',
          title: error.name,
          text: 'Model was not loaded properly',
        })
        this.$store.dispatch('log/event', { action: 'error', error })
      }
    },

    openCamera() {
      this.$store.dispatch('log/event', { action: 'camera_opened' })
      const cameraBtn = this.$refs.cameraBtn
      cameraBtn.click()
    },

    closeCamera() {
      this.$store.dispatch('log/event', { action: 'result_closed' })
      this.$router.push('/')
    },

    photoSelected(event) {
      this.reset()

      if (event.target && event.target.files.length > 0) {
        this.$store.dispatch('log/event', { action: 'picture_selected' })
        const selectedFile = event.target.files[0]
        this.imagePreview = URL.createObjectURL(selectedFile)
        this.selectedFile = selectedFile

        this.processImage()
      } else {
        this.$notify({
          type: 'error',
          title: 'Image Not Selected',
        })
      }
    },

    reset() {
      this.processing = false
      this.result = null
      this.showResult = false
      this.$store.commit('app/setImage', '')
      this.$store.dispatch('log/event', { action: 'picture_reset' })
    },

    async share() {
      const action = 'share'

      if (navigator.share) {
        await navigator.share({ title: 'Is This Jollof?', url: this.url })
        this.$store.dispatch('log/event', { action, content_type: 'app_share' })
      } else {
        this.$store.dispatch('log/event', { action, content_type: 'web_share' })
        const link = `http://twitter.com/share?text=${'Check this out: Is This Jollof?'}&url=https://isthisjollof.com`
        window.open(link, '_blank')
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
