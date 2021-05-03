export const state = () => ({
  selectedFile: null,
  model: null,
})

export const getters = {}

export const mutations = {
  setImage(state, image) {
    state.selectedFile = image
  },

  saveModel(state, model) {
    state.model = model
  },
}

export const actions = {
  async predictImage({ state }, { image }) {
    const name = 'image'

    const formData = new FormData()

    formData.append('file', image, name)
    const url = 'https://us-central1-t-ogbonna.cloudfunctions.net/index'

    const response = await fetch(url, { body: formData, method: 'POST' })
    const { data, status } = await response.json()

    if (status !== 'error') {
      return data
    }

    throw new Error('error in model')
  },
}
