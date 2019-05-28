<template>
  <v-app>

    <v-container grid-list-md>
      <v-layout  justify-center class="headline font-weight-bold mb-3">Todays Bookings</v-layout>
      <v-layout wrap >
        <v-flex xs6 v-for="booking in bookings" :key="booking.key">
          <v-card dark>
            <v-container grid-list-md>
              <h2>Booking Info</h2>
              <v-layout wrap>
                <v-flex xs6>
                  <v-text-field disabled v-model="booking.name" :color="buttonColor" label="Name" required></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field disabled  v-model="booking.time" :color="buttonColor" label="Price" required></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field disabled v-model="booking.ppl" :color="buttonColor" label="No People" required></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field disabled v-model="booking.tbl" :color="buttonColor" label="Table Number" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea disabled v-model="booking.notes" :color="buttonColor" label="Notes" required></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog width="300" v-model="loading">
      <v-card color="green darken-3" dark>
        <v-card-text>
          Loading Bookings...
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>

  import SG from '../firebaseUtils'

  export default {
    beforeMount(){
      this.loading = true;
      SG.db.ref('Bookings').on('value',(snap)=>{
        this.bookings = snap.val();
        this.loading = false;
      })
    },
    components: {
    },
    props: {
      ActiveUser: Object
    },
    data() {
      return {
        subColor: "#ab302f",
        bookings: [],
        loading: false,
        buttonColor: "green"
      };
    },
    methods: {
    }
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
