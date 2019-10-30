const ARTICLES = "/api/descriptions"
const IMPORT = "/api/upload-document"
const LANGUAGES = "/api/languages"

export default {
    namespaced: true,
    state: {
        descriptionList: [],
        page: 0,
        totalCount: 0,
        languages: [],
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
        },
        setLanguages(state, data) {
            state.languages = data.languages || []
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
                "search": data.search || "",  
            }
            let response = await context.rootState.$server.request( ARTICLES, request, 'GET' )
            response.status == 200 && context.commit("setTotalCount", response.data.count) 
            response.status == 200 && context.commit("setRegisterList", await response.data.models) 
                
            return response.data.totalCount || false
        },
        async create(context, data) {
            return await context.rootState.$server.request( ARTICLES, data, 'POST' )
        },
        async upload(context, data) {
            return await context.rootState.$server.request( IMPORT, data, 'POST', { 'Content-Type': 'multipart/form-data' } )
        },
        async loadLanguages(context) {
            let resp = await context.rootState.$server.request( LANGUAGES, {}, 'GET' )
            resp.status == 200 && context.commit("setLanguages", resp.data)
        }
    }
}