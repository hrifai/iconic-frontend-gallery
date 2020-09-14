<template>
  <v-app dark>

    <!--@todo filter controls-->
    <!--@todo get images in grid-->
    <!--@todo add cart/buttons-->
    <!--@todo animations-->

    <v-toolbar dense fixed clipped-left app>
      <v-toolbar-title flat class="mr-5 align-center">
        <span class="title">The Iconic</span>
      </v-toolbar-title>
    </v-toolbar>

    <search></search>


    <v-content>
      <v-container fill-height grid>
        <v-layout justify-center align-center row wrap>
          <v-flex xs3 s3 md3 l xl4 v-for="product in products" :key="product.sku">
            <v-container>
              <v-hover v-slot:default="{ hover }">
                <v-card :elevation="hover ? 24 : 0" class="transition-swing">
                  <v-img :src="product._embedded.images[0].url"/>
                </v-card>
              </v-hover>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn color="black" dark large fixed bottom right fab>
        <v-icon color="white">mdi-cart</v-icon>
      </v-btn>
    </v-content>

  </v-app>
</template>

<script>

  import model from './lib/model'
  import search from './components/search-bar'

  export default {
    components: {
      search
    },
    async beforeMount(){
      this.products = await this.getProducts();
    },
    data: () => ({
      products: [],
      current_page: 1,
      page_size: 16,
    }),
    props: {
      source: String,
    },
    methods:{
      async getProducts(){
        return await model.getProducts({
          gender:'male',
          page: this.current_page,
          page_size:this.page_size,
          sort:'popularity'
        });
      }
    }
  }
</script>

<style>

</style>
