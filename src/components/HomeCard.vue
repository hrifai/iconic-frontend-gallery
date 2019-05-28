<template>
  <v-layout>
    <v-container>
      {{ActiveUser}}
      <v-layout justify-center align-center class="headline">Welcome Back {{ActiveUser.First_name}}!</v-layout>
      <v-layout justify-center align-center row class="subheading mt-4">
          <!--<div style="padding-right:25px;">Last Purchased: {{ActiveUser.Currently_Rented[ActiveUser.Currently_Rented.length-1].Name}}</div>-->
      </v-layout>
      <!--<div class="headline">Currently Rented</div>-->


        <!--<v-layout>-->
          <!--<v-layout xs2 v-for="movie in ActiveUser.Currently_Rented" :key="movie.Id">-->
            <!--<v-container>-->
              <!--<movie-tile :movie="movie"></movie-tile>-->
            <!--</v-container>-->
          <!--</v-layout>-->
        <!--</v-layout>-->


      </v-container>
  </v-layout>
</template>

<script>

import MovieTile from './FoodTile'
import MS from '../firebaseCRUD'

export default {
  components: {
    MovieTile
  },
  props: {
    ActiveUser: Object
  },
  methods:{
  },
  data() {
    return {
      buttonColor: "#ab302f",
      cardColor: "#404040",
    };
  },
};
</script>

<style scoped>
#form {
  margin-right: 5%;
  margin-left: 5%;
  padding-top:10px;
  padding-bottom:30px;
  text-align: left;
}

.v-btn--large{
  padding: 10px !important;
}

.header {
  background-color: rgba(185, 134, 12, 0.79);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
