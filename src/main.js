import Vue from "vue";
import App from "./App";
import Vuetify from "vuetify";
import router from "./router/index";
import "vuetify/dist/vuetify.min.css";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueRouter);

export default new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
