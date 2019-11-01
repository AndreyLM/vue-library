<template lang="pug">
    v-card
        v-card-title
            span.headline {{ card_title }}
        v-card-text
            v-text-field(
                name="name",
                label="Name",
                type="text",
                v-model="language.name"
                @input="!$v.language.name.$dirty && $v.language.name.$touch()"
                @blur="!$v.language.name.$dirty && $v.language.name.$touch()"
                :error-messages="nameErrors()"
            )
            v-text-field(
                name="title",
                label="Title",
                type="text"
                v-model="language.title"
                @input="!$v.language.title.$dirty && $v.language.title.$touch()"
                @blur="!$v.language.title.$dirty && $v.language.title.$touch()"
                :error-messages="titleErrors()"
            )
            v-text-field(
                name="translation",
                label="Translation",
                type="text"
                v-model="language.translation"
                @input="!$v.language.translation.$dirty && $v.language.translation.$touch()"
                @blur="!$v.language.translation.$dirty && $v.language.translation.$touch()"
                :error-messages="translationErrors()"
            )
           
        v-card-actions
            v-spacer
            v-btn(
                color="blue darken-1" 
                text 
                @click="cancel"
            ) Cancel
            v-btn(
                color="blue darken-1" 
                text 
                @click="save"
            ) Save
            v-spacer

</template>

<script>

import { required } from 'vuelidate/lib/validators'

export default { 
    name: "language-form",
    props: [ "is_new",  "language" ],
    data: () => {
        return {

        }
    },
    computed: {
        card_title: function() {
            return ( this.is_new ) ? "New language" : "Update language"   
        }
    },
    validations() {
        return {
            language: {
                id: ( this.is_new ) ? { } : { required },
                name: { required },
                title: { required },
                translation: { required },                
            }
        }
    },
    methods: {
        nameErrors() {
            const errors = []
            if (!this.$v.language.name.$dirty) return errors
            !this.$v.language.name.required && errors.push('name is required.')
            return errors
        },
        titleErrors() {
            const errors = []
            if (!this.$v.language.title.$dirty) return errors
            !this.$v.language.title.required && errors.push('translation is required.')
            return errors
        },
        translationErrors() {
            const errors = []
            if (!this.$v.language.translation.$dirty) return errors
            !this.$v.language.translation.required && errors.push('translation is required.')
            return errors
        },
        async save() {
            this.$v.$touch()
            if( this.$v.$invalid ) {
                this.$notify({
                    group: "alerts",
                    title: "Wrong data",
                    text: "Please enter valid data",
                    type: 'error',
                })
                return
            }

            let resp = await this.$store.dispatch("article/saveLanguage", this.language )
            this.$notify({
                group: "alerts",
                title: resp.status,
                text: resp.message,
                type: ( resp.status == 200 ) ? "success" : "error",
            })  
            this.$v.language.$reset()
            this.$emit("submitLanguage")
        },
        cancel() {
            this.$v.language.$reset()
            this.$emit("cancelLanguage")
        },
    }
}

</script>
