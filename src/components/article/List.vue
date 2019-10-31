<template lang="pug">
     v-col(
         cols="12"
     )
            v-card.elevation-12
                v-toolbar.dark(color="primary")
                    v-toolbar-title Articles
                    v-spacer
                    v-text-field(
                        v-model="options.search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    )
                v-card-text
                    v-dialog(
                        v-model="dialog"
                        max-width="500px"
                    )
                        article-form(
                            :article="editedItem"
                            :is_new="is_new"
                            :languages="languages"
                            @submitArticle="submitArticle"
                            @cancelArticle="cancelArticle"
                        )

                    v-data-table(
                        :headers="headers"
                        :items="articles"
                        :options.sync="options"
                        :server-items-length="totalCount"
                        :loading="loading"
                        :search.sync="options.search"
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
                                v-spacer
                                v-icon(
                                    color="primary"
                                    @click="newArticle"
                                    x-large
                                ) add_box
                        
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
import ArticleForm from "./ArticleForm"

export default {
    name: "descriptionList",
    components: { ArticleForm },
    data: () => {
        return {
            loading: true,
            search: '',
            dialog: false,
            editedIndex: -1,
            is_new: true,
            editedItem: {
                id: "",
                code: 0,
                language: "",
                title: "",
                description: ""
            },
            options: { search: ''},
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
                await this.$store.dispatch("article/loadList", this.options)
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
            languages: state => state.article.languages,
            articles: state => state.article.descriptionList,
            totalCount: state => state.article.totalCount,
        })
    },
    methods: {
        newArticle() {
            this.dialog = true
        },
        submitArticle() {
            this.dialog = false
        },
        cancelArticle() {
            this.dialog = false
        },
        editItem(item) {
            this.editedIndex = this.articles.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        close() {
            this.dialog = false
            this.editedItem = {}
        },
        save() {
            if( this.editedIndex > -1 ) {
                Object.assign(this.articles[this.editedIndex], this.editedItem)
            }
            this.close()
        }
    },
    mounted() {
        // this.$store.dispatch("description_manager/loadDescriptionList", this.options) 
        !this.languages.length && this.$store.dispatch("article/loadLanguages")
    }
}

</script>

