const ROLES_LIST = "/api/roles"
const PERMISSIONS_LIST = "/api/permissions"
const ROLES_VIEW = "/api/roles"
const ROLE_UPDATE = "/api/roles"
const ROLE_CREATE = "/api/roles"
const ROLE_DELETE = "/api/roles"

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
            console.log('loadRoles')
            console.log(response)
            response.status == 200 && context.commit("setRoles", response.data.roles)
            return response
        },
        async loadPermissions(context) {
            let response = await context.rootState.$server.request( PERMISSIONS_LIST, {}, 'GET' )
            console.log('loadRolesPermissions')
            console.log(response)
            response.status == 200 && context.commit("setPermissions", response.data.permissions) 
            return response
        },
        async getRolePermissions(context, data) {
            console.log( ROLES_VIEW + '/' + data )
            return await context.rootState.$server.request( ROLES_VIEW + '/' + data, {}, 'GET' )
        },
        async updateRolePermissions(context, data) {
            console.log( ROLE_UPDATE + '/' + data.uuid )
            return await context.rootState.$server.request( ROLE_UPDATE + '/' + data.uuid, data, 'PUT' )
        },
        async createRole(context, data) {
            return await context.rootState.$server.request( ROLE_CREATE, data, 'POST' )
        },
        async deleteRole(context, data) {
            return await context.rootState.$server.request( ROLE_DELETE + '/' + data.uuid, {}, 'DELETE' )
        }
    }
}


