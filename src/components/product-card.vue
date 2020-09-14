<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card :elevation="hover ? 24 : 0" class="transition-swing">
        <v-img :src="product._embedded.images[0].url" lazy-src="https://images.prismic.io/theiconic%2F0550afb1-5831-479c-abda-a150f6df419b_iconic_logo.svg?auto=compress,format&rect=0,0,600,600&w=56&h=56">
          <v-btn color="black" flat icon @click="emitAddToCartEvent(product)">+</v-btn>
        </v-img>
      </v-card>
    </v-hover>
    <div class="mt-2">
      <span>{{product.name}}</span><br>
      <span>${{product.price}}</span>
    </div>
  </div>
</template>

<script>
  import bus from '../lib/event-bus'

  export default {
      name: "product-card",
      props: {
          product: Object
      },
      methods: {
          emitAddToCartEvent(product){
            bus.$emit('addToCart', product);
          }
      }
    }
</script>

<style scoped>

</style>
