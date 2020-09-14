import Vue from "vue";
import App from "./App";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;
Vue.use(Vuetify);

export default new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
