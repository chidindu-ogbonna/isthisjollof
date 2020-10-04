/* eslint-disable no-unused-vars */
import JollofDB from '@/services/firebase/db-jollof'

const db = new JollofDB()

export default {
  namespaced: true,

  state: () => ({
    jollof: [],
    total: 0,
    tagged: 0,
    untagged: 0,
    taggedAsJollof: 0,
    taggedAsNotJollof: 0
  }),

  mutations: {
    updateTotal(state, payload) {
      state.total = payload
    },

    updateTagged(state, payload) {
      state.tagged = payload
    },

    updateUnTagged(state, payload) {
      state.untagged = payload
    },

    updateTaggedAsJollof(state, payload) {
      state.taggedAsJollof = payload
    },

    updateTaggedAsNotJollof(state, payload) {
      state.taggedAsNotJollof = payload
    }
  },

  actions: {
    async tagAsJollof({ commit }, payload) {
      const update = { ...payload, is_jollof: true }
      await db.update(update)
    },

    async tagAsNotJollof({ commit }, payload) {
      const update = { ...payload, is_jollof: false }
      await db.update(update)
    }
  }
}
