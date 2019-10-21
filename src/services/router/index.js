import Vue from "vue"
import VueRouter from "vue-router"
import AuthRoutes from "./auth"
import DocumentsRoutes from "./documents"

Vue.use(VueRouter)

let allRoutes = []
allRoutes = allRoutes.concat(AuthRoutes)
allRoutes = allRoutes.concat(DocumentsRoutes)

export default new VueRouter({
    mode: "history",
    routes: allRoutes
})