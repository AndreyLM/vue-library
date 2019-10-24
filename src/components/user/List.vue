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
                                                v-col(cols12 sm="6" md="4")
                                                    v-text-field(
                                                        v-model="editedItem.login"
                                                        label="Login"
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
                        
                        template(
                            v-slot:item.action="{ item }"
                        )
                            v-icon(
                                class="mr-2"
                                small
                                @click="editItem(item)"
                            ) edit
                               
                        

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
        save() {
            if( this.editedIndex > -1 ) {
                Object.assign(this.users[this.editedIndex], this.editedItem)
            }
            this.close()
        }
    },
    mounted() {
        // this.$store.dispatch("user_manager/loadUserList", this.options) 
    }
}

</script>

