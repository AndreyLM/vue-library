<template lang="pug">
     v-col(
         cols="12"
     )
            v-card.elevation-12
                v-toolbar.dark(color="primary")
                    v-toolbar-title Descriptions Manager
                    v-spacer
                v-card-text
                   v-data-table(
                        :headers="headers"
                        :items="descriptions"
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
    name: "descriptionList",
    data: () => {
        return {
            loading: true,
            dialog: false,
            editedIndex: -1,
            editedItem: {
                uuid: "",
                code: 0,
                language: "",
                title: "",
                description: ""
            },
            options: {},
            headers: [
                { text: 'Code', value: 'code' },
                { text: 'Language', value: 'language' },
                { text: 'Title', value: 'title' },
                { text: 'Description', value: 'description' },
                { text: 'Actions', value: 'action', sortable: false },
            ]
        }
    },
    watch: {
        options: {
            async handler() {
                this.loading = true
                await this.$store.dispatch("description_manager/loadDescriptionList", this.options)
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
            descriptions: state => state.description_manager.descriptionList,
            totalCount: state => state.description_manager.totalCount,
        })
    },
    methods: {
        editItem(item) {
            this.editedIndex = this.descriptions.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        close() {
            this.dialog = false
            this.editedItem = {}
        },
        save() {
            if( this.editedIndex > -1 ) {
                Object.assign(this.descriptions[this.editedIndex], this.editedItem)
            }
            this.close()
        }
    },
    mounted() {
        // this.$store.dispatch("description_manager/loadDescriptionList", this.options) 
    }
}

</script>

