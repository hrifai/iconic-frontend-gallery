<template>
  <v-app dark>

    <v-toolbar dense fixed clipped-left app>
      <v-toolbar-title flat class="mr-5 align-center">
        <span class="headline">THE ICONIC</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content fill-height>
        <search></search>
        <v-layout justify-center align-center row wrap>
          <v-flex xs6 sm4 md3 lg3 xl2 v-for="product in products" :key="product.sku">
            <v-container>
              <product-card :product="product"></product-card>
              <div class="mt-2">
                <span>{{product.name}}</span><br>
                <span>${{product.final_price}}</span><br>
                <div v-if="product.messaging && product.messaging.marketing.length > 0">
                  <small :style="'color:'+ product.messaging.marketing[0].color">{{product.messaging.marketing[0].medium}}</small>
                </div>
              </div>
            </v-container>
          </v-flex>
        </v-layout>
    </v-content>

    <v-layout justify-center align-center row class="pb-5">
      <v-btn :disabled="current_query.page === 1" @click="handlePageChange(-1)">Back</v-btn>
      <h5 class="pl-3 pr-3">{{current_query.page}}</h5>
      <v-btn @click="handlePageChange(1)">Next</v-btn>
    </v-layout>

    <v-btn color="black" dark large fixed bottom right fab>
      ${{product_total}}
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
      product_total: 0,
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
        this.product_total = Math.round(this.product_total + product.final_price);
        this.notification_text = `${product.name} has been added to cart!`;
        this.notification = true;
      }
    }
  }
</script>

<style>

</style>
