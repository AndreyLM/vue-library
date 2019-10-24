<template lang="pug">
  v-navigation-drawer(
      :value="drawer"
      app
      mobile-break-point=640
    )
      v-list
        v-subheader Users
        v-list-item(link to="/users")
          v-list-item-icon
            v-icon supervised_user_circle
          v-list-item-content
            v-list-item-title  Users

      v-list
        v-subheader Descriptions
        v-list-item(link to="/descriptions")
          v-list-item-icon
            v-icon list
          v-list-item-content
            v-list-item-title Descriptions
        v-list-item(link to="/upload")
          v-list-item-icon
            v-icon mdi-paperclip
          v-list-item-content
            v-list-item-title Upload

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