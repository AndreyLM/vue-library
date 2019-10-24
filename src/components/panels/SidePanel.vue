<template lang="pug">
  v-navigation-drawer(
      :value="drawer"
      app
      mobile-break-point=640
    )
      v-list
        v-list-item(link to="/users")
          v-list-item-icon
            v-icon supervised_user_circle
          v-list-item-content
            v-list-item-title  Users
</template>

<script>
export default {
    props: [ "initialDrawer" ],
    computed: {
        drawer() {
            return this.initialDrawer
        }
    }
}
</script>