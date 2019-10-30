<template lang="pug">
  v-navigation-drawer(
      :value="drawer"
      app
      mobile-break-point=640
    )
      v-list(
          v-for="item, index in items"
          v-if="$store.getters.accessAny(...item.permissions)"
          :key="index"
      )
        v-subheader {{ item.subheader }}
        
        v-list-item(
          v-for="el, ind in item.items"
          :key="ind"
          link 
          :to="el.link"
        )
          v-list-item-icon
            v-icon {{ el.icon }}
          v-list-item-content
            v-list-item-title  {{ el.title }}

</template>

<script>

import Items from "./items"
import { mapState } from "vuex"

export default {
    props: [ "initialDrawer" ],
    data: () => {
      return {
        items: Items
      }
    },
    computed: {
        ...mapState({
          permissions: state => state.user.permissions
        }),
        drawer() {
            return this.initialDrawer
        }
    }
}
</script>