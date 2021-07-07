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
        path: 'checkoutpaid',
        component: () => import('../views/frontend/CheckoutPaid.vue'),
      },
      {
        path: ':patchMatch(.*)*',
        component: () => import('../views/frontend/NotFound.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/frontend/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Dashboard/Index.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/Dashboard/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Dashboard/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/Dashboard/Coupons.vue'),
      },
      {
        path: 'article',
        component: () => import('../views/Dashboard/Article.vue'),
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
