import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login.vue';
import Index from '@/views/Index.vue';
import Admin from '@/views/Admin.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'admin',
          name: 'admin',
          component: Admin
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('accessToken')) {
    next();
  } else {
    if (to.path ==="/login"){
      next();
    }else {
      next('/login');
    }
  }
});

export default router;
