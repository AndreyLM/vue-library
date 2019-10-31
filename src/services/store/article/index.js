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
            state.languages = data
        },
        deleteLanguage(state, data) {
            state.languages = state.languages.filter( el => el.id !== data ) 
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
        async update(context, data) {
            return await context.rootState.$server.request( ARTICLES + '/' + data.uuid, data, 'PUT' )
        },
        async upload(context, data) {
            return await context.rootState.$server.request( IMPORT, data, 'POST', { 'Content-Type': 'multipart/form-data' } )
        },
        async loadLanguages(context) {
            let response = await context.rootState.$server.request( LANGUAGES, {}, 'GET' )
            response.status == 200 && context.commit("setLanguages", response.data.languages)
            return response
        },
        async deleteLanguage(context, id) {
            let resp =  await context.rootState.$server.request( `${LANGUAGES}/${id}`, {}, 'DELETE' )
            if ( resp.status == 200) {
                context.commit("deleteLanguage", id)
            }
            return resp
        }
    }
}