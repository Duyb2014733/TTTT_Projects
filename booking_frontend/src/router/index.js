import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "DangNhap",
    component: () => import("@/views/DangNhap.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/Home_page.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
