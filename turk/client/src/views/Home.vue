<template>
  <div class="px-4">
    <div v-if="jollof.length" class=" flex flex-wrap">
      <div
        v-for="(item, index) in untagged"
        :key="index"
        class="w-full md:w-1/2 lg:w-1/3 mb-8 md:px-4"
      >
        <div
          class="relative w-full content-div rounded-md"
          :style="`background-image: url(${item.url})`"
        >
          <div
            class="flex flex-row items-center justify-between w-full h-64 rounded-t-md"
          >
            <button
              type="button"
              class="flex items-center justify-center w-12 h-12 p-1 m-3 text-white bg-red-500 rounded-full"
              @click="tagAsNotJollof(item)"
            >
              <icon-x class="h-10 w-10"></icon-x>
            </button>
            <button
              type="button"
              class="flex items-center justify-center w-12 h-12 p-1 m-3 text-white bg-green-500 rounded-full"
              @click="tagAsJollof(item)"
            >
              <icon-check class="h-10 w-10"></icon-check>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center">
      Loading ...
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import IconX from '@/assets/svg/x.svg'
import IconCheck from '@/assets/svg/check.svg'
import { isNil } from 'lodash'
import { jollof } from '../services/firebase'

export default {
  components: {
    IconX,
    IconCheck
  },

  data() {
    return {
      jollof: []
    }
  },

  firestore: {
    jollof
  },

  computed: {
    untagged() {
      return this.jollof.filter(item => isNil(item.is_jollof))
    },

    isJollof() {
      return this.jollof.filter(item => item.is_jollof)
    },

    notJollof() {
      return this.jollof.filter(item => item.is_jollof === false)
    }
  },

  watch: {
    jollof(value) {
      if (value) {
        this.updateTotal(value.length)
      }
    },

    isJollof(value) {
      if (value) {
        this.updateTaggedAsJollof(value.length)
      }
    },

    notJollof(value) {
      if (value) {
        this.updateTaggedAsNotJollof(value.length)
      }
    },

    untagged(value) {
      if (value) {
        this.updateUnTagged(value.length)
      }
    }
  },

  methods: {
    ...mapActions('jollof', ['tagAsJollof', 'tagAsNotJollof', 'scream']),
    ...mapMutations('jollof', [
      'updateTotal',
      'updateUnTagged',
      'updateTaggedAsJollof',
      'updateTaggedAsNotJollof'
    ])
  },

  head() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  }
}
</script>

<style>
.content-div {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
}
</style>
