import { axios } from '@/plugins/axios'
<template lang="pug">
    v-layout.fill-height.align-center.justify-center
        v-flex.sm12.sm8.md4
            v-card.elevation-12
                v-toolbar.dark(color="primary")
                    v-toolbar-title File upload
                    v-spacer
                v-card-text
                    v-form(
                        enctype="multipart/form-data"
                        method="post"
                    )
                        input(
                            placeholder="Upload your document"
                            label="File input"
                            @change="handleFileUpload()"
                            type="file"
                            id="file"
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
export default {
    name: "upload",
    data: () => {
        return {
            file: null
        }
    },
    methods: {
        async upload() {

            let formData = new FormData();

            formData.append('file', this.file);

            let resp = await this.$server.request("api/upload-document", formData, 'POST', { 'Content-Type': 'multipart/form-data' } )
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
        async profile() {

            let resp = await this.$store.dispatch("profile",{})
            
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
        }
    },
}
</script>

