import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/frontend/Home.vue';

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        component: () => import('../views/frontend/Index.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: 'coffee',
        component: () => import('../views/frontend/AboutCoffee.vue'),
      },
      {
        path: 'coffee/:id',
        component: () => import('../views/frontend/AboutCoffeeDetail.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/frontend/Cart.vue'),
      },
      {
        path: 'checkout',
        component: () => import('../views/frontend/Checkout.vue'),
      },
      {
        path: 'checkoutpaid/:id',
        component: () => import('../views/frontend/CheckoutPaid.vue'),
      },
    ],
  },
  {
    path: '/:patchMatch(.*)*',
    component: () => import('../views/frontend/NotFound.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/frontend/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/dashboard/Index.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue'),
      },
      {
        path: 'article',
        component: () => import('../views/dashboard/Article.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
