import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'w3-css/w3.css';


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration: 1700,
  delay: 600,
});
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


const options = {
  // You can set your default options here
};


Vue.use(Toast, options);

Vue.config.productionTip = false

Vue.filter('capitalize', function(value) {
  if (!value) {
    return '';
  }

  value = value.toString();

  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

