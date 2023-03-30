import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";

import "./style.css";

Vue.config.productionTip = false;
import http from "./http";

Vue.prototype.$http = http;

// 请求拦截
http.interceptors.request.use(
  function (config) {
    config.headers.Authorization = "Bearer " + localStorage.token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截(通用的错误处理)
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message,
      });
    }

    if (err.response.status === 401) {
      router.push("/login");
    }
  }
);

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "upload";
    },
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ""}`,
      };
    },
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
