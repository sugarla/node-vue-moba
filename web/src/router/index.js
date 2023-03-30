import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/content/Main";
import Home from "../views/home/Home";
import Article from "views/home/childComps/news/Article";
import HeroDetail from "views/home/childComps/hero/HeroDetail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/articles/:id",
        name: "article",
        component: Article,
        props: true,
      },
    ],
  },
  {
    path: "/heroes/:id",
    name: "herodetail",
    component: HeroDetail,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
