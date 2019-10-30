import Login from "@/components/auth/Login"
import Registration from "@/components/auth/Registration"
import store from "../../store";


export default [
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
            if (!store.state.authenticated) {
                    next()
                    return
            } 
            next("/")
        }
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration,
        beforeEnter(to, from, next) {
            if (!store.state.authenticated) {
                    next()
                    return
            } 
            next("/")
        }
    }
]