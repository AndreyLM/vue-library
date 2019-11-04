<template lang="pug">
     v-col(
         cols="12"
     )
        v-card.elevation-12
            v-toolbar.dark(color="primary")
                v-toolbar-title {{ $t('register.title') }}
                v-spacer
            v-card-text
                v-dialog(
                    v-model="dialog"
                    max-width="500px"
                )

                v-data-table.elevation-1(
                    :headers="headers"
                    :items="registers"
                    class="elevation-1"
                )
                    template(
                        v-slot:top
                    )
                        v-toolbar(
                            flat
                            color="white"
                        )
                            v-toolbar-title {{ $t('form.title.list') }}
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

