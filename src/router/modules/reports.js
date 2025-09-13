export default [
  {
    path: "/",
    component: import("@/layouts/default.vue"),
    children: [
      {
        path: "/reports",
        // component : import("..pages/index.vue")
        component: import("@/views/ReportManagement/index.vue"),
        meta: {
          pageTitle: "Report Management",
        },
      },
    ],
  },
];
