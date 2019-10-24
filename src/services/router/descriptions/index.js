import DescriptionUpload from "@/components/descriptions/Upload"
import DescriptionList from "@/components/descriptions/List"


export default [
    {
        path: '/upload',
        name: 'upload',
        component: DescriptionUpload
    },
    {
        path: '/descriptions',
        name: 'descriptions',
        component: DescriptionList
    },
]