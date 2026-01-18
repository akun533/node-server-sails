const Layout = () => import("@/layout/index.vue");

export default {
  path: "/user",
  name: "User",
  component: Layout,
  redirect: "/user/index",
  meta: {
    icon: "ep/user",
    title: "用户管理",
    rank: 1
  },
  children: [
    {
      path: "/user/index",
      name: "UserManagement",
      component: () => import("@/views/user/index.vue"),
      meta: {
        title: "用户列表",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
