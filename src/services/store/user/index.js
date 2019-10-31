const PROFILE = "/api/profile";
const USERS =  "/api/users";

export default {
    namespaced: true,
    state: {
        userList: [],
        page: 0,
        totalCount: 0,

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
        },
        updateUser(state, data) {
            state.userList.find( (el) => {
                if(el.uuid == data.uuid) {
                    Object.assign(el, data)        
                }
            })
        } 
    },
    actions: {
        clearUserList(context) {
            context.commit("setUserList", [])
            context.commit("setPage", 0)
            context.commit("setTotalCount", 0)
        },
        async getProfile(context, data) {
            let response = await context.rootState.$server.request( PROFILE, data, 'GET' )
            if (response.status == 401 ) {
                context.dispatch("logout", null, { root: true })
            }
            return response
        },
        async saveProfile(context, data) {
            return await context.rootState.$server.request( PROFILE, data, 'PATCH' )
        },
        async loadUserList(context, data) {
            let limit = (data.page) ? (data.page - 1 ) : 0
            let order_by = data.sortBy[0] ? data.sortBy[0] + ( data.sortDesc[0] ? " DESC": "") : ""

            let request = {
                "limit": data.itemsPerPage || 10,
                "offset": limit,
                "order_by": order_by,  
            }
            let response = await context.rootState.$server.request( USERS, request, 'GET' )
            if (response.status == 200) {
                context.commit("setTotalCount", await response.data.count)
                context.commit("setUserList", await response.data.users)
                
                return response.data.totalCount
            }

            return false
        },
        async updateUser(context, data) {
            let request = Object.assign({}, data)
            request.user_uuid = request.uuid
            request.is_active = request.is_active ? 1 : 0; 
            console.log(request)
            let response = await context.rootState.$server.request( `${USERS}/${request.uuid}`, request, 'PATCH' )
            if (response.status == 200) {
                context.commit("updateUser", data)
            }

            return response
        }
    }
}


