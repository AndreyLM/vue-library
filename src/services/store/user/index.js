const PROFILE_URL = "/profile/index";
const USERS_LIST = "/users/index";

export default {
    namespaced: true,
    state: {
        userList: [],
        page: 4,
        totalCount: 5,

    },
    mutations: {
        setUserList(state, data) {
            state.userList = data
        },
        setPage(state, data) {
            state.page = data
        },
        setTotalCount(state, data) {
            state.totalCount = data
        }
    },
    actions: {
        clearUserList(context) {
            context.commit("setUserList", [])
            context.commit("setPage", 0)
            context.commit("setTotalCount", 0)
        },
        async getProfile(context, data) {
            let response = await context.rootState.$server.request( PROFILE_URL, data, 'GET' )
            return response
        },
        async saveProfile(context, data) {
            let response = await context.rootState.$server.request( PROFILE_URL, data, 'POST' )
            if (response.status == 200 ) {
                return true
            }

            return false
        },
        async loadUserList(context, data) {
            console.log(data)
            let limit = (data.page) ? (data.page - 1 ) : 0
            let order_by = data.sortBy[0] ? data.sortBy[0] + ( data.sortDesc[0] ? " DESC": "") : ""

            let request = {
                "limit": data.itemsPerPage || 10,
                "offset": limit,
                "order_by": order_by,  
            }
            let response = await context.rootState.$server.request( USERS_LIST, request, 'POST' )
            if (response.status == 200) {
                context.commit("setTotalCount", await response.data.count)
                context.commit("setUserList", await response.data.users)
                
                return response.data.totalCount
            }

            return false
        }
    }
}

// groupBy: Array(0)
// groupDesc: Array(0)
// itemsPerPage: 10
// multiSort: false
// mustSort: false
// page: 1