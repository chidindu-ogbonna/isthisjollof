import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default (context, inject) => {
  const { $config } = context

  Vue.use(VueGtag, {
    config: { id: $config.googleAnalytics },
    params: {
      send_page_view: true,
    },
  })
  context.$gtag = Vue.$gtag
  inject('gtag', Vue.$gtag)
}
