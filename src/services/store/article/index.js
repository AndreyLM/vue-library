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
        },
        saveLanguage(state, data) {
            let ln = data.language
            !data.edit && state.languages.push(ln)
            data.edit && state.languages.forEach( el => {
                if ( el.id == ln.id ) {
                    el.name = ln.name
                    el.title = ln.title
                    el.translation = ln.translation
                }
            })
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
            response.status == 401 && context.dispatch("logout")
            response.status == 200 && context.commit("setTotalCount", response.data.count) 
            response.status == 200 && context.commit("setRegisterList", await response.data.models) 
                
            return response.data.totalCount || false
        },
        async create(context, data) {
            let response = await context.rootState.$server.request( ARTICLES, data, 'POST' ) 
            response.status == 401 && context.dispatch("logout")
            return response
        },
        async update(context, data) {
            let response = await context.rootState.$server.request( ARTICLES + '/' + data.uuid, data, 'PUT' ) 
            response.status == 401 && context.dispatch("logout")
            return response
        },
        async upload(context, data) {
            let response = await context.rootState.$server.request( IMPORT, data, 'POST', { 'Content-Type': 'multipart/form-data' } ) 
            response.status == 401 && context.dispatch("logout")
            return response
        },
        async loadLanguages(context) {
            let response = await context.rootState.$server.request( LANGUAGES, {}, 'GET' )
            response.status == 401 && context.dispatch("logout")
            response.status == 200 && context.commit("setLanguages", response.data.languages)
            return response
        },
        async deleteLanguage(context, id) {
            let resp =  await context.rootState.$server.request( `${LANGUAGES}/${id}`, {}, 'DELETE' )
            if ( resp.status == 200) {
                context.commit("deleteLanguage", id)
            }
            resp.status == 401 && context.dispatch("logout")
            return resp
        },
        async saveLanguage(context, data) {
            let edit = data.id ? true : false 
            let url = data.id ? `${LANGUAGES}/${data.id}` : `${LANGUAGES}`
            let method = data.id ? 'PATCH' : 'POST'
            let resp =  await context.rootState.$server.request( url, data, method )
            if ( resp.status == 200) {
                !edit && ( data.id = resp.data.id )
                context.commit("saveLanguage", { language: data, edit: edit })
            }
            resp.status == 401 && context.dispatch("logout")
            return resp
        }

    }
}