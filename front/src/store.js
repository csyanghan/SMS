import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    role: '',
    terms: [],
    nowTerm: '',
    adminTab: '3-1'
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload.userInfo;
      state.role = payload.role;
    },
    initTerm(state, payload) {
      state.terms = payload.terms;
      state.nowTerm = payload.nowTerm;
    },
    setTerm(state, payload) {
      state.nowTerm = payload.nowTerm;
    },
    changeAdminTab(state, payload) {
      state.adminTab = payload.tab;
    },
    clearAll(state) {
      state.userInfo = {};
      state.role = '';
    }
  },
  getters: {
    role: state => {
      return state.role;
    },
    userInfo: state => {
      return state.userInfo;
    },
    terms: state => {
      return state.terms;
    },
    nowTerm: state => {
      return state.nowTerm;
    },
    adminTab: state => state.adminTab,
  },
  actions: {

  }
})
