import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "../router";
import io from 'socket.io-client';

Vue.config.productionTip = false;

const socket = io('http://clue.kohavi.net:9998');

Vue.prototype.$socket = socket;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
