import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoading: false,
  },
  getters: {
  },
  mutations: {
    checkLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
