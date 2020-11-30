// import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../pages/layout.vue"),
    children: [{
      path: "/user",
      name: "User",
      component: () => import("../pages/users/list.vue"),
    },{
      path: "/role",
      name: "Role",
      component: () => import("../pages/roles/list.vue"),
    },{
      path: "/product",
      name: "Product",
      component: () => import("../pages/products/list.vue"),
    }]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/login.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
localStorage.setItem('token', '123');
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('token') ? true : false;
  console.log(to, from, next)
  if (to.path === '/login') {
    next();
  } else {
    // 是否在登录状态下
    isLogin ? next() : next('/login');
  }
})

export default router;