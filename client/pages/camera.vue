<template>
  <div class="camera__layout">
    <main class="camera__layout-content">
      <video ref="video" autoplay></video>

      <input
        ref="fileExp"
        class="hidden"
        type="file"
        accept="image/*"
        @change="photoSelected"
      />

      <div ref="frame" class="opacity-0 img-container">
        <img :src="selectedPhoto" alt="" />
        <div v-if="processing" class="absolute">
          <app-loader></app-loader>
        </div>
      </div>

      <canvas ref="canvas" class="hidden"></canvas>
    </main>

    <camera-controls
      @close-camera="closeCamera"
      @take-picture="takePicture"
      @open-photos="openPhotos"
    ></camera-controls>
  </div>
</template>

<script>
export default {
  name: 'Camera',

  data() {
    return {
      video: null,
      canvas: null,
      ctx: null,
      webcam: null,
      streaming: false,
      isMediaStreamAPISupported: false,
      selectedPhoto: '',
      isIOS: false,
      processing: false,
      label: '',
      imageURL: '',
    }
  },

  async mounted() {
    this.isIOS = ['iPad', 'iPhone', 'iPod'].includes(navigator.platform)
    this.isMediaStreamAPISupported = navigator && navigator.mediaDevices

    await this.init()

    this.$on('hook:beforeDestroy', () => {
      if (this.webcam) {
        this.webcam.removeEventListener('play', this.playHandler)
        if (this.webcam.srcObject) this.webcam.srcObject.getTracks()[0].stop()
      }
    })
  },

  methods: {
    async init() {
      this.setPhotoSource()
      this.setCanvas()

      if (this.isMediaStreamAPISupported) {
        this.webcam.addEventListener('play', this.playHandler, false)
      } else {
        this.setCanvasProps()
      }

      try {
        if (this.isMediaStreamAPISupported) {
          const devices = await navigator.mediaDevices.enumerateDevices()
          const videoDevices = devices.filter((d) => d.kind === 'videoinput')
          await this.startCapture(videoDevices)
        }
      } catch (error) {
        // console.log('Error: ', error.name, error.message)
        this.$notify({ title: 'Unable to access camera' })
        this.$store.dispatch('log/error', {
          fatal: true,
          action: 'camera_init',
          error,
        })
      }
    },

    playHandler() {
      if (!this.streaming) {
        this.setCanvasProps()
        this.streaming = true
      }
    },

    /**
     * @param {Array<MediaDeviceInfo>} devices
     */
    async startCapture(devices) {
      const constraints = {
        video: {},
        audio: false,
      }

      if (devices.length > 1) {
        const device = devices[devices.length - 1].deviceId
        constraints.video.mandatory = { sourceId: device || null }

        if (this.isIOS) {
          constraints.video.facingMode = 'environment'
        }
        await this.setMediaStream(constraints)
      } else if (devices.length) {
        const device = devices[0].deviceId
        constraints.video.mandatory = { sourceId: device || null }

        if (this.isIOS) {
          constraints.video.facingMode = 'environment'
        }

        if (!constraints.video.mandatory.sourceId && !this.isIOS) {
          await this.setMediaStream({ video: true })
        } else {
          await this.setMediaStream(constraints)
        }
      } else {
        await this.setMediaStream({ video: true })
      }
    },

    async setMediaStream(constraints) {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      const track = stream.getTracks()[0]
      this.label = `${track.id} - ${track.label}`

      this.webcam.srcObject = stream
      this.webcam.setAttribute('playsinline', true)
      this.webcam.setAttribute('controls', true)
      setTimeout(() => {
        this.$refs.video.removeAttribute('controls')
      })
    },

    setPhotoSource() {
      if (!this.selectedPhoto && this.isMediaStreamAPISupported) {
        this.webcam = this.$refs.video
      } else if (this.isMediaStreamAPISupported) {
        this.webcam = this.$refs.video
      } else {
        this.webcam = this.$refs.frame
      }
    },

    setCanvas() {
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')
    },

    setCanvasProps() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    },

    takePicture() {
      this.setCanvas()
      setTimeout(() => this.setPhotoSource())

      try {
        const width = this.canvas.width
        const height = this.canvas.height
        this.ctx.drawImage(this.webcam, 0, 0, width, height)
        const imageURL = this.canvas.toDataURL('image/png')
        this.setImage(imageURL)
      } catch (error) {
        this.$store.dispatch('log/error', {
          fatal: true,
          action: 'camera_snap',
          error,
        })
      }

      this.$store.dispatch('log/cameraEvent', {
        action: 'camera_snap',
        label: this.label,
      })
    },

    closeCamera() {
      this.$store.dispatch('log/cameraEvent', {
        action: 'camera_close',
        label: this.label,
      })
      this.$router.push('/')
    },

    openPhotos() {
      const fileBtn = this.$refs.fileExp
      fileBtn.click()
      this.$store.dispatch('log/cameraEvent', {
        action: 'photos_open',
        label: this.label,
      })
    },

    photoSelected(event) {
      if (event.target && event.target.files.length > 0) {
        this.$store.dispatch('log/cameraEvent', {
          action: 'camera_open_complete',
          label: this.label,
        })
        const imageURL = URL.createObjectURL(event.target.files[0])
        this.setImage(imageURL)
      }
    },

    setImage(url) {
      this.frame = this.$refs.frame
      this.frame.classList.replace('opacity-0', 'opacity-100')
      this.selectedPhoto = url
    },
  },
}
</script>

<style lang="scss">
.camera__layout {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--dark-gray);

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
  background: rgba(4, 12, 20, 0.8);
  backdrop-filter: saturate(180%) blur(10px);

  img {
    width: auto;
    height: auto;
    margin: auto;
  }
}
</style>
