<template lang="pug">
    v-col(
        cols="12"
    )
        v-card.elevation-12
            v-toolbar.dark(color="primary")
                v-toolbar-title {{ $t("article.settings") }}
                v-spacer
            v-card-text
                v-row
                    v-col(
                        cols="12"
                    )
                        h2 {{ $t("article.languages") }}
                        input(
                            placeholder="Upload your document"
                            label="File input"
                            type="file"
                            ref="file"
                        )

                    v-col(
                        cols="12"
                    )
                        h2 {{ $t("article.import") }}
                        input(
                            placeholder="Upload your document"
                            label="File input"
                            type="file"
                            ref="file"
                        )

                v-card-actions
                    v-spacer
                    v-btn(
                        color="primary",
                        @click="upload"
                    ) Upload
                       

</template>

<script>

import { mapState } from "vuex"

export default {
    name: "upload",
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

            if ( resp.status != 200 ) {
                this.$notify({
                    group: "alerts",
                    title: resp.status,
                    text: resp.message,
                    type: 'error',
                })
                return
            }

            this.$router.push({ path: '/upload' })
        },
    },
    async mounted() {
        await this.$store.dispatch("article/loadLanguages")
    }
}
</script>

