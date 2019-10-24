<template lang="pug">
    v-card
        v-toolbar.dark(color="default")
            v-toolbar-title 
                 v-icon phone
                 | Phones  
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
                v-for="(phone, index) in phones" :key="index"
            )
                v-col(
                    cols=10
                )
                    v-text-field(
                        name="phone[]",
                        label="phone",
                        type="text"
                        v-model="phones[index]"
                        v-mask="mask"
                        :key="index"
                        @input="v.phones.$each[index].$touch()"
                        @blur="v.phones.$each[index].$touch()"
                        :error-messages="v.phones.$each[index].$dirty && !v.phones.$each[index].required ? ['This field is required'] : []"
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
                color="default",
                @click.prepend="add"
            ) Add
            v-btn(
                color="primary",
                @click.prepend="clear"
            ) Clear
                   
                       

</template>

<script>

import { mask } from 'vue-the-mask'

export default {
    name: "Phones",
    directives: {
        mask,
    },
    props: {
        phones: {
            type: Array,
            required: true
        },
        v: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        mask: '+38(###)-###-##-##'
    }),
    computed: {
        errorSummary() {
            return !this.v.phones.required || !this.v.phones.maxLength
        },
        errorSummaryMessage() {
            return !this.v.phones.required ? 'One phone number is required' : !this.v.phones.maxLength ? 'Too many phone numbers': ''
        },
    },
    methods: {
        add() {
            this.phones.push("")
        },
        clear() {
            this.phones.splice(0, this.phones.length)
        },
        remove: function(value) {
            this.phones.splice(value, 1)
        }
    },
}
</script>

