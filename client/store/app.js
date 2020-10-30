export const state = () => ({
  selectedPhoto: '',
})

export const getters = {}

export const mutations = {
  setImage(state, image) {
    state.selectedPhoto = image
  },
}

export const actions = {}
