import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: 'Home',
    component: Home
  },
  {
    path: '/autorization',
    name: 'Autorization',
    component: () => import('../views/Autorization')
  },
  {
    path: '/book/:isbn',
    name: 'Book',
    component: () => import('../views/Book')
  },
  {
    path: '/addBookTo/:id',
    name: 'AddBook',
    component: () => import('../views/AddBook')
  },
  {
    path: '/addCategoryTo/:id',
    name: 'AddCategory',
    component: () => import('../views/AddCategory')
  },
  {
    path: '/editBook/:isbn',
    name: 'EditBook',
    component: () => import('../views/EditBook')
  },
  {
    path: '/editCategory/:id',
    name: 'EditCategory',
    component: () => import('../views/EditCategory')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
