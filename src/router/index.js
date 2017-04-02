import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Auth from "../components/Auth"
import Login from '@/components/Login'
import Register from '@/components/Register'
import Keeps from '@/components/Keeps'
import Dashboard from '@/components/Dashboard'
import ActiveVault from '@/components/ActiveVault'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
      children: [{
        path: "register",
        name: "Auth.register",
        component: Register
      }, {
        path: "login",
        name: "Auth.login",
        component: Login
      }]
    },
    {
      path: '/keeps',
      name: 'Keeps',
      component: Keeps
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/vaults/:id',
      name: 'Active vault',
      component: ActiveVault
    }
  ]
})
