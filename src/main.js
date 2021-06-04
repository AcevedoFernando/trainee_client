import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// Dependences
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import VueFinalModal from 'vue-final-modal'
import Axios from "axios"
import VueSimpleAlert from "vue-simple-alert";
import VueTheMask from 'vue-the-mask'
import VueFlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

Vue.use(VueSimpleAlert);
Vue.use(VueFinalModal())
Vue.component('flat-pickr', VueFlatPickr);
Vue.use(VueTheMask)

// Axios config
Vue.prototype.$axios = Axios
Vue.prototype.$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$axios.defaults.baseURL = `${process.env.VUE_APP_ROOT_API}${process.env.VUE_APP_PREFIX}`

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
