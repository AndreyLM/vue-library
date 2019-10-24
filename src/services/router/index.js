import Vue from "vue"
import VueRouter from "vue-router"
import AuthRoutes from "./auth"
import UserRoutes from "./user"

Vue.use(VueRouter)

let allRoutes = []
allRoutes = allRoutes.concat(AuthRoutes, UserRoutes)

export default new VueRouter({
    mode: "history",
    routes: allRoutes
})