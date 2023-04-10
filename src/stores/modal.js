import { defineStore } from 'pinia'

export default defineStore('modal', {
  state: () => ({
    isOpen: false
  }),
  getters: {
    getModalState(state) {
      return !state.isOpen ? 'hidden' : ''
    }
  }
})
