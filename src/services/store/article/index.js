const ARTICLE_LIST = "/api/descriptions"
const ARTICLE_CREATE = "/api/descriptions/create"

export default {
    namespaced: true,
    state: {
        descriptionList: [],
        page: 0,
        totalCount: 0,
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
        async loadList(context, data) {
            let limit = (data.page) ? (data.page - 1 ) : 0
            let order_by = data.sortBy[0] ? data.sortBy[0] + ( data.sortDesc[0] ? " DESC": "") : ""

            let request = {
                "limit": data.itemsPerPage || 10,
                "offset": limit,
                "order_by": order_by,  
            }
            let response = await context.rootState.$server.request( ARTICLE_LIST, request, 'GET' )
            response.status == 200 && context.commit("setTotalCount", response.data.count) 
            response.status == 200 && context.commit("setRegisterList", await response.data.models) 
                
            return response.data.totalCount || false
        },
        async create(context, data) {
            return await context.rootState.$server.request( ARTICLE_CREATE, data, 'POST' )
        }
    }
}