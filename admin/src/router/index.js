import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";

import CategoryEdit from "../views/category/CategoryEdit";
import CategoryList from "../views/category/CategoryList";

import ItemEdit from "../views/item/ItemEdit";
import ItemList from "../views/item/ItemList";

import HeroEdit from "../views/hero/HeroEdit";
import HeroList from "../views/hero/HeroList";

import ArticleEdit from "../views/article/ArticleEdit";
import ArticleList from "../views/article/ArticleList";

import AdEdit from "../views/ad/AdEdit";
import AdList from "../views/ad/AdList";

import AdminUserEdit from "../views/admin/AdminUserEdit";
import AdminUserList from "../views/admin/AdminUserList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { isPublic: true }, //可以公开访问
  },
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      // 分类路由
      {
        path: "/categories/create",
        component: CategoryEdit,
      },
      {
        path: "/categories/list",
        component: CategoryList,
      },
      {
        path: "/categories/edit/:id",
        component: CategoryEdit,
        props: true, //相当于this.$route.params.id
      },

      // 物品路由
      {
        path: "/items/create",
        component: ItemEdit,
      },
      {
        path: "/items/list",
        component: ItemList,
      },
      {
        path: "/items/edit/:id",
        component: ItemEdit,
        props: true,
      },
      // 英雄路由
      {
        path: "/heroes/create",
        component: HeroEdit,
      },
      {
        path: "/heroes/list",
        component: HeroList,
      },
      {
        path: "/heroes/edit/:id",
        component: HeroEdit,
        props: true,
      },
      // 文章路由
      {
        path: "/articles/create",
        component: ArticleEdit,
      },
      {
        path: "/articles/list",
        component: ArticleList,
      },
      {
        path: "/articles/edit/:id",
        component: ArticleEdit,
        props: true,
      },
      // 广告位路由
      {
        path: "/ads/create",
        component: AdEdit,
      },
      {
        path: "/ads/list",
        component: AdList,
      },
      {
        path: "/ads/edit/:id",
        component: AdEdit,
        props: true,
      },
      // 管理员路由
      {
        path: "/admin_users/create",
        component: AdminUserEdit,
      },
      {
        path: "/admin_users/list",
        component: AdminUserList,
      },
      {
        path: "/admin_users/edit/:id",
        component: AdminUserEdit,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  // 登录页的isPublic已经是true了会走next
  next();
});

export default router;
