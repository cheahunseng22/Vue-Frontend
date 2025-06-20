import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/register.vue'
import Login from '../views/login.vue'
import home from '../views/HomePage/home.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Admin from '../views/admin/Admin.vue'
import page from '../views/LandingPages/page.vue'
import Page1 from '../views/admin/section/page1.vue'
import Payment from '../views/pay/Payments.vue'


const routes = [
  {path:'/', component: page},
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  
  { path: '/home', component: home,
    beforeEnter: (to, from, next) => {
    const isUserLoggedIn = localStorage.getItem('user_store') === 'true';
    if (isUserLoggedIn) {
      next();
    } else {
      next('/login'); // redirect to login
    }
  }
  },
  { path: '/admin', component: Admin },

{
  path: '/admin/dashboard',
  component: Dashboard,
  beforeEnter: (to, from, next) => {
    const fromLogin = sessionStorage.getItem('admin_just_logged_in');

    if (fromLogin === 'true') {
      next();
    } else {
      next('/admin');
    }
  }
},
{
  path:'/admin-page1',component:Page1
},
{
  path: '/payments',
  component: Payment,
  beforeEnter: (to, from, next) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set default token header for axios if needed
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      next(); // allow access
    } else {
      alert('You must be logged in to access payments');
      next('/login'); // redirect to login
    }
  }
}



]



const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
