<template>
  <v-layout justify-center>
    <div class="header">
      <img src="/static/ps-logo-mark.png" alt="logo" />
    </div>
      <v-flex xs6>
        <v-card>
          <div style="padding-top:20px;padding-bottom:20px; text-align: center">
            <h1>Please Input Your XLR8 Team Anatomy Of Work</h1>
        </div>
          <div id="form"><REG/></div>
      </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import REG from "./regSub";

export default {
  components: {
    REG
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
#form {
  margin-right: 10%;
  margin-left: 10%;
  text-align: center;
  padding-bottom:50px;
}
.header {
  background-color: rgba(74, 17, 57, 0.79);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
