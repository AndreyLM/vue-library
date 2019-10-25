import Vue from "vue";
import Vuex from "vuex";
import Article from "./article";
import UserModule from "./user";
import RBAC from "./rbac"

const LOGIN_URL = "/api/login"
const REGISTRATION_URL = "/api/registration"

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: { user_manager: UserModule, article: Article, rbac: RBAC },
    state: {
        $server: {},
        layout: 'clean-layout',
        authenticated: false,
        loading: true,
        user: {},
    },
    getters: {
        layout(state) {
            return state.layout
        },
        user(state) {
            return state.user
        },
    },
    mutations: {
        SetUser(state, data) {
            state.user = data
            state.$server.setUser(data)
        },
        SetUserPermissions(state, data){
            state.user_permissions = data || []
        },
        SetLayout(state, data) {
            state.layout = data
        },
        SetServer(state, server) {
            state.$server = server
        },
        SetServerToken(state, token) {
            state.$server.setToken(token)
        },
        SetAuthenticated(state, val) {
            state.authenticated = val
            state.layout = (val) ? 'app-layout' : 'clean-layout'  
        }
    },
    actions: {
        async initApp( context ) {
            let data = await context.rootState.$server.testAuth()
            if ( data.status != 200 ) {
                context.dispatch("logout")
                return false
            } 
            context.commit('SetAuthenticated', data.status == 200 )
            context.commit('SetUser', context.rootState.$server.getUser() || {} )
            
            return data.status == 200
        },
        async login(context, data) {
            let response = await context.rootState.$server.request(LOGIN_URL, data, 'POST')
            response.status == 200 && context.dispatch('auth', response.data)
            return response
        },
        async registration(context, data) {
            let response = await context.rootState.$server.request(REGISTRATION_URL, data, 'POST')
            response.status == 200 && context.dispatch('auth', response.data)
            return response
        },
        
        logout({ commit }) {
            commit('SetAuthenticated', false)
            commit('SetServerToken', '')
            commit('SetUser', {})
            commit('user_manager/setUserList', [])
            commit('rbac/setRoles', [])
            commit('rbac/setPermissions', [])
        },
        auth({ commit }, {token, user }) {
            commit('SetServerToken', token)
            commit('SetUser', user)
            commit('SetAuthenticated', true)
        }
    }
})