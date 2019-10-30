import Profile from "@/components/user/Profile"
import UserList from "@/components/user/List"
import store from "../../store";

export default [
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter(to, from, next) {
            if (!store.state.authenticated) {
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
            if (store.state.user.permissions.includes("roles")) {
                next()
                return
            } 
            next("/")
        }
    },
]