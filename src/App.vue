<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" fixed clipped app>

      <v-list dense>
        <v-list-tile class="mt-3" @click="$router.push('/usersettings')">

          <v-list-tile-action>
            <v-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-avatar>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Mitch - Account Settings</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <v-subheader class="mt-3 grey--text text--darken-1">MAIN MENU</v-subheader>

        <v-list-tile v-for="item in items" :key="item.text" @click="$router.push(item.route)">

          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <div v-if="activeUser.isAdmin == true">

        <v-subheader class="mt-3 grey--text text--darken-1">SETTINGS</v-subheader>

        <v-list-tile class="mt-3" @click="$router.push('addMovie')">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Add A Movie</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Manage System</v-list-tile-title>
        </v-list-tile>

        </div>

        <v-list-tile class="mt-3" @click=" () => {$router.push('/'); drawer = false}">

          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              Log Out
            </v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="#48a06a" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="$router.push('/menu')" class="mr-5 align-center">
        <span class="title"><v-icon class="mx-3">local_dining</v-icon>Shani's Grill</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <transition name="slide-in-left" mode="out-in">
              <router-view></router-view>
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    beforeMount(){
    },
    data: () => ({
      isLoggedIn: true,
      drawer: false,
      items: [
        { icon: 'edit', text: 'New Order', route: "/menu" },
        { icon: 'alarm', text: 'Bookings', route:"/history" },
      ],
      activeUser: 'guest',
    }),
    props: {
      source: String,
    },
    methods:{
    }
  }
</script>

<style>

</style>
