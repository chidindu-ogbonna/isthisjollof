<template>
  <header
    class="fixed w-full z-20 bg-white py-2 px-4"
    :class="{ 'bg-gray-600 text-white': !networkOnLine }"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center justify-center text-blue-500 mb-2">
        <logo-icon class="flex items-center h-6 w-6 mr-2"></logo-icon>
        <span class="font-bold">{{ appTitle }}</span>
      </div>
      <div v-if="!networkOnLine" class="text-xs text-red-600 font-bold">
        Offline
      </div>
      <div v-else class="text-xs text-green-500 font-bold">Online</div>
    </div>
    <div class="flex flex-wrap items-center text-xs">
      <div class="mr-2 font-bold">Summary</div>
      <div class="mr-2">Total - {{ total }}</div>
      <div class="mr-2">Untagged - {{ untagged }}</div>
      <div class="mr-2">Jollof - {{ taggedAsJollof }}</div>
      <div class="mr-2">NotJollof - {{ taggedAsNotJollof }}</div>
    </div>
  </header>
</template>

<script>
import LogoIcon from '@/assets/svg/logo.svg'
import { mapState } from 'vuex'

export default {
  components: {
    LogoIcon
  },

  computed: {
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
    ...mapState('jollof', [
      'total',
      'untagged',
      'taggedAsJollof',
      'taggedAsNotJollof'
    ])
  }
}
</script>
