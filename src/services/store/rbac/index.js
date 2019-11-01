const ROLES= "/api/roles"
const PERMISSIONS = "/api/permissions"

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
            let response = await context.rootState.$server.request( ROLES, {}, 'GET' )
            response.status == 200 && context.commit("setRoles", response.data.roles)
            response.status == 401 && context.dispatch("logout")

            return response
        },
        async loadPermissions(context) {
            let response = await context.rootState.$server.request( PERMISSIONS, {}, 'GET' )
            response.status == 200 && context.commit("setPermissions", response.data.permissions) 
            response.status == 401 && context.dispatch("logout")

            return response
        },
        async getRolePermissions(context, data) {
            return await context.rootState.$server.request( `${ROLES}/${data}`, {}, 'GET' )
        },
        async updateRolePermissions(context, data) {
            return await context.rootState.$server.request( `${ROLES}/${data.uuid}`, data, 'PATCH' )
        },
        async createRole(context, data) {
            return await context.rootState.$server.request( ROLES, data, 'POST' )
        },
        async deleteRole(context, data) {
            return await context.rootState.$server.request( `${ROLES}/${data.uuid}`, data, 'DELETE' )
        }
    }
}


