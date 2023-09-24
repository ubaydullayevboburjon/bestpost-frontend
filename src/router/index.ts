import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ()=> import("../layouts/Layout.vue"),
      children:[
        {
          path: "profile-settings",
          name: "Profile",
          component: ()=> import('../views/users/UserProfileView.vue')
        },
        {
          path: "about",
          name: "About",
          component: ()=> import('../views/AboutView.vue')
        },
        {
          path: "create-post",
          component: ()=> import('../views/posts/CreatePost.vue')
        },
        {
          path: "/",
          component: ()=> import('../views/home/HomeView.vue')
        },
        {
          path: "posts/:id",
          component: ()=> import('../components/posts/PostFullViewComponent.vue')
        },
        {
          path: "users",
          component: ()=> import('../views/users/AllUserProfileView.vue')
        },
      ]
    },
    {
      path: "/auth",
      component: ()=>import("../layouts/AuthLayout.vue"),
      redirect: "/auth/login",
      children: [
        {
          path: "login",
          name: "Login",
          component: ()=>import("../views/auth/LoginView.vue")
        },
        {
          path:'register',
          name: "Register",
          component:()=>import('../views/auth/RegisterView.vue')
        },
      ]
    }
  ]
})



export default router
