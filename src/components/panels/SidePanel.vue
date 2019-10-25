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

        v-list-item(link to="/rbac")
          v-list-item-icon
            v-icon security
          v-list-item-content
            v-list-item-title  RBAC

      v-list
        v-subheader Articles
        v-list-item(link to="/articles")
          v-list-item-icon
            v-icon library_books
          v-list-item-content
            v-list-item-title Articles
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