import Vue from 'vue'
import Router from 'vue-router'
import Customer from '@/components/Customer'
import EditUser from '@/components/EditUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/edit-user/:user_id',
      name: 'EditUser',
      component: EditUser
    }
  ]
})
