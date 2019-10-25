<template lang="pug">
     v-col(
         cols="12"
     )
        v-card.elevation-12
            v-toolbar.dark(color="primary")
                v-toolbar-title RBAC Manager
                v-spacer
            v-card-text
                v-dialog(
                    v-model="dialog"
                    max-width="500px"
                )
                    v-card
                        v-card-title
                            span.headline New Role
                        v-card-text
                            v-text-field(
                                v-model="role_name"
                                label="Role name"
                                @input="$v.role_name.$touch()"
                                @blur="$v.role_name.$touch()"
                                :error-messages="$v.role_name.$dirty && !$v.role_name.required ? [ 'The field is required' ] : []"
                            )

                        v-card-actions
                            v-spacer
                            v-btn(
                                color="blue darken-1" 
                                text 
                                @click="close"
                            ) Cancel
                            v-btn(
                                color="blue darken-1" 
                                text 
                                @click="save"
                            ) Save
                            v-spacer

                v-row
                    v-col(cols="4")
                        h4 Roles
                        v-radio-group(
                            v-model="selectedRoleUUID"
                        )
                            v-row(
                                v-for="role in roles"
                                :key="role.uuid"
                            )
                                v-col(cols="10")
                                    v-radio(
                                        :label="role.name"
                                        :value="role.uuid"
                                        @change="getRolePermissions(role.uuid)"
                                    )
                                v-col(cols="2")
                                    span(
                                        color="danger"
                                        @click="deleteRole(role.uuid)"
                                    ) X
                       
                        v-icon(
                            color="primary"
                            @click="createRoleDialog"
                            x-large
                        ) add_box
                    v-col(cols="8")
                        h4 Permissions
                        v-row(v-if="loading")
                            v-col.text-center(cols="12")
                                v-progress-circular(
                                    :size="70"
                                    :width="7"
                                    color="purple"
                                    indeterminate
                                )

                        v-row
                            v-col(
                                v-for="permission in permissions"    
                                :key="permission.uuid"
                                cols="6"
                            )
                                v-checkbox(
                                    v-model="selectedRolePermissions"
                                    :label="`${permission.name}  (${permission.description})`"
                                    :value="permission"
                                    return-object
                                )
            v-card-actions
                v-spacer
                v-btn(
                    color="default"
                    @click="reset"
                ) Reset
                v-btn(
                    color="primary"
                    @click="updateRolePermissions"
                ) Save
                v-spacer

</template>

<script>

import { mapState } from "vuex"
import { required } from "vuelidate/lib/validators"

export default {
    name: "index",
    data: () => {
        return {
            dialog: false,
            role_name: "",
            loading: false,
            selectedRoleUUID: "",
            selectedRolePermissions: [],
        }
    },
    computed: {
        ...mapState({
            roles: state => state.rbac.roles,
            permissions: state => state.rbac.permissions,
        })
    },
    validations: {
        role_name: { required }
    },
    methods: {
        async getRolePermissions(uuid) {
            this.loading = true
            let resp = await this.$store.dispatch("rbac/getRolePermissions", uuid)
            if (resp.status == 200) {
                this.selectedRolePermissions = resp.data.permissions
                this.loading = false
                return
            }
            this.$notify({
                    group: "alerts",
                    title: resp.status,
                    text: resp.message,
                    type: 'error',
            })
            this.loading = false
        },
        async updateRolePermissions() {
            this.loading = true
            let uuids = this.selectedRolePermissions.reduce((arr, val ) => { arr.push(val.uuid); return arr }, [])
            let resp = await this.$store.dispatch("rbac/updateRolePermissions",{ uuid: this.selectedRoleUUID, permissions: uuids } )
            let type = (resp.status == 200) ? "success" : "error"; 
            this.$notify({
                    group: "alerts",
                    title: resp.status || "Undefined status",
                    text: resp.message || "Undefined error",
                    type: type,
            })
            this.loading = false
        },
        reset() {
            this.selectedRoleUUID && this.getRolePermissions(this.selectedRoleUUID)
        },
        createRoleDialog() {
            this.dialog = true
        },
        close() {
            this.dialog = false
            this.role_name = ""
        },
        async save() {
            this.$v.$touch()
            if( this.$v.$invalid ) {
                this.$notify({
                    group: "alerts",
                    title: "Invalid data",
                    text: "Please, enter correct data",
                    type: "error",
                })
                return
            }
            let resp = await this.$store.dispatch("rbac/createRole", { name: this.role_name })
            if ( resp.status == 200 ) {
                // TODO neet to get role from response
                await this.$store.dispatch("rbac/loadRoles")
                this.$notify({
                    group: "alerts",
                    title: resp.status,
                    text: resp.message,
                    type: "success",
                })
                this.dialog = false
                return
            }

            this.$notify({
                    group: "alerts",
                    title: resp.status || 0,
                    text: resp.message || "Undefined",
                    type: "error",
                })
            this.dialog = false
        },
        deleteRole(uuid) {
            
        },
    },
    created() {
        !this.roles.length && this.$store.dispatch("rbac/loadRoles")
        !this.permissions.length && this.$store.dispatch("rbac/loadPermissions")
    }    
}
</script>