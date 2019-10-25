const ROLES_LIST = "/api/roles/index"
const PERMISSIONS_LIST = "/api/permissions/index"
const ROLES_VIEW = "/api/roles/view"
const ROLE_UPDATE = "/api/roles/update"
const ROLE_CREATE = "/api/roles/create"
const ROLE_DELETE = "/api/roles/delete"

export default {
    namespaced: true,
    state: {
        roles: [],
        permissions: [],
    },
    mutations: {
        setRoles(state, data) {
            state.roles = data
        },
        setPermissions(state, data) {
            state.permissions = data
        }
    },
    actions: {
        async loadRoles(context) {
            let response = await context.rootState.$server.request( ROLES_LIST, {}, 'GET' )
            response.status == 200 && context.commit("setRoles", response.data.roles)
            return response
        },
        async loadPermissions(context) {
            let response = await context.rootState.$server.request( PERMISSIONS_LIST, {}, 'GET' )
            response.status == 200 && context.commit("setPermissions", response.data.permissions) 
            return response
        },
        async getRolePermissions(context, data) {
            return await context.rootState.$server.request( ROLES_VIEW, { uuid: data }, 'POST' )
        },
        async updateRolePermissions(context, data) {
            return await context.rootState.$server.request( ROLE_UPDATE, data, 'POST' )
        },
        async createRole(context, data) {
            return await context.rootState.$server.request( ROLE_CREATE, data, 'POST' )
        },
        async deleteRole(context, data) {
            return await context.rootState.$server.request( ROLE_DELETE, data, 'POST' )
        }
    }
}


