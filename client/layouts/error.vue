<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="flex items-center text-8xl md:text-8xl lg:text-9xl">
      <div>4</div>
      <eye-open-icon class="w-40 h-40 md:w-56 md:h-56"></eye-open-icon>
      <div>4</div>
    </div>
    <div class="flex items-center justify-center">
      Let's get you out of here
      <span>
        <n-link to="/">
          <login-icon class="w-8 h-8 ml-2 text-primary"></login-icon>
        </n-link>
      </span>
    </div>
  </div>
</template>

<script>
import EyeOpenIcon from '@/assets/svg/eye-open.svg?inline'
import LoginIcon from '@/assets/svg/login.svg?inline'

export default {
  name: 'Error',

  components: {
    EyeOpenIcon,
    LoginIcon,
  },

  /* eslint-disable vue/require-prop-types */
  props: ['error'],

  mounted() {
    this.$store.dispatch('log/event', {
      action: 'exception',
      fatal: true,
      description: this.error,
    })
  },
}
</script>
