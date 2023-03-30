import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/scss/style.scss";
import "@/assets/iconfont/iconfont.css";

import http from "./http";

Vue.prototype.$http = http;
Vue.config.productionTip = false;

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import Card from "@/components/common/Card.vue";
Vue.component("m-card", Card);

import ListCard from "@/components/common/ListCard.vue";
Vue.component("list-card", ListCard);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
