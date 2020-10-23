<template>
  <client-only>
    <notifications :duration="60000" position="top center">
      <template slot="body" slot-scope="props">
        <!-- props.item.type ? success|warn|error|info -->
        <div
          class="p-3 m-2 border rounded-md shadow-md border-orange-2 bg-dark-gray"
        >
          <div class="flex justify-between">
            <div
              :class="[props.item.text ? 'items-start' : 'items-center']"
              class="flex justify-start"
            >
              <div class="mr-2">
                <info-icon class="w-6 h-6 text-orange-2"></info-icon>
              </div>
              <div class="text-gray-100">
                <div v-if="props.item.title" class="text-sm">
                  {{ props.item.title }}
                </div>
                <div v-if="props.item.text" class="text-xs text-light-gray">
                  {{ props.item.text }}
                </div>
              </div>
            </div>
            <a class="pr-2 cursor-pointer" @click="props.close">
              <x-icon class="w-4 h-4 text-gray-200"></x-icon>
            </a>
          </div>
        </div>
      </template>
    </notifications>
  </client-only>
</template>

<script>
import InfoIcon from '@/assets/svg/info-circle.svg?inline'
import XIcon from '@/assets/svg/x.svg?inline'

export default {
  components: { XIcon, InfoIcon },
}
</script>
