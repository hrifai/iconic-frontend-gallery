<template>
  <v-layout class="pt-2" row wrap justify-center align-center style="background-color:#50514F">
    <v-flex class="pr-3 pl-3">
      <v-select color="white" :items="['Male','Female']" v-model="gender" label="Gender"></v-select>
    </v-flex>
    <v-flex class="pr-3">
      <v-select color="white" :items="sorts" v-model="sortSelection" label="Sort By"></v-select>
    </v-flex>
    <v-flex>
      <v-text-field v-model="q" color="white" label="Search..."></v-text-field>
    </v-flex>
    <v-flex>
      <v-btn flat @click="emitSearchEvent">Search</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>

  import bus from '../lib/event-bus'

  export default {
    props: {
      categories: Array
    },
    data() {
      return {
        q: '',
        gender: '',
        sorts: [
          {text: 'Popularity',value:'popularity'},
          {text: 'New Arrivals',value:'new'},
          {text: 'Price High to Low',value:'price_high'},
          {text: 'Price Low to High',value:'price_low'}
          ],
        sortSelection: ''
      }
    },
    methods: {
      emitSearchEvent(){
        bus.$emit('search', {
            gender: this.gender,
            sort: this.sortSelection,
            q: this.q
          })
      }
    }
  };
</script>

<style scoped>

</style>
