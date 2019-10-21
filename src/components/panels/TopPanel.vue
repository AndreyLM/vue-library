<template lang="pug">
    v-app-bar(app)
      v-app-bar-nav-icon(@click="drawerClick")
      v-toolbar-title Study App
      v-spacer
      v-toolbar-items
        v-menu(
          offset-y
          open-on-hover
        )
          template(
            v-slot:activator="{ on }"
          )
            v-btn(
              text
              title="Go to profile"
              to="/profile"
              v-on="on"
            ) 
              v-icon account_circle 
              | {{ user.login }}
          v-list
            v-flex(
              xs12
            )
              v-card(
                :key="0"
                class="ma-3 pa-6"
                outlined
                tile
              ) {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
              
              v-flex(
                xs12 offset-xs8
                class="mr-3"
              )
                v-btn(
                  text 
                  to="/logout"
                  @click="logout"
                  class="pa-6"
                )
                  v-icon exit_to_app
                  | Logout
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: [ "initialDrawer" ],
    data() {
        return {
            drawer: this.initialDrawer
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("logout")
            this.$router.push({path: '/login'})
        },
        drawerClick() {
            this.$emit("drawerClick")
        },
    },
    computed: {
        ...mapGetters({ user: "user" }),
    }
}
</script>

