<template lang="pug">
  fragment
    top-panel(
      :initial-drawer="drawer"
      @drawerClick="changeDrawer"
    )

    side-panel(
      :initial-drawer="drawer"
    )  
        
    v-content
      v-container.fluid
        notifications(width="50%" position='top center' group="alerts")
        router-view
        
</template>

<script>

import { mapState } from "vuex"
import TopPanel from '@/components/panels/TopPanel'
import SidePanel from '@/components/panels/SidePanel'

export default {
  name: 'App',
  data() {
    return {
      drawer: false
    }
  },
  components: {
    TopPanel,
    SidePanel
  },
  computed: {
    ...mapState({
      user: "user",
    })
  },
  methods: {
    changeDrawer() {
      this.drawer = !this.drawer
    }
  },
  created() {
    let vm = this
    this.$store.subscribe((mutation) => {
      if( mutation.type === "SetAuthenticated") {
        !mutation.payload && vm.$router.push("/login")
      }
    });
  }
}
</script>
