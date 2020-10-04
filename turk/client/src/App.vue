<template>
  <div id="app" class="min-h-screen">
    <app-nav-bar></app-nav-bar>
    <div class="py-24">
      <router-view />
    </div>

    <new-content-available-toastr
      v-if="newContentAvailable"
      class="new-content-available-toastr"
      :refreshing-app="refreshingApp"
      @refresh="serviceWorkerSkipWaiting"
    ></new-content-available-toastr>
    <apple-add-to-home-screen-modal
      v-if="showAddToHomeScreenModalForApple"
      class="apple-add-to-home-screen-modal"
      @close="closeAddToHomeScreenModalForApple(false)"
    >
    </apple-add-to-home-screen-modal>
  </div>
</template>
<script>
import AppNavBar from '@/components/AppNavBar'
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    AppNavBar,
    NewContentAvailableToastr,
    AppleAddToHomeScreenModal
  },

  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', ['showAddToHomeScreenModalForApple', 'refreshingApp'])
  },

  methods: mapActions('app', [
    'closeAddToHomeScreenModalForApple',
    'serviceWorkerSkipWaiting'
  ])
}
</script>

<style lang="scss"></style>
