<template>
  <main class="app__layout-content">
    <video autoplay></video>
  </main>
  <!-- <div class="max-w-screen-lg px-4 mx-auto sm:py-12 lg:py-0">
    <div
      class="relative flex flex-col items-center justify-center min-h-screen"
    >
      <div class="absolute" :class="[pictureTaken ? 'invisible' : 'visible']">
        <div v-if="!streaming" class="flex justify-center">
          <app-loader></app-loader>
        </div>
        <video ref="video" playsinline class="rounded-md">
          Video stream not available.
        </video>
      </div>
      <div class="absolute" :class="[pictureTaken ? 'visible' : 'invisible']">
        <canvas ref="canvas" class="rounded-md"> </canvas>
      </div>

      <div
        class="fixed bottom-0 flex items-baseline justify-between w-full max-w-screen-sm px-4 py-4 mx-auto md:py-6"
      >
        <button
          v-ripple
          class="inline-flex items-center justify-center w-10 h-10 mx-5 rounded-full bg-red md:w-12 md:h-12 focus:outline-none"
          @click="closeCamera"
        >
          <icon-x class="w-6 h-6 md:w-8 md:h-8"></icon-x>
        </button>
        <button
          v-ripple
          class="inline-flex items-center justify-center w-12 h-12 mx-5 rounded-full bg-green md:w-16 md:h-16 focus:outline-none"
          @click="takepicture"
        >
          <icon-camera class="w-8 h-8 md:w-10 md:h-10"></icon-camera>
        </button>
        <button
          v-ripple
          class="inline-flex items-center justify-center w-10 h-10 mx-5 rounded-full bg-light-gray md:w-12 md:h-12 focus:outline-none"
          @click="toggleCamera"
        >
          <icon-refresh class="w-5 h-5 md:w-6 md:h-6"></icon-refresh>
        </button>
      </div>
    </div>
  </div> -->
</template>

<script>
/* eslint-disable */
import IconCamera from '@/assets/svg/camera.svg?inline'
import IconX from '@/assets/svg/x.svg?inline'
import IconRefresh from '@/assets/svg/refresh.svg?inline'

export default {
  name: 'Camera',

  layout:'camera',

  components: { IconCamera, IconX, IconRefresh },

  data() {
    return {
      video: null,
      canvas: null,
      label: '',
      streaming: false,
      height: 0,
      width: 320,
      photo: null,
      pictureTaken: false,
      devices: null,
      selectedDevice: null,
      mediaStream: null,
    }
  },

  /**
   * Open camera on mount
   */
  async mounted() {
    // this.video = this.$refs.video
    // this.canvas = this.$refs.canvas
    // this.photo = this.$refs.photo

    // if (navigator.mediaDevices) {
    //   try {
    //     this.devices = await this.enumerateDevices()
    //     await this.setMediaStream(this.devices[0]) // use the default camera
    //     this.$store.dispatch('log/cameraEvent', {
    //       action: 'camera_open_success',
    //       label: this.label,
    //     })
    //   } catch (error) {
    //     console.log('An error occurred: ' + error.name, error.message)
    //     this.$store.dispatch('log/cameraEvent', {
    //       action: 'camera_open_failed',
    //       label: `${error.name} - ${error.message || ''}`,
    //     })
    //     this.$notify({ title: error.name })
    //   }
    // } else {
    //   // console.log('Not supported')
    //   this.$store.dispatch('log/cameraEvent', {
    //     action: 'camera_open_notsupported',
    //     label: 'Not supported',
    //   })
    //   this.$notify({ title: 'Device Not Supported' })
    // }

    // this.clearphoto()

    // this.video.addEventListener('canplay', this.videoCanPlay, false)

    // this.$on('hook:beforeDestroy', () => {
    //   this.video.removeEventListener('canplay', this.videoCanPlay)
    //   this.video.pause()
    //   this.video.src = ''
    //   if (this.video.srcObject) this.video.srcObject.getTracks()[0].stop()
    //   this.$store.dispatch('log/cameraEvent', {
    //     action: 'camera_closed',
    //     label: this.label,
    //   })
    // })
  },

  methods: {
    async enumerateDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter((d) => d.kind === 'videoinput')
      return videoDevices.map((d) => ({ id: d.deviceId, label: d.label }))
    },

    async setMediaStream(device) {
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach((track) => track.stop())
      }

      const videoSource = device.id
      const constraints = {
        video: { deviceId: videoSource ? { exact: videoSource } : undefined },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.selectedDevice = device
      this.mediaStream = stream
      this.video.srcObject = stream
      this.video.play()

      const track = stream.getTracks()[0]
      this.label = `${track.id} - ${track.label}`
    },

    async toggleCamera() {
      if (this.devices.length > 1) {
        const d = this.devices.filter((d) => this.selectedDevice.id !== d.id)
        await this.setMediaStream(d[0])
      } else {
        this.$notify({ title: 'Only 1 Camera Available' })
      }
    },

    takepicture() {
      if (!this.pictureTaken) {
        const context = this.canvas.getContext('2d')
        if (this.width && this.height) {
          console.log(context)
          this.canvas.width = this.width
          this.canvas.height = this.height
          // this.canvas.setAttribute('width', this.width)
          // this.canvas.setAttribute('height', this.height)
          context.drawImage(this.video, 0, 0, this.width, this.height)

          // const data = this.canvas.toDataURL('image/png')
          this.pictureTaken = true
        } else {
          this.clearphoto()
        }
      }
    },

    clearphoto() {
      const context = this.canvas.getContext('2d')
      context.fillStyle = '#AAA'
      context.fillRect(0, 0, this.canvas.width, this.canvas.height)

      // const data = this.canvas.toDataURL('image/png')
    },

    closeCamera() {
      this.$router.push('/')
    },

    videoCanPlay() {
      if (!this.streaming) {
        this.height =
          this.video.videoHeight / (this.video.videoWidth / this.width)

        // this.video.setAttribute('width', this.width)
        // this.video.setAttribute('this.height', this.height)
        this.canvas.setAttribute('width', this.width)
        this.canvas.setAttribute('this.height', this.height)
        this.streaming = true
      }
    },
  },
}
</script>
