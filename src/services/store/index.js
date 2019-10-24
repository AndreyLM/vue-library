import Vue from "vue";
import Vuex from "vuex";
import UserModule from "./user/index";


Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: { user_manager: UserModule },
    state: {
        $server: {},
        layout: 'clean-layout',
        authenticated: false,
        loading: true,
        user: {}
    },
    getters: {
        layout(state) {
            return state.layout
        },
        user(state) {
            return state.user
        } 
    },
    mutations: {
        SetUser(state, payload) {
            state.user = payload
            state.$server.setUser(payload)
        },
        SetLayout(state, payload) {
            state.layout = payload
        },
        SetServer(state, server) {
            state.$server = server
        },
        SetServerToken(state, token) {
            state.$server.setToken(token)
        },
        SetAuthenticated(state, val) {
            state.authenticated = val
            if (val) {
                state.layout = 'app-layout'
            } else {
                state.layout = 'clean-layout'
            }
        }
    },
    actions: {
        async initApp( context ) {
            let data = await context.rootState.$server.testAuth()
            context.commit('SetAuthenticated', data.status == 200)
            context.commit('SetUser', context.rootState.$server.getUser() || {} )
            
            return data.status == 200
        },
        async registration(context, data) {
            let response = await context.rootState.$server.request('registration', data, 'POST')
            if (response.status == 200 ) {
                context.dispatch('auth', response.data)
            }
            return response
        },
        async login(context, data) {
            let response = await context.rootState.$server.request('login', data, 'POST')
            if (response.status == 200 ) {
                context.dispatch('auth', response.data)
            }
            return response
        },
        async upload(context, data) {
            let response = await context.rootState.$server.request('descriptions/upload', data, 'POST')
            if (response.status == 200 ) {
                context.dispatch('auth', response.data)
            }
            return response
        },
        logout({ commit }) {
            commit('SetAuthenticated', false)
            commit('SetServerToken', '')
            commit('SetUser', {})

        },
        auth({ commit }, {token, user}) {
            commit('SetServerToken', token)
            commit('SetUser', user)
            commit('SetAuthenticated', true)
        }
    }
})