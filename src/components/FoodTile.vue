<template>
      <v-card color="green darken-4">
        <v-layout justify-center align-center>
          <v-img :src="food.src" height="250">
            <div style="margin-top:50%;background-color: green;text-align: center;">
              <h3 class="headline pt-4">{{food.name}} - ${{food.price}}</h3><br>
            </div>
          </v-img>
        </v-layout>
  </v-card>
</template>

<script>
    export default {
        name: "MovieTile",
        data() {
          return {
            color: "dark"
          }
        },
        props:{
          food: Object,
        },
      methods:{
      }
    }

</script>

<style scoped>

</style>
