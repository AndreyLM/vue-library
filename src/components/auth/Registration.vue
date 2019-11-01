<template lang="pug">
    v-layout.fill-height.align-center.justify-center
        v-flex.sm12.md10
            v-card.elevation-12
                v-toolbar.dark(color="primary")
                    v-toolbar-title {{ $t('form.title.registration') }}
                    v-spacer
                v-card-text
                    v-form
                        user(:user="user" :v="$v" :emails="emails" :phones="phones")

                        v-row
                            v-col(
                                cols="12"
                            )
                                v-text-field(
                                    prepend-icon="lock",
                                    name="password",
                                    :label=" $t('form.label.password') ",
                                    type="password",
                                    v-model="password"
                                    :counter="6"
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()"
                                    :error-messages="passwordErrors"
                                    required
                                )

                                v-text-field(
                                    prepend-icon="lock",
                                    name="confirm_password",
                                    :label=" $t('form.label.confirmPassword') ",
                                    type="password",
                                    v-model="confirm_password"
                                    :counter="6"
                                    @input="$v.confirm_password.$touch()"
                                    @blur="$v.confirm_password.$touch()"
                                    :error-messages="confirmPasswordErrors"
                                    required
                                )

                v-card-actions
                    v-spacer
                    v-btn(
                        color="default",
                        @click.prepend="toLogin"
                    ) {{ $t('buttons.login') }}
                    v-btn(
                        color="primary",
                        @click.prepend="registration"
                    ) {{ $t('buttons.registration') }}
                    v-spacer

</template>

<script>

import { required, minLength } from 'vuelidate/lib/validators'

import User from '../user/User'
import rules from '../user/UserRules'
let validations = rules()
validations.password = { required, minLength: minLength(6)}
validations.confirm_password = { required, minLength: minLength(6)}

export default {
    name: "registration",
    components: {
        User
    },
    data: () => {
        return {
            user: {
                login: "",
                first_name: "",
                last_name: "",
                middle_name: "",
            },
            password: "",
            confirm_password: "",
            emails: [ "" ],
            phones: [ "" ]
        }
    },
    computed: {
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.minLength && errors.push( this.$tc('errors.minLength', 6) )
            !this.$v.password.required && errors.push( this.$t('errors.required') )
            return errors
        },
        confirmPasswordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.confirm_password.minLength && errors.push( this.$tc('errors.minLength', 6) )
            !this.$v.confirm_password.required && errors.push( this.$t('errors.required') )
            this.confirm_password != this.password && errors.push( this.$t('errors.equal') )
            return errors
        },
    },
    validations: validations,
    methods: {
        async registration() {
            this.$v.$touch()
            if( this.$v.$invalid) {
                this.$notify({
                    group: "alerts",
                    title: this.$t('alert.title'),
                    text: this.$t('alert.text'),
                    type: 'error',
                })
                return
            }
            this.user.password = this.password
            this.user.password_repeat = this.confirm_password
            this.user.emails = this.emails
            this.user.phones = this.phones
            let resp = await this.$store.dispatch("registration", this.user )
            if ( resp.status != 200 ) {
                this.$notify({
                    group: "alerts",
                    title: resp.status,
                    text: resp.msg,
                    type: 'error',
                })
                return
            }
            this.$router.push({ path: '/' })
        },
       toLogin() {
           this.$router.push({ path: '/login' })
       }
    }
}
</script>

