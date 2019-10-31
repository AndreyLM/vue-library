<template lang="pug">
    v-app-bar(app)
      v-app-bar-nav-icon(@click="drawerClick")
      v-toolbar-title {{ $t('siteName') }}
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

            v-btn(
              text
              v-for="ln in languages"
              :key="ln.flag"
              @click="changeLocate(ln.language)"
            ) 
              flag(
                @click="changeLocate(ln.language)"
                v-bind:squared=false
                :iso="ln.flag"
              ) {{ ln.title }}
            
          
          
          v-flex(
              xs12
            )
            
              v-card 
                v-card-text {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
                v-card-actions
                  v-btn(
                    text 
                    to="/profile"
                    class="pa-6"
                  )
                    v-icon folder_shared
                    | {{ $t('profile') }} 
                  v-btn(
                    text 
                    to="/logout"
                    @click="logout"
                    class="pa-6"
                  )
                    v-icon exit_to_app
                    | {{ $t('logout') }} 
                 
</template>

<script>
import { mapState } from 'vuex';

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
            // this.$router.push({path: '/login'})
        },
        drawerClick() {
            this.$emit("drawerClick")
        },
        changeLocate(locale) {
          this.$store.commit("SetLocale", locale)
        }
    },
    computed: {
      ...mapState({ 
        user: "user",
        languages: "languages",
      }),
    }
}
</script>

