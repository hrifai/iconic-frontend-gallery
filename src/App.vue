<template>
  <v-app dark>

    <!--@todo filter controls-->
    <!--@todo get images in grid-->
    <!--@todo add cart/buttons-->
    <!--@todo animations-->

    <v-toolbar dense fixed clipped-left app>
      <v-toolbar-title flat class="mr-5 align-center">
        <span class="headline">THE ICONIC</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content fill-height>
      <v-container grid>
        <search></search>
        <v-layout justify-center align-center row wrap>
          <v-flex xs6 sm4 md3 lg3 xl2 v-for="product in products" :key="product.sku">
            <v-container>
              <product-card :product="product"></product-card>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-layout justify-center align-center row class="pb-5">
      <v-btn :disabled="current_query.page === 1" @click="handlePageChange(-1)">Back</v-btn>
      <h5 class="pl-3 pr-3">{{current_query.page}}</h5>
      <v-btn @click="handlePageChange(1)">Next</v-btn>
    </v-layout>

    <v-btn color="black" dark large fixed bottom right fab>
      Checkout
    </v-btn>

    <v-snackbar v-model="notification" color="success" :timeout="4500" top>
      {{notification_text}}
    </v-snackbar>

  </v-app>
</template>

<script>

  import model from './lib/model'
  import search from './components/search-bar'
  import ProductCard from "./components/product-card";
  import bus from './lib/event-bus'

  export default {
    components: {
      ProductCard,
      search,
    },
    async beforeMount(){
      this.loading = true;

      bus.$on('search', this.handleSearch);
      bus.$on('addToCart', this.handleNotification);

      this.products = await model.getProducts();
      this.loading = false;
    },
    data: () => ({
      products: [],
      notification: false,
      notification_text: '',
      current_query: {
        sort: '',
        gender: '',
        q: '',
        page: 1,
        page_size: 20,
      },
      loading: false,
    }),
    props: {
      source: String,
    },
    methods:{
      async handlePageChange(change){
        if(this.current_query.page === 0 && change < 0) return;
        this.current_query.page += change;
        this.products = await model.getProducts(this.current_query);
      },
      async handleSearch(options){
        this.current_query.page = options.page = 1;
        options.page_size = this.current_query.page_size;
        this.current_query = options;
          this.products = await await model.getProducts(this.current_query);
      },
      handleNotification(product){
        this.notification_text = `${product.name} has been added to cart!`;
        this.notification = true;
      }
    }
  }
</script>

<style>

</style>
