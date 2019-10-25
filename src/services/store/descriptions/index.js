export default {
    namespaced: true,
    state: {
        descriptionList: [],
    },
    mutations: {
        setRegisterList(state, data) {
            state.descriptionList = data
        },
        setPage(state, data) {
            state.page = data
        },
        setTotalCount(state, data) {
            state.totalCount = data
        }
    },
    actions: {
        async loadDescriptionList(context, data) {
            console.log(data)
            let limit = (data.page) ? (data.page - 1 ) : 0
            let order_by = data.sortBy[0] ? data.sortBy[0] + ( data.sortDesc[0] ? " DESC": "") : ""

            let request = {
                "limit": data.itemsPerPage || 10,
                "offset": limit,
                "order_by": order_by,  
            }
            let response = await context.rootState.$server.request( '/descriptions', request, 'GET' )
            if (response.status == 200) {
                context.commit("setTotalCount", await response.data.count)
                context.commit("setRegisterList", await response.data.models)
                
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