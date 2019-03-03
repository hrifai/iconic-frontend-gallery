<template>
  <v-app dark>
  <div id="app">
    <div id="main">
      <transition v-if="" name="slide-in-left" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <!--<pagefooter></pagefooter>-->

  </div>
  </v-app>
</template>

<script>

  import dataInput from './components/FormCard'
  import home from './components/HomeCard'
  import pagefooter from './components/Footer'

export default {
  name: "App",
  components: {
    dataInput,
    home,
    pagefooter
  },
  data() {
    return {
    };
  },
  methods: {

  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url(/static/background2.png);
}

.v-stepper__header{
  flex-wrap: nowrap;
  overflow: auto;
}

.v-dialog {
  overflow-y: visible !important;
}

#main {
  margin-top: 5%;
  margin-bottom: 10%;
}


#main {
  margin-top: 10%;
  position: relative;
}


@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-left-enter-active {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-out-left-leave-active {
  -webkit-animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

</style>
