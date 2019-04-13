<template>
  <v-app dark>

    <v-toolbar>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Controll panel</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">

          <v-btn flat>Login</v-btn>
          <v-btn flat>Exit</v-btn>
           <v-btn flat>Config</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>


<script>
export default {
  name: 'Reveal',
  data: () => ({

    menuVisible: false
  }),
   methods: {
   exit(){
    this.$store.commit("add_active",false)
    this.$router.push('/login')
   }
   }
}
</script>
