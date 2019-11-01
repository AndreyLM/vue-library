<template lang="pug">
    v-layout.fill-height.align-center.justify-center
        v-flex.sm12.md10
            v-card.elevation-12
                v-toolbar.dark(color="primary")
                    v-toolbar-title {{ $t('form.title.user.profile') }}
                    v-spacer
                v-card-text
                    v-form
                        user(:user="user" :v="$v" :emails="emails" :phones="phones")

                        v-row
                            v-col(
                                cols="12"
                            )
                                span {{ $t('form.label.user') }}:
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


                v-card-actions
                    v-spacer
                    v-btn(
                        color="default",
                        to="/"
                    ) Cancel
                    v-btn(
                        color="primary",
                        @click.prepend="save"
                    ) Save
                    v-spacer

</template>

<script>

import { required, minLength } from 'vuelidate/lib/validators'

import User from '../user/User'

import rules from '../user/UserRules'
let validations = rules()
validations.password = { required, minLength: minLength(6)}

export default {
    name: "profile",
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
    },
    // validations: {},
    validations: validations,
    methods: {
        async save() {
            this.$v.$touch()
            if( this.$v.$invalid) {
                console.log(this.$v)
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

            let resp = await this.$store.dispatch("user_manager/saveProfile", this.user )
            this.$notify({
                group: "alerts",
                title: resp.status,
                text: resp.message,
                type: ( resp.status == 200 ) ? "success" : "error",
            })
            // this.$router.push({ path: '/' })
        },
    },
    async created() {
        var resp = await this.$store.dispatch("user_manager/getProfile")
        if ( resp.status == 200 ) {
            this.user = resp.data.user
            this.emails = resp.data.user.emails || [ "" ]
            this.phones = resp.data.user.phones || [ "" ]
        } else {
            this.$notify({
                group: "alerts",
                title: "status: " + resp.status + " Code: " + ( resp.code || "" ),
                text: resp.message,
                type: 'error',
            })
        }
    }
}
</script>

