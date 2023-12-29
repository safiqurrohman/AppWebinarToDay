import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/view/Home.vue';
import search_page from '@/view/webinar/search_page.vue';
import P_Profile from '@/view/profile/P_Profile.vue';
import U_Profile from '@/view/profile/U_Profile.vue';
import webinar_page from '@/view/webinar/webinar_page.vue';
import login from '@/view/register/login.vue';
import Signup from '@/view/register/Signup.vue';
import Dashboard from '@/view/dashboard/dashboard.vue';
import daftarWebinar from '@/view/webinar/daftarWebinar.vue'
import addWebinar from '@/view/webinar/addWebinar.vue';
import loginUser from '@/view/register/login_u.vue';
import SignupUser from '@/view/register/Signup_U.vue';
import updateUser from '@/view/profile/updateUser.vue';
import updatePenyelenggara from '@/view/profile/updatePenyelenggara.vue';
import editWebinar from '@/view/webinar/editWebinar.vue';
import DashOrder from '@/view/dashboard/dashOrder.vue';
import Tentang from '@/view/Tentang/Tentang.vue';


const routes = [
  {
    path: '/',
    component: Home,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/Tentang',
    component: Tentang,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/profile-penyelenggara',
    component: P_Profile,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/profile-user',
    component: U_Profile,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/search',
    component: search_page,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/page/:id',
    component: webinar_page,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/login',
    component: login,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/sign-up',
    component: Signup,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { showHeader: true, showFooter: true, requiresAuth: true },
  },
  {
    path: '/daftar/:user_id/:webinar_id',
    component: daftarWebinar,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/addWebinar/:organisasi_id',
    component: addWebinar,
    props: true,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/loginuser',
    component: loginUser,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/signUpUser',
    component: SignupUser,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/edituser/:user_id',
    component: updateUser,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/updatePenyelenggara/:organisasi_id',
    component: updatePenyelenggara,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/editWebinar/:webinar_id/:organisasi_id',
    name: 'editWebinar',
    component: editWebinar,
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: '/dashOrder/:webinar_id',
    component: DashOrder,
    meta: { showHeader: true, showFooter: true }
  },
  // Tambahkan rute lain jika diperlukan
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
