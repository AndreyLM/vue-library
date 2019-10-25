<template lang="pug">
     v-col(
         cols="12"
     )
        v-card.elevation-12
            v-toolbar.dark(color="primary")
                v-toolbar-title User Manager
                v-spacer
            v-card-text
                v-data-table(
                        :headers="headers"
                        :items="users"
                        :options.sync="options"
                        :server-items-length="totalCount"
                        :loading="loading"
                        class="elevation-1"
                )
                    template(
                        v-slot:top
                    )
                        v-toolbar(
                            flat
                            color="white"
                        )
                            v-toolbar-title List

                        v-dialog(
                            v-model="dialog"
                            max-width="500px"
                        )
                            v-card
                                v-card-title
                                    span.headline Edit
                                v-card-text
                                    v-container
                                        v-row
                                            v-col(cols12 md="6")
                                                v-select(
                                                    v-model="editedItem.role_uuid"
                                                    label="Role"
                                                    :items="roles"
                                                    item-text="name"
                                                    item-value="uuid"
                                                )

                                            v-col(cols12 md="6")
                                                v-switch(
                                                    v-model="editedItem.is_active"
                                                    label="Is active"
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
                    
                    template(
                        v-slot:item.action="{ item }"
                    )
                        v-icon(
                            class="mr-2"
                            small
                            @click="editItem(item)"
                        ) edit
                    template(
                        v-slot:item.is_active="{ item }"
                    )
                        v-checkbox(
                            readonly=true
                            disabled=true
                            v-model="item.is_active"
                        )
                               
                        

</template>

<script>

import { mapState } from "vuex"

export default {
    name: "userList",
    data: () => {
        return {
            loading: true,
            dialog: false,
            editedIndex: -1,
            editedItem: {
                uuid: "",
                login: "",
                is_active: 0,
                created_at: 0,
                full_name: "",
                role_name: "",
                role_uuid: ""
            },
            options: {},
            headers: [
                { text: 'login', value: 'login' },
                { text: 'Full Name', value: 'full_name' },
                { text: 'Active', value: 'is_active' },
                { text: 'Role', value: 'role_name' },
                { text: 'Actions', value: 'action', sortable: false },
            ]
        }
    },
    watch: {
        options: {
            async handler() {
                this.loading = true
                await this.$store.dispatch("user_manager/loadUserList", this.options)
                this.loading = false
            },
            deep: true,
        },
        dialog (val) {
            val || this.close()
        }
    }, 
    computed: {
        ...mapState({
            users: state => state.user_manager.userList,
            totalCount: state => state.user_manager.totalCount,
            roles: state => state.rbac.roles,
        })
    },
    methods: {
        editItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        close() {
            this.dialog = false
            this.editedItem = {}
        },
        async save() {
            if( this.editedIndex == -1 ) {
                this.close()
            }

            let { role_uuid, role_name } = this.editedItem
            this.roles.find( (el) => {
                if(el.uuid == role_uuid) {
                    role_name = el.name
                }
            })
            this.editedItem.role_name = role_name
            let resp = await this.$store.dispatch("user_manager/updateUser", this.editedItem)
            this.$notify({
                group: "alerts",
                title: resp.status || 0,
                text: resp.message || "undefined",
                type: ( resp.status == 200 ) ? "success" : "error",
            })
            this.close()
        }
    },
    mounted() {
        !this.roles.length && this.$store.dispatch("rbac/loadRoles") 
    }
}

</script>

