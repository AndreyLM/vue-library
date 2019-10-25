import Vue from "vue"
import VueRouter from "vue-router"
import AuthRoutes from "./auth"
import UserRoutes from "./user"
import RbacRoutes from "./rbac"

Vue.use(VueRouter)

let allRoutes = []
allRoutes = allRoutes.concat(AuthRoutes, UserRoutes, RbacRoutes)

export default new VueRouter({
    mode: "history",
    routes: allRoutes
})