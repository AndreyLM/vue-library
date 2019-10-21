<template lang="pug">
    v-layout.fill-height.align-center.justify-center
        v-flex.sm12.sm8.md4
            v-card.elevation-12
                v-toolbar.dark(color="primary")
                    v-toolbar-title File upload
                    v-spacer
                v-card-text
                    v-form
                        v-file-input(
                            show-size
                            v-model="file"
                            placeholder="Upload your document"
                            label="File input"
                            prepend-icon="mdi-paperclip"
                        )

                v-card-actions
                    v-spacer
                    v-btn(
                        color="primary",
                        @click.prepend="upload"
                    ) Upload
                       

</template>

<script>
export default {
    name: "upload",
    data: () => {
        return {
            file: null
        }
    },
    methods: {
        async upload() {
            let resp = await this.$store.dispatch("descriptions/upload", { file: this.file } )
            if ( resp.status != 200 ) {
                this.$notify({
                    group: "alerts",
                    title: resp.status,
                    text: resp.message,
                    type: 'error',
                })
                return
            }

            this.$router.push({ path: '/' })
        },
    },
}
</script>

