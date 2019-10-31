import Vue from 'vue'
// import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import Notifications from 'vue-notification'
import Fragment from 'vue-fragment'

import store from './services/store'
import router from './services/router'
import Vuelidate from 'vuelidate'
import Server from './services/server'

import i18n from '@/plugins/i18n'

let s = new Server(process.env.VUE_APP_SERVER_URL || '', process.env.VUE_APP_TOKEN_NAME || "vue-app")
store.commit("SetServer", s)
store.dispatch("initApp").then( () => { 
    i18n.locale = store.state.current_locale
    initalizeVue() } ).catch( err => {
    // console.log(err)
    i18n.locale = store.state.current_locale
    initalizeVue()
  }
)

Vue.config.productionTip = false

Vue.use(Notifications)
Vue.use(require('vue-moment'))
Vue.use(Fragment.Plugin)
Vue.use(Vuelidate)

function initalizeVue()
{
  return new Vue({
    vuetify,
    store,
    router,
    i18n,
    render: h => h(App),
    beforeCreate() {
        !this.$store.state.authenticated && this.$router.push( { path: "/login" }) 
    }
  }).$mount('#app')
}

// new Vue({
//   vuetify,
//   store,
//   router,
//   render: h => h(App),
//   async beforeCreate() {
//       let authenticated = await this.$store.dispatch("initApp")
//       this.$router.beforeResolve( (to, from, next) => {
//           console.log()
//           if( !authenticated) {
//               this.$router.push( { path: "/login" })
//               return
//           }
//           next()   
//       })
//       // !authenticated && this.$router.push( { path: "/login" })
//   }
// }).$mount('#app')
