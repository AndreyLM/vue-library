<template lang="pug">
    v-card
        v-toolbar.dark(color="default")
            v-toolbar-title
                 v-icon person
                 | {{ $t('form.title.user.info') }}
            v-spacer
        v-card-text
            v-text-field(
                name="login",
                :label=" $t('form.label.login') ",
                type="text"
                v-model="userInfo.login"
                @input="v.user.login.$touch()"
                @blur="v.user.login.$touch()"
                :error-messages="loginErrors"
            )
            v-text-field(
                name="first_name",
                :label=" $t('form.label.firstName') ",
                type="text"
                v-model="userInfo.first_name"
                @input="v.user.first_name.$touch()"
                @blur="v.user.first_name.$touch()"
                :error-messages="firstNameErrors"
            )
            v-text-field(
                name="middle_name",
                :label=" $t('form.label.middleName') ",
                type="text"
                v-model="userInfo.middle_name"
                @input="v.user.middle_name.$touch()"
                @blur="v.user.middle_name.$touch()"
                :error-messages="middleNameErrors"
            )
            v-text-field(
                name="last_name",
                :label=" $t('form.label.lastName') ",
                type="text"
                v-model="userInfo.last_name"
                @input="v.user.last_name.$touch()"
                @blur="v.user.last_name.$touch()"
                :error-messages="lastNameErrors"
            )

</template>

<script>

export default {
    name: "UserInfo",
    props: {
        userInfo: {
            type: Object,
            required: true
        },
        v: {
            type: Object,
            required: true
        },
    },
    computed: {
        loginErrors() {
            const errors = []
            if (!this.v.user.login.$dirty) return errors
            !this.v.user.login.minLength && errors.push( this.$tc('errors.minLength', 4) )
            !this.v.user.login.required && errors.push( this.$t('errors.required') )
            return errors
        },
        firstNameErrors() {
            const errors = []
            if (!this.v.user.first_name.$dirty) return errors
            !this.v.user.first_name.minLength && errors.push( this.$tc('errors.minLength', 4) )
            !this.v.user.first_name.required && errors.push( this.$t('errors.required') )
            return errors
        },
        middleNameErrors() {
            const errors = []
            if (!this.v.user.middle_name.$dirty) return errors
            !this.v.user.middle_name.minLength && errors.push( this.$tc('errors.minLength', 4) )
            !this.v.user.middle_name.required && errors.push( this.$t('errors.required') )
            return errors
        },
        lastNameErrors() {
            const errors = []
            if (!this.v.user.last_name.$dirty) return errors
            !this.v.user.last_name.minLength && errors.push( this.$tc('errors.minLength', 4) )
            !this.v.user.last_name.required && errors.push( this.$t('errors.required') )
            return errors
        },
    },
}
</script>

