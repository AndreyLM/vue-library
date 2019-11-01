<template lang="pug">
    v-layout.fill-height.align-center.justify-center
        v-flex.sm12.sm8.md4
            v-card.elevation-12
                v-toolbar.dark(color="primary")
                    v-toolbar-title {{ $t('form.title.login') }}
                    v-spacer
                v-card-text
                    v-form
                        v-text-field(
                            prepend-icon="person",
                            name="login",
                            :label=" $t('form.label.loginOrEmail') ",
                            type="text"
                            v-model="user"
                            @input="$v.user.$touch()"
                            @blur="$v.user.$touch()"
                            :error-messages="userErrors"
                        )
                        v-text-field(
                            prepend-icon="lock",
                            name="password",
                            :label=" $t('form.label.password') ",
                            type="password",
                            v-model="password"
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                            :error-messages="passwordErrors"
                        )
                v-card-actions
                    v-spacer
                    v-btn(
                        color="default",
                        @click.prepend="registration"
                    ) {{ $t('buttons.registration') }}
                    v-btn(
                        color="primary",
                        @click.prepend="login"
                    ) {{ $t('buttons.login') }}



</template>

<script>

import { required, minLength } from 'vuelidate/lib/validators'

export default {

    name: "login",
    data: () => {
        return {
            user: "",
            password: ""
        }
    },
    validations: {
        user: {required, minLength: minLength(4)},
        password: {required, minLength: minLength(6)},
    },
    computed: {
        userErrors() {
            var errors = []
            if(!this.$v.user.$dirty) {
                return errors
            }
            !this.$v.user.required && errors.push( this.$t('errors.required') )
            !this.$v.user.minLength && errors.push( this.$tc('errors.minLength', 4) )
            return errors
        },
        passwordErrors() {
            var errors = []
            if(!this.$v.password.$dirty) {
                return errors
            }
            !this.$v.password.required && errors.push( this.$t('errors.required') )
            !this.$v.password.minLength && errors.push( this.$tc('errors.minLength', 6) )
            return errors
        }
    },
    methods: {
        async login() {
            let resp = await this.$store.dispatch("login", { login: this.user, password: this.password } )
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
        registration() {
            this.$router.push({ path: '/registration' })
        }
    },
    mouted() {
    }
}
</script>

