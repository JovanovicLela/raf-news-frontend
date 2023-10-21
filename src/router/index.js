import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    meta: {
      authRequired: false,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
  },
  {
    path: '/users',
    name: 'new-user',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/NewUser.vue')
  },
  {
    path: '/category',
    name: 'new-category',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/NewCategory.vue')
  },
  {
    path: '/news',
    name: 'new-news',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/NewNews.vue')
  },
  {
    path: '/user/update/:id',
    name: 'UpdateUser',
    component: () => import(/* webpackChunkName: "about" */ '../views/UpdateUser.vue')
  },
  {
    path: '/category/update/:id',
    name: 'UpdateCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/UpdateCategory.vue')
  },
  {
    path: '/news/update/:id',
    name: 'UpdateNews',
    component: () => import(/* webpackChunkName: "about" */ '../views/UpdateNews.vue')
  },
  {
    path: '/logIn',
    name: 'LogIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogIn.vue')
  },
  {
    path: '/cms',
    name: 'Cms',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Cms.vue')
  },
  {
    path: '/cms-admin',
    name: 'CmsAdmin',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/CmsAdmin.vue')
  },
  {
    path: '/news/search',
    name: 'search-news',
    meta: {
      authRequired: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchNews.vue')
  },
  {
    path: '/news/most-visited',
    name: 'NewsMostVisited',
    meta: {
      authRequired: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewsMostVisited.vue')
  },
  {
    path: '/news/:id',
    name: 'SingleNewsDetailsView',
    meta: {
      authRequired: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SingleNewsDetailsView.vue')
  },
  {
    path: '/news/category/:id',
    name: 'NewsByCategory',
    meta: {
      authRequired: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewsByCategory.vue')
  },
  {
    path: '/news/tag/:id',
    name: 'NewsByTag',
    meta: {
      authRequired: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewsByTag.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      next({name: 'LogIn'});
      return;
    }

    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);
    if (expDate < new Date()) {
      next({name: 'LogIn'});
      return;
    }
  }

  next();
});

export default router
