export default [
  {
    path: "/",
    component: import("@/layouts/default.vue"),
    children: [
      {
        path: "/employees",
        // component : import("..pages/index.vue")
        component: import("@/views/EmployeeManagement/index.vue"),
        meta: {
          pageTitle: "Employee Management",
        },
      },
    ],
  },
];
