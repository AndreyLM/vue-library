<template lang="pug">
    fragment
        v-row
            v-col(
                cols="12"
            )
                user-info(
                    :userInfo="user" 
                    :v="v" 
                )

        v-row
            v-col(
                cols="6"
            )
                emails(:emails="emails" :v="v")

            v-col(
                cols="6"
            )
                phones(:phones="phones" :v="v")

</template>

<script>

import Emails from './Emails'
import Phones from './Phones'
import UserInfo from './UserInfo'

export default {
    name: "login",
    components: {
        Emails,
        Phones,
        UserInfo
    },
    props: {
        v: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            default: function() {
                return {
                    login: "",
                    first_name: "",
                    last_name: "",
                    middle_name: "",
                }
            }
        },
        emails: {
            type: Array,
            default: function() {
                return []
            }
        }, 
        phones: {
            type: Array,
            default: function() {
                return []
            }
        },
    },
}

</script>

