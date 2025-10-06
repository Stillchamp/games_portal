import { createRouter, createWebHistory } from 'vue-router'
import BeneficiariesView from '../views/BeneficiariesView.vue'
import LoginView from '../views/LoginView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/beneficiaries',
      name: 'beneficiaries',
      component: BeneficiariesView,
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('../views/setup.vue'), // Placeholder
    },
      {
        path: '/verification',
        name: 'verification',
        component: () => import('../views/VerificationView.vue'),
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('../views/ResetPasswordView.vue'),
      },
      {
        path: '/password-changed',
        name: 'password-changed',
        component: () => import('../views/PasswordChangedView.vue'),
      },
    {
      path: '/communication',
      name: 'communication',
      component: () => import('../views/setup.vue'), // Placeholder
    },
    {
      path: '/administrative/user',
      name: 'admin-user',
      component: () => import('../views/administrative/UserDashboardView.vue'),
    },
    {
      path: '/administrative/user/add',
      name: 'admin-user-add',
      component: () => import('../views/administrative/AddUserView.vue'),
    },
    {
      path: '/administrative/roles',
      name: 'admin-roles',
      component: () => import('../views/RolesView.vue'), // Placeholder
    },
    
  ],
})

export default router

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
const publicPages = ['login', 'forgot-password', 'verification', 'reset-password', 'password-changed'];  if (!publicPages.includes(to.name) && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});
