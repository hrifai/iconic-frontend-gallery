<template>
  <v-layout justify-center fill height>

      <v-card width="300">
          <v-card-title><v-layout justify-center class="headline mt-3">Employee POS Login</v-layout></v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="code" :color="buttonColor" label="Employee Code" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs4 v-for="index in 9">
              <v-btn fab @click="update(index)" :color="buttonColor">{{index}}</v-btn>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
           <v-flex xs4>
             <v-btn fab @click="update(0)" :color="buttonColor">0</v-btn>
           </v-flex>
          </v-layout>
        </v-container>

            <v-spacer></v-spacer>
            <v-btn :color="buttonColor" absolute bottom right fab @click="handleLogin()"><v-icon>done</v-icon></v-btn>

      </v-card>

    <v-dialog width="300" v-model="loadingDialog">
      <v-card :color="buttonColor" dark>
        <v-card-text>
            {{dialogText}}
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>

  export default {
    beforeMount(){
    },
    data() {
      return {
        buttonColor: "#48a06a",
        cardColor: "#404040",
        code: "",
        people: null,
        loadingDialog: false,
        dialogText: "One moment please..."
      };
    },
    methods: {
      handleLogin(){
        if(this.code === '1234'){
          this.$router.push('/menu')
        } else {
          this.dialogText = "Wrong code";
          this.loadingDialog = true;
          this.code = "";
        }
      },
      update(i){
        this.code+=i;
      }
    }
  };
</script>

<style scoped>

  a {
    color: #48a06a;
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
