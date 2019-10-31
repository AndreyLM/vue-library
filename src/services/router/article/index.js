import Settings from "@/components/article/Settings"
import List from "@/components/article/List"

import store from "../../store";

const SETTINGS_PERMISSIONS = ["descriptions_upload"]
const ARTICLE_PERMISSIONS = ["descriptions_list"]

export default [
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        beforeEnter(to, from, next) {
            if (store.getters.accessAny(...SETTINGS_PERMISSIONS)) {
                    next()
                    return
            } 
            next("/")
        }
    },
    {
        path: '/articles',
        name: 'articles',
        component: List,
        beforeEnter(to, from, next) {
            if (store.getters.accessAny(...ARTICLE_PERMISSIONS)) {
                    next()
                    return
            } 
            next("/")
        }
    },
]