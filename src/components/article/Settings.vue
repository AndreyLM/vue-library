<template lang="pug">
    v-col(
        cols="12"
    )
        v-card.elevation-12
            v-toolbar.dark(color="primary")
                v-toolbar-title {{ $t("article.settings") }}
                v-spacer
            v-card-text
             v-card-text
                v-dialog(
                    v-model="dialog"
                    max-width="500px"
                )
                    language-form(
                        :language="language"
                        :is_new="is_new"
                        @submitLanguage="submitLanguage"
                        @cancelLanguage="cancelLanguage"
                    )

                v-row
                    v-col.elevation-1.mr-auto.ml-auto(
                        cols="12"
                        md="5"
                    )
                        h2.font-italic.font-weight-bold {{ $t("article.languages") }}
                        v-spacer
                        v-btn(
                            @click="addLanguage"
                        ) 
                            v-icon(
                            ) add
                            | {{ $t('buttons.add')}}
                        v-list-item(
                            v-for="item in languages"
                            :key="item.name"
                        )
                            v-list-item-icon
                                span {{ item.name }}

                            v-list-item-content
                                v-list-item-title(
                                    v-text="`${item.title} (${item.translation})`"
                                ) 

                            v-list-item-avatar
                                v-btn(
                                    text
                                    @click="deleteLanguage(item.id)"
                                ) X
                                v-spacer
                                v-icon(
                                    @click="editLanguage(item)"
                                ) edit

                    v-col.elevation-1.mr-auto.ml-auto(
                        cols="12"
                        md="5"
                    )
                        h2.font-italic.font-weight-bold {{ $t("article.import") }}
                        v-spacer
                        input(
                            placeholder="Upload your document"
                            label="File input"
                            type="file"
                            ref="file"
                        )
                        v-btn(
                            color="primary",
                            @click="upload"
                        ) Upload
                       

</template>

<script>

import { mapState } from "vuex"
import LanguageForm from "./LanguageForm"

export default {
    name: "upload",
    components: { LanguageForm },
    data: () => {
        return {
            language: {
                id: 0,
                name: "",
                title: "",
                translation: "",
            },
            is_new: false,
            dialog: false,
            dialogTitle: "Create Language",
        }
    },
    computed: {
        ...mapState({
            languages: state => state.article.languages
        })
    },
    methods: {
    
        async upload() {
            let formData = new FormData();
            if( !this.$refs.file.files.length ) {
                this.$notify({
                    group: "alerts",
                    title: "Помилка",
                    text: "Виберіть файл",
                    type: 'error',
                })
                return
            }
            formData.append('file', this.$refs.file.files[0]);
            let resp = await this.$store.dispatch("article/upload", formData )

            this.$notify({
                group: "alerts",
                title: resp.status,
                text: resp.message,
                type: resp.status == 200 ? 'success' : 'error',
            })
        },
        async deleteLanguage(id) {
            let resp = await this.$store.dispatch("article/deleteLanguage", id )
            this.$notify({
                group: "alerts",
                title: resp.status,
                text: resp.message,
                type: resp.status == 200 ? 'success' : 'error',
            })
        },
        addLanguage() {
            this.is_new = true
            this.language = Object.assign({}, { id: 0, name: "", title: "", translation: "" })
            this.dialog = true
        },
        editLanguage(language) {
            this.is_new = false
            this.language = Object.assign({}, language)
            this.dialog = true
        },
        cancelLanguage() {
            this.dialog = false
        },
        submitLanguage() {
            this.dialog = false
        },
    },
    async mounted() {
        await this.$store.dispatch("article/loadLanguages")
    }
}
</script>

