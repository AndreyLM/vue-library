<template lang="pug">
    v-card
        v-toolbar.dark(color="default")
            v-toolbar-title 
                 v-icon email
                 | Emails  
            v-spacer
        v-card-text
            v-row.wrap.align-center(
                 v-if="errorSummary"
            )  
                v-col(
                    cols=12
                )
                    v-alert(
                        type="error"
                    ) {{ errorSummaryMessage }}
            v-row.wrap.align-center(
                v-for="(email, index) in emails" :key="index"
            )   
               
                v-col(
                    cols=10
                )
                    v-text-field(
                        name="email[]",
                        label="email",
                        type="text"
                        v-model="emails[index]"
                        :key="index"
                        @input="v.emails.$each[index].$touch()"
                        @blur="v.emails.$each[index].$touch()"
                    )
                v-col(
                    cols=2
                ) 
                    a.text-center.justify-center(
                        @click.prevent="remove(index)"
                    ) X
        v-card-actions
            v-spacer
            v-btn(
                v-if="v.emails.maxLength"
                color="default",
                @click.prepend="add"
            ) Add
            v-btn(
                color="primary",
                @click.prepend="clear"
            ) Clear
                   
                       

</template>

<script>
export default {
    name: "emails",
    props: {
        emails: {
            type: Array,
            required: true
        },
        v: {
            type: Object,
            required: true
        },
    },
    computed: {
        errorSummary() {
            return !this.v.emails.required || !this.v.emails.maxLength
        },
        errorSummaryMessage() {
            return !this.v.emails.required ? 'One email is required' : !this.v.emails.maxLength ? 'Too many emails': ''
        },
    },
    methods: {
        add() {
            this.emails.push("")
        },
        clear() {
            this.emails.splice(0, this.emails.length)
        },
        remove: function(value) {
            this.emails.splice(value, 1)
        }
    },
}
</script>

