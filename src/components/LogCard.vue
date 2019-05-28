
<template>
  <v-layout justify-center>
      <v-card elevation="10" width="900">

        <v-card-title><v-layout justify-center class="headline pt-3">
          {{ActiveUser.First_name}}'s Activity Logs
        </v-layout>
        </v-card-title>
        <v-card-text>
          <v-layout justify-center>
            <v-btn @click="order('a')">Order Ascending</v-btn>
            <v-btn @click="order('d')">Order Descending</v-btn>
          </v-layout>
            <v-container grid-list-md>
              <h3>Log In</h3>

              <v-layout v-for="log in login" :key="log">
                <v-flex>{{log}}</v-flex>
              </v-layout>

              <br><h3>Log Out</h3>

              <v-layout v-for="log in logout" :key="log">
                <v-flex>{{log}}</v-flex>
              </v-layout>

            </v-container>
          </v-card-text>
      </v-card>
  </v-layout>
</template>

<script>

  export default {
    beforeMount(){
      this.$parent.$parent.$parent.ActiveUser = MS.getRefreshedActiveUser(this.ActiveUser.key);
      this.login = this.ActiveUser.Login.split(',').map(d => {return new Date(d).toUTCString();});
      this.logout = this.ActiveUser.Logout.split(',').map(d => {return new Date(d).toUTCString();});
    },
    data() {
      return {
        buttonColor: "#ab302f",
        cardColor: "red darken-4",
        login: [],
        logout: [],
      };
    },
    props: {
      ActiveUser: Object
    },
    methods:{
      order(t){
        this.login = this.login.sort((a,b) => {
          return a - b
        });
        if(t == 'd'){
          this.login.reverse();
          this.logout.reverse();
          this.t = 'd';
        }
      }
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
