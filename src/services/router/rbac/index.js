import RBAC from "@/components/rbac/Index"

import store from "../../store";
export default [
    {
        path: '/rbac',
        name: 'rbac',
        component: RBAC,
        beforeEnter(to, from, next) {
            if (store.state.user.permissions.includes("roles")) {
                    next()
                    return
            } 
            next("/")
        }
    },
]