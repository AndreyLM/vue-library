<template lang="pug">
    v-card
        v-card-title
            span.headline {{ card_title }}
        v-card-text
            v-text-field(
                name="code",
                :label=" $t('form.label.code') ",
                type="number"
                v-model="article.code"
                @input="!$v.article.code.$dirty && $v.article.code.$touch()"
                @blur="!$v.article.code.$dirty && $v.article.code.$touch()"
                :error-messages="codeErrors()"
            )
            v-select(
                name="language"
                :label=" $t('form.label.language') "
                v-model="article.language"
                :items="languages"
                item-text="translation"
                item-value="name"
                @input="!$v.article.language.$dirty && $v.article.language.$touch()"
                @blur="!$v.article.language.$dirty && $v.article.language.$touch()"
                :error-messages="languageErrors()"
            )
            v-text-field(
                name="title",
                :label=" $t('form.label.title') ",
                type="text"
                v-model="article.title"
                @input="!$v.article.title.$dirty && $v.article.title.$touch()"
                @blur="!$v.article.title.$dirty && $v.article.title.$touch()"
                :error-messages="titleErrors()"
            )
            v-textarea(
                name="description",
                :label=" $t('form.label.description') ",
                type="text"
                v-model="article.description"
                @input="!$v.article.description.$dirty && $v.article.description.$touch()"
                @blur="!$v.article.description.$dirty && $v.article.description.$touch()"
                :error-messages="descriptionErrors()"
            )
        v-card-actions
            v-spacer
            v-btn(
                color="blue darken-1"
                text
                @click="cancel"
            ) {{ $t('buttons.cancel') }}
            v-btn(
                color="blue darken-1"
                text
                @click="save"
            ) {{ $t('buttons.save') }}
            v-spacer

</template>

<script>

import { required } from 'vuelidate/lib/validators'

export default {
    name: "article-form",
    props: [ "is_new",  "article", "languages" ],
    data: () => {
        return {

        }
    },
    computed: {
        card_title: function() {
            return ( this.is_new ) ? "New article" : "Update article"
        }
    },
    validations() {
        return {
            article: {
                id: ( this.is_new ) ? { } : { required },
                code: { required },
                language: { required },
                title: { required },
                description: { required },
            }
        }
    },
    methods: {
        codeErrors() {
            const errors = []
            if (!this.$v.article.code.$dirty) return errors
            !this.$v.article.code.required && errors.push( this.$t('errors.required') )
            return errors
        },
        languageErrors() {
            const errors = []
            if (!this.$v.article.language.$dirty) return errors
            !this.$v.article.language.required && errors.push( this.$t('errors.required') )
            return errors
        },
        titleErrors() {
            const errors = []
            if (!this.$v.article.title.$dirty) return errors
            !this.$v.article.title.required && errors.push( this.$t('errors.required') )
            return errors
        },
        descriptionErrors() {
            const errors = []
            if (!this.$v.article.description.$dirty) return errors
            !this.$v.article.description.required && errors.push( this.$t('errors.required') )
            return errors
        },
        async save() {
            this.$v.$touch()
            if( this.$v.$invalid ) {
                this.$notify({
                    group: "alerts",
                    title: this.$t('alert.title'),
                    text: this.$t('alert.text'),
                    type: 'error',
                })
                return
            }

            let resp = await this.$store.dispatch("article/create", [ this.article ] )
            this.$notify({
                group: "alerts",
                title: resp.status,
                text: resp.message,
                type: ( resp.status == 200 ) ? "success" : "error",
            })
            this.$v.article.$reset()
            this.$emit("submitArticle")
        },
        cancel() {
            this.$v.article.$reset()
            this.$emit("cancelArticle")
        },
    }
}

</script>
