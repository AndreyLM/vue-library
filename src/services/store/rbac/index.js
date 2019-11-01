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
            let response = await context.dispatch('authenticatedRequest', { url: ROLES }, { root: true } )
            response.status == 200 && context.commit("setRoles", response.data.roles)
            return response
        },
        async loadPermissions(context) {
            let response = await context.dispatch('authenticatedRequest', { url: PERMISSIONS }, { root: true } )
            response.status == 200 && context.commit("setPermissions", response.data.permissions)
            return response
        },
        async getRolePermissions(context, data) {
            return await context.dispatch('authenticatedRequest', { url: `${ROLES}/${data}` }, { root: true } )
        },
        async updateRolePermissions(context, data) {
            return await context.dispatch(
                'authenticatedRequest', 
                { url: `${ROLES}/${data.uuid}`, data: data,  method: 'PATCH' }, 
                { root: true } )
        },
        async createRole(context, data) {
            return await context.dispatch('authenticatedRequest', { url: ROLES, data: data, method: 'POST' }, { root: true } )
        },
        async deleteRole(context, data) {
            return await context.dispatch(
                'authenticatedRequest', 
                { url: `${ROLES}/${data.uuid}`, data: data, method: 'DELETE' }, 
                { root: true } )
        }
    }
}


