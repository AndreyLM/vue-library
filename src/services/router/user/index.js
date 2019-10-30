import Profile from "@/components/user/Profile"
import UserList from "@/components/user/List"
import store from "../../store";

const USERS_PERMISSIONS = ["users"]

export default [
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter(to, from, next) {
            if (store.state.authenticated) {
                next()
                return
            } 
            next("/")
        }
    },
    {
        path: '/users',
        name: 'users',
        component: UserList,
        beforeEnter(to, from, next) {
            if (store.getters.accessAny(...USERS_PERMISSIONS)) {
                next()
                return
            } 
            next("/")
        }
    },
]