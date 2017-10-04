import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// state
const state = {
  routes: []
}

// getters
const getters = {
  // sort by newest
  reverseRoutes: state => {
    return state.routes.slice().reverse()
  }
}

// actions
const actions = {
  removeRoute ({ commit }, id) {
    commit('removeRoute', id)
  },
  appendData ({ commit }, data) {
    commit('additionalData', data)
  }
}

// mutations
const mutations = {
  loadFromStorage (state, data) {
    state.routes = data
  },
  pushRoute (state, route) {
    state.routes.push(route)
  },

  /**
   * Remove route by id
   * @param state
   * @param id
   */
  removeRoute (state, id) {
    for (var i = 0; i < state.routes.length; i++) {
      if (state.routes[i].id === id) {
        state.routes.splice(i, 1)
        break
      }
    }
  },

  /**
   * Add time and distance to route
   * @param state
   * @param data
   */
  additionalData (state, data) {
    for (var i = 0; i < state.routes.length; i++) {
      if (state.routes[i].id === data.id) {
        state.routes[i]['time'] = data.time
        state.routes[i]['distance'] = data.distance
        break
      }
    }
  }
}

// export
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
