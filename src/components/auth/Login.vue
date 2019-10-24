<template lang="pug">
    v-layout.fill-height.align-center.justify-center
        v-flex.sm12.sm8.md4
            v-card.elevation-12
                v-toolbar.dark(color="primary")
                    v-toolbar-title Login Form
                    v-spacer
                v-card-text
                    v-form
                        v-text-field(
                            prepend-icon="person",
                            name="login",
                            label="Login or email",
                            type="text"
                            v-model="user"
                            @input="$v.user.$touch()"
                            @blur="$v.user.$touch()"
                            :error-messages="userErrors"
                        )
                        v-text-field(
                            prepend-icon="lock",
                            name="password",
                            label="Password",
                            type="password",
                            v-model="password"
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                            :error-messages="$v.password.$dirty && !$v.password.required ? [ 'The field is required' ] : !$v.password.minLength ? ['Min length must be 5 symbols'] : []"
                        )
                v-card-actions
                    v-spacer
                    v-btn(
                        color="default",
                        @click.prepend="registration"
                    ) registration
                    v-btn(
                        color="primary",
                        @click.prepend="login"
                    ) Login
                   
                       

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
            !this.$v.user.required && errors.push("The field is required")
            !this.$v.user.minLength && errors.push("Min length must be 4 symbols") 
            return errors   
        },
        passwordErrors() {
            var errors = []
            if(!this.$v.password.$dirty) {
                return errors
            }
            !this.$v.password.required && errors.push("The field is required")
            !this.$v.password.minLength && errors.push("Min length must be 6 symbols") 
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

