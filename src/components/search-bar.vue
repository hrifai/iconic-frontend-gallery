<template>
    <v-card elevation="7" height="17vh" color="#50514F">
      <v-layout row wrap justify-center align-center fill-height>
        <v-flex xs3>
          <v-select color="white" :items="['Male','Female']" label="Sex"></v-select>
        </v-flex>
        <v-flex xs2>
          <v-text-field label="Search..."></v-text-field>
        </v-flex>
      </v-layout>
    </v-card>
</template>

<script>

  export default {
    props: {
      categories: Array
    },
    components: {
    },
    beforeMount() {
    },
    data() {
      return {};
    },
    methods: {
    }
  };
</script>

<style scoped>

</style>
