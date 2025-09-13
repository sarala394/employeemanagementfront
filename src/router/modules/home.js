export default [
  {
    path: "/",
    component: import("@/layouts/default.vue"),
    children: [
      {
        path: "/dashboard",
        component: import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
        },
      },
      {
        path: "/",
        component: import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
        },
      },
    ],
  },
];
