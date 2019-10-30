import ArticleUpload from "@/components/article/Upload"
import List from "@/components/article/List"

import store from "../../store";


export default [
    {
        path: '/upload',
        name: 'upload',
        component: ArticleUpload,
        beforeEnter(to, from, next) {
            if (store.getters.accessAny("descriptions_upload")) {
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
            if (store.getters.accessAny("descriptions_list")) {
                    next()
                    return
            } 
            next("/")
        }
    },
]