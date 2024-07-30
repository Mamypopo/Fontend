import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import News from '../views/News.vue'
import NewDetailVue from '@/views/NewsDetail.vue'
import Activity from '../views/Activity.vue'
import ActivityDetail from '@/views/ActivityDetail.vue'
import Contact from '../views/Contact.vue'
import History from '../views/History.vue'
import Loginuser from '../views/Login.vue'
import InforUser from '../views/InforUser.vue'
import DataUser from '../views/DataUser.vue'
import DataTeacher from '../views/DataTeacher.vue'
import InforTeacher from '../views/InforTeacher.vue'
import RegisterUser from '../views/RegisterUser.vue'
import RegisterTeacher from '../views/RegisterTeacher.vue'
import ResetPassword from '../views/ResetPassword.vue'
import { useUserStore } from '@/stores/user'
import Swal from 'sweetalert2';
import axios from 'axios';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/news/:newId',
      name: 'new-detail',
      component: NewDetailVue
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
    {
      path: '/activity/:activityId',
      name: 'activity-detail',
      component: ActivityDetail
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: { requiresAuth: true }
    },
    {
      path: '/history',
      name: 'historyt',
      component: History
    },
   
    {
      path: '/login',
      name: 'login',
      component: Loginuser
    },
    {
      path: '/infor-user',
      name: 'infor-user',
      component: InforUser,
      meta: { requiresAuth: true }
    },

    {
      path: '/infor-teacher',
      name: 'infor-teacher',
      component: InforTeacher,
      meta: { requiresAuth: true }
    },

    {
      path: '/data-user',
      name: 'data-user',
      component: DataUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/data-teacher',
      name: 'data-teacher',
      component: DataTeacher,
      meta: { requiresAuth: true }
    },
    
    {
      path: '/register-user',
      name: 'register-user',
      component: RegisterUser,
     // meta: { requiresAuth: true }
    },
    {
      path: '/register-teacher',
      name: 'register-teacher',
      component: RegisterTeacher,
      meta: { requiresAuth: true }
    },

    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const token = localStorage.getItem('token');

    
    if (token) {
      const response = await axios.get<{message: string, result: any, cause: string}>('http://localhost:8000/api/v1/auth/profile', {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });
      useUserStore().setUser(response.data.result.user)
    }

    if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
      next(from.path);
      return;
    }
    next();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.data.cause === 'token expired') {
          localStorage.removeItem('token');
          useUserStore().resetUser();
          await Swal.fire({
            icon: 'error',
            title: 'session หมดอายุ',
            text: 'กรูณาเข้าสู่ระบบอีกครั้ง',
          });
        }
      }
    }
    next('/');
  }
})

export default router
