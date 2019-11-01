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
            return await context.dispatch('authenticatedRequest', { url: PROFILE, data: data }, { root: true } )
        },
        async saveProfile(context, data) {
            return await context.dispatch('authenticatedRequest', { url: PROFILE, data: data, method: 'PATCH' }, { root: true } )
        },
        async loadUserList(context, data) {
            let request = {
                url: USERS,
                data: {
                    "limit": data.itemsPerPage || 10,
                    "offset":  (data.page) ? (data.page - 1 ) : 0,
                    "order_by": data.sortBy[0] ? data.sortBy[0] + ( data.sortDesc[0] ? " DESC": "") : "",
                },
            }

            let response = await context.dispatch('authenticatedRequest', request, { root: true })
            response.status == 200 && context.commit("setTotalCount", response.data.count) 
            response.status == 200 && context.commit("setUserList", response.data.users) 
                
            return response.data.totalCount || false
        },
        async updateUser(context, data) {
            let requestData = Object.assign({}, data)
            requestData.user_uuid = request.uuid
            requestData.is_active = request.is_active ? 1 : 0;
            let request = {
                url: `${USERS}/${request.uuid}`, 
                data: requestData, 
                method: 'PATCH'
            }
            let response = await context.dispatch('authenticatedRequest', request, { root: true } )
            response.status == 200 && context.commit("updateUser", data)
            return response
        }
    }
}


