import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/vehicle",
    name: "Vehicle",
    component: () => import("@/views/Vehicle.vue"),
  },
  {
    path: "/ticket",
    name: "Ticket",
    component: () => import("@/views/Ticket.vue"),
  },
  {
    path: "/route",
    name: "Route",
    component: () => import("@/views/Route.vue"),
  },
  {
    path: "/busstation",
    name: "BusStation",
    component: () => import("@/views/BusStation.vue"),
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
