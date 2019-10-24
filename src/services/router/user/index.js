import Profile from "@/components/user/Profile"
import UserList from "@/components/user/List"


export default [
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/users',
        name: 'users',
        component: UserList
    },
]