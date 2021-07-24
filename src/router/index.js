import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/loginadmin',
    name: 'loginadmin',
    component: () => import('../components/loginadmin.vue')
  },
  {
    path: '/loginvendedor',
    name: 'loginvendedor',
    component: () => import('../components/loginvendedor.vue')
  },
  {
    path: '/loginalmacenista',
    name: 'loginalmacenista',
    component: () => import('../components/loginalmacenista.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../components/menu.vue')
  },  
  {
    path: '/roles',
    name: 'roles',
    component: () => import('../views/roles.vue')
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: () => import('../views/categoria.vue')
  },
  {
    path: '/articulos',
    name: 'articulos',
    component: () => import('../views/Articulos.vue')
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: () => import('../views/clientes.vue')
  },
  {
    path: '/ingresos',
    name: 'ingresos',
    component: () => import('../views/ingresos.vue')
  },
  {
    path: '/proveedores',
    name: 'proveedores',
    component: () => import('../views/Proveedores.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('../views/usuarios.vue')
  },
  {
    path: '/ventas',
    name: 'ventas',
    component: () => import('../views/ventas.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

 
router.beforeEach((to,from,next)=>{
  if (! store.state.token && to.path =='/loginadmin' || to.path =='/loginvendedor' ||  to.path =='/loginalmacenista'){
    next()
  }else if (! store.state.token && to.path !='/roles' ){

    next({name:'roles'})

  }else{
    next()
  }
})



export default router
