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
                        @click="submitFile()"
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

            console.log( formData );
            formData.append('file', this.file);
            console.log( formData );

            let resp = await this.$store.dispatch("upload", { file: formData } )
            //console.log(resp)
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
        submitFile() {
        
            let formData = new FormData();

            formData.append('file', this.file);

            this.$axios( {
                method: 'post',
                url: 'http://mspmlibs.dev7.finport.net/descriptions/upload',
                data: formData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
            .then(function (response) {
                console.log('success');
                console.log(response);
            })
            .catch(function (response) {
                console.log('error');
                console.log(response);
            });
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
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

