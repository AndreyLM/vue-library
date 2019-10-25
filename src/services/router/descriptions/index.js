import ArticleUpload from "@/components/article/Upload"
import List from "@/components/article/List"


export default [
    {
        path: '/upload',
        name: 'upload',
        component: ArticleUpload
    },
    {
        path: '/articles',
        name: 'articles',
        component: List
    },
]