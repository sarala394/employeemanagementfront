
import Home from "./modules/home";
import Employee from "./modules/employee";
import Reports from "./modules/reports";


import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...Home, ...Employee, ...Reports,],
});

export default router;