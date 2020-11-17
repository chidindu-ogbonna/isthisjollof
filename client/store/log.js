export const actions = {
  event({ commit }, payload) {
    const { action, ...props } = payload
    if (this.$gtag) {
      // console.log(action, { ...props })
      this.$gtag.event(action, { ...props })
    }
  },
}
