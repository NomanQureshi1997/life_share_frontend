import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
          beforeEnter: (to, from, next) => {
          let r = localStorage.getItem("token");
          if (r) {
              console.log(r);
              next(true);
            } else {
                next({ name: "login" });
              }
            },
  },
  {
    path: '/donors',
    name: 'donors',
    component: () => import(/* webpackChunkName: "Instructions" */ '@/views/Donor-Table/Donor.vue'),
    beforeEnter: (to, from, next) => {
      let r = localStorage.getItem("token");
      if (r) {
          console.log(r);
          next(true);
        } else {
            next({ name: "login" });
          }
        },
  },
  {
    path: '/blood-bank',
    name: 'blood-bank',
    component: () => import(/* webpackChunkName: "Instructions" */ '@/views/Donor-Table/BloodBank.vue'),
    beforeEnter: (to, from, next) => {
      let r = localStorage.getItem("token");
      if (r) {
          console.log(r);
          next(true);
        } else {
            next({ name: "login" });
          }
        },
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/newsfeed',
    name: 'newsfeed',
    component: () => import('@/views/cards/Card.vue'),
  },
  // {
  //   path: '/simple-table',
  //   name: 'simple-table',
  //   component: () => import('@/views/simple-table/SimpleTable.vue'),
  // },
  // {
  //   path: '/form-layouts',
  //   name: 'form-layouts',
  //   component: () => import('@/views/form-layouts/FormLayouts.vue'),
  // },
  {
    path: '/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
    beforeEnter: (to, from, next) => {
      let r = localStorage.getItem("token");
      if (r) {
          console.log(r);
          next(true);
        } else {
            next({ name: "login" });
          }
        },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
      beforeEnter: (to, from, next) => {
        let auth = localStorage.getItem("token");
        if (auth) {
            next({ name: "dashboard" });
          } else {
              next(true);
            }
    },
  },
  // {
  //   path: '/pages/register',
  //   name: 'pages-register',
  //   component: () => import('@/views/pages/Register.vue'),
  //   meta: {
  //     layout: 'blank',
  //   },
  // },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
