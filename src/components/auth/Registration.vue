<template lang="pug">
    v-layout.fill-height.align-center.justify-center
        v-flex.sm12.md10
            v-card.elevation-12
                v-toolbar.dark(color="primary")
                    v-toolbar-title Registration
                    v-spacer
                v-card-text
                    v-form
                        v-row
                            v-col(
                                cols="12"
                                md="7"
                            )
                                user-info(
                                    :userInfo="user" 
                                    :v="$v" 
                                    :loginErrors="uLoginErrors" 
                                    :firstNameErrors="uFirstNameErrors"
                                    :middleNameErrors="uMiddleNameErrors"
                                    :lastNameErrors="uLastNameErrors"
                                )

                                v-text-field(
                                    prepend-icon="lock",
                                    name="password",
                                    label="Password",
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
                                    label="Confirm Password",
                                    type="password",
                                    v-model="confirm_password"
                                    :counter="6"
                                    @input="$v.confirm_password.$touch()"
                                    @blur="$v.confirm_password.$touch()"
                                    :error-messages="confirmPasswordErrors"
                                    required
                                )

                            v-col(
                                cols="12"
                                md="5"
                            )
                                emails(:emails="emails")
                                br
                                phones(:phones="phones")
               
                v-card-actions
                    v-spacer
                    v-btn(
                        color="default",
                        @click.prepend="toLogin"
                    ) Login
                    v-btn(
                        color="primary",
                        @click.prepend="registration"
                    ) registration
                    v-spacer

</template>

<script>

import Emails from './Emails'
import Phones from './Phones'
import UserInfo from './UserInfo'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    name: "login",
    components: {
        Emails,
        Phones,
        UserInfo
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
            !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
            !this.$v.password.required && errors.push('Password is required.')
            return errors
        },
        confirmPasswordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.confirm_password.minLength && errors.push('Confirm password must be at least 6 characters long')
            !this.$v.confirm_password.required && errors.push('Confirm password is required.')
            this.confirm_password != this.password && errors.push('Confirm password not equal the password')
            return errors
        },
        uLoginErrors() {
            const errors = []
            if (!this.$v.user.login.$dirty) return errors
            !this.$v.user.login.minLength && errors.push('Login must be at least 6 characters long')
            !this.$v.user.login.required && errors.push('Login is required.')
            return errors
        },
        uFirstNameErrors() {
            const errors = []
            if (!this.$v.user.first_name.$dirty) return errors
            !this.$v.user.first_name.minLength && errors.push('First Name must be at least 6 characters long')
            !this.$v.user.first_name.required && errors.push('First Name is required.')
            return errors
        },
        uMiddleNameErrors() {
            const errors = []
            if (!this.$v.user.middle_name.$dirty) return errors
            !this.$v.user.middle_name.minLength && errors.push('Middle Name must be at least 6 characters long')
            !this.$v.user.middle_name.required && errors.push('Middle Name is required.')
            return errors
        },
        uLastNameErrors() {
            const errors = []
            if (!this.$v.user.last_name.$dirty) return errors
            !this.$v.user.last_name.minLength && errors.push('Last Name must be at least 6 characters long')
            !this.$v.user.last_name.required && errors.push('Last Name is required.')
            return errors
        },
    },
    validations: {
        password: { required, minLength: minLength(6)},
        confirm_password: { required, minLength: minLength(6)},
        user: {
                login: { required, minLength: minLength(6) },
                first_name: { required, minLength: minLength(6) },
                last_name: { required, minLength: minLength(6) },
                middle_name: { required, minLength: minLength(6) },
            },
    },
    methods: {
        async registration() {
            this.$v.$touch()
            if( this.$v.$invalid) {
                this.$notify({
                    group: "alerts",
                    title: "Wrong data",
                    text: "Please enter valid data",
                    type: 'error',
                })
                return
            }
            let resp = await this.$store.dispatch("registration", {
                first_name: this.user.first_name,
                middle_name: this.user.middle_name,
                last_name: this.user.last_name,
                login: this.user.login,

                emails: this.emails,
                phones: this.phones,

                password: this.password,
                password_repeat: this.confirm_password,
            })
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

