<template>
  <div>

    <v-layout justify-center class="headline">Ordering System</v-layout>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs3 v-for="table in 4" :key="table">
          <v-container>
            <v-btn @click="() => {selectedTable=table; newOrder=true}" large color="#48a06a" fab>{{table}}</v-btn>
          </v-container>
        </v-flex>
        <v-flex xs3 v-for="table in 4" :key="table+4">
          <v-container>
            <v-btn @click="() => {selectedTable=table+4; newOrder=true}" large color="#48a06a">{{table + 4}}</v-btn>
          </v-container>
        </v-flex>
        <v-flex xs3 v-for="table in 4" :key="table+8">
          <v-container>
            <v-btn @click="() => {selectedTable=table+8; newOrder=true}" large color="#48a06a" fab>{{table + 8}}</v-btn>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>

      <v-dialog width="300" v-model="loading">
        <v-card color="#48a06a" dark>
          <v-card-text>
            Loading Table...
          </v-card-text>
        </v-card>
      </v-dialog>

      <!--<v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="newOrder">-->
        <!--<v-card dark>-->
          <!--<v-btn fab color="#48a06a" @click="newOrder=false"><v-icon>close</v-icon></v-btn>-->
          <!--<v-layout v-for="section in foods.Categories" :key="section">-->
            <!--<v-container grid-list-md>-->
              <!--<h2 class="headline pl-4">{{section}}</h2>-->
            <!--<v-layout row wrap>-->
              <!--<v-flex xs4 v-for="food in foods[section]" :key="food.id">-->
                <!--<v-container>-->
                  <!--<food-tile :food="food"></food-tile>-->
                  <!--</v-container>-->
              <!--</v-flex>-->
          <!--</v-layout>-->
          <!--</v-container>-->
          <!--</v-layout>-->
        <!--</v-card>-->
      <!--</v-dialog>-->

    <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="newOrder">
      <v-card dark>
        <v-btn flat fab color="white" @click="newOrder=false"><v-icon>close</v-icon></v-btn>
        <span class="headline">Table Number: {{selectedTable}}</span>
        <v-tabs color="green" dark slider-color="green">
          <v-tab v-for="section in foods.Categories" :key="section" ripple>
            {{ section }}
          </v-tab>
          <v-tab-item v-for="section in foods.Categories" :key="section">

            <v-container grid-list-md>
              <v-layout v-for="item in foods[section]" :key="item.id">
                <v-flex xs4>
                  {{ item.name }}<v-btn @click="showItem(item)" fab flat color="green"><v-icon>add</v-icon></v-btn>${{item.price}}
                  <v-divider></v-divider>
                </v-flex>
              </v-layout>
            </v-container>

          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="showOrder" auto-height :vertical="true" :timeout="0" :bottom="true" :right="true" color="green darken-4">
      <v-layout justify-center align-center fill-height class="headline mb-3">Items in Order</v-layout>
      <v-layout v-for="item in order">
        {{item.name}} ${{ item.price }}
        <small v-if="item.notes">* see notes</small>
      </v-layout>
      <v-divider class="subheading mt-3 mb-3"></v-divider>
      Order Total: ${{orderTotal}}
      <v-btn flat class="white--text" @click="confirmed = true;showOrder=false">Make Order</v-btn>
    </v-snackbar>

    <v-dialog v-model="addItemDia">
      <v-card dark>
        <v-btn flat fab color="white" @click="addItemDia=false"><v-icon>close</v-icon></v-btn>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 class="headline pb-4">
                {{current.name}}
            </v-flex>
            <v-flex xs8>
              Dietary Notes:<v-textarea color="green" v-model="current.notes"></v-textarea>
            </v-flex>
            <v-flex xs4>
              Add to Order<v-btn @click="orderItem()" flat large color="green"><v-icon>add</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog width=200 color="green" v-model="confirmed">
        <v-btn flat fab color="white" @click="addItemDia=false"><v-icon>close</v-icon></v-btn>
        <v-layout justify-center class="headline">Order successfully submitted</v-layout>
    </v-dialog>


  </div>
</template>

<script>
  import FoodTile from "./FoodTile";
  import SG from '../firebaseUtils'

  export default {
    components: {
      FoodTile,
    },
    beforeMount() {
      SG.db.ref('Menu').on('value', (snap) => {
        this.foods = snap.val();
        setTimeout(() => {this.loading = false}, 1000)
      });
    },
    data() {
      return {
        foods: [],
        order: [],
        current: {},
        confirmed: false,
        showOrder: false,
        selectedTable: null,
        subColor: "#48a06a",
        loading: true,
        newOrder: false,
        addItemDia: false,
        orderTotal: 0
      };
    },
    methods: {
      showItem(item){
        this.addItemDia = true;
        this.current = item;
      },
      orderItem(){
        this.order.push(this.current);
        this.addItemDia = false;
        this.orderTotal = this.order.reduce((s,a) => {
          console.log(s,a)
          return parseInt(s) + parseInt(a.price);
        }, 0);
        this.showOrder = true;
      }
    }
  };
</script>

<style scoped>

  a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
  }

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
