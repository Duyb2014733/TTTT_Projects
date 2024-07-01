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
    path: "/logout",
    name: "Logout",
    component: () => import("@/views/Logout.vue"),
  },
  {
    path: "/ve",
    name: "Ve",
    component: () => import("@/views/Ve.vue"),
  },
  {
    path: "/tuyenduong",
    name: "TuyenDuong",
    component: () => import("@/views/TuyenDuong.vue"),
  },
  {
    path: "/nhaxe",
    name: "NhaXe",
    component: () => import("@/views/NhaXe.vue"),
  },
  {
    path: "/khachhang",
    name: "KhachHang",
    component: () => import("@/views/KhachHang.vue"),
  },
  {
    path: "/chuyenxe",
    name: "ChuyenXe",
    component: () => import("@/views/ChuyenXe.vue"),
  },
  {
    path: "/xe",
    name: "Xe",
    component: () => import("@/views/Xe.vue"),
  },
  {
    path: "/thanhtoan",
    name: "ThanhToan",
    component: () => import("@/views/ThanhToan.vue"),
  },
  {
    path: "/ve/search-tickets",
    name: "SearchTicket",
    component: () => import("@/views/SearchTicket.vue"),
  },
  {
    path: "/",
    name: "TrangChu",
    component: () => import("@/views/TrangChu.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Home_page.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
