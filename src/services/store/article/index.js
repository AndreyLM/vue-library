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
            let request = {
                url: ARTICLES,
                data: {
                    "limit": data.itemsPerPage || 10,
                    "offset":  (data.page) ? (data.page - 1 ) : 0,
                    "order_by": data.sortBy[0] ? data.sortBy[0] + ( data.sortDesc[0] ? " DESC": "") : "",
                    "search": data.search || "",  
                },
            }

            let response = await context.dispatch('authenticatedRequest', request, { root: true })
            response.status == 200 && context.commit("setTotalCount", response.data.count) 
            response.status == 200 && context.commit("setRegisterList", response.data.models) 
                
            return response.data.totalCount || false
        },
        async create(context, data) {
            let request = {url: ARTICLES, data: data, method: 'POST'}
            let response = await context.dispatch('authenticatedRequest', request, { root: true } )
            return response
        },
        async update(context, data) {
            let response = await context.rootState.$server.request( ARTICLES + '/' + data.uuid, data, 'PUT' ) 
            response.status == 401 && context.dispatch("logout")
            return response
        },
        async upload(context, data) {
            let request = {url: IMPORT, data: data, method: 'POST', headers: { 'Content-Type': 'multipart/form-data' } }
            let response = await context.dispatch('authenticatedRequest', request, { root: true } )
            return response
        },
        async loadLanguages(context) {
            let response = await context.dispatch('authenticatedRequest', { url: LANGUAGES }, { root: true } )
            response.status == 200 && context.commit("setLanguages", response.data.languages)
            return response
        },
        async deleteLanguage(context, id) {
            let response = await context.dispatch('authenticatedRequest', { url: `${LANGUAGES}/${id}`, method: 'DELETE' }, { root: true } )
            response.status == 200 && context.commit("deleteLanguage", id)
            return response
        },
        async saveLanguage(context, data) {
            let edit = data.id ? true : false 

            let request = {
                url: edit ? `${LANGUAGES}/${data.id}` : `${LANGUAGES}`, 
                data: data, 
                method: edit ? 'PATCH' : 'POST'
            }
            let response = await context.dispatch('authenticatedRequest', request, { root: true } )
            response.status == 200 && !edit && ( data.id = response.data.id )
            response.status == 200 && context.commit("saveLanguage", { language: data, edit: edit })
            return response
        }

    }
}