import RBAC from "@/components/rbac/Index"
import store from "../../store";

const ROLES_PERMISSIONS = ["roles"]

export default [
    {
        path: '/rbac',
        name: 'rbac',
        component: RBAC,
        beforeEnter(to, from, next) {
            if (store.getters.accessAny(...ROLES_PERMISSIONS)) {
                    next()
                    return
            } 
            next("/")
        }
    },
]