import Vue from 'vue'
import Vuex from 'vuex'

// import app from './store-app'

Vue.use(Vuex)

const store = new Vuex.Store({
   modules: {
      // app,
   },

   strict: process.env.DEBUGGING,
})

export default function(/* { ssrContext } */) {
   return store
}

export { store }
