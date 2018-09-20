import Vue from 'vue';
import Router from 'vue-router';
import Users from './views/Users.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/user/:id',
      name: 'userEdit',
      component: () => import(/* webpackChunkName: "user-details" */ './views/UserDetails.vue'),
    },
    {
      path: '/add',
      name: 'userAdd',
      component: () => import(/* webpackChunkName: "user-details" */ './views/UserDetails.vue'),
    },
    {
      path: '/', redirect: {name: 'users'},
    },
    {
      path: '*', redirect: {name: 'users'},
    },
  ],
});
