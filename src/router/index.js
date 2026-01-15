import { createRouter, createWebHistory } from 'vue-router'

// Importar vistas
import Home from '../view/Home.vue'
import Login from '../view/Login.vue'
import ForgotPassword from '../view/ForgotPassword.vue'  // Página de recuperación de contraseña
import Register from '../view/Register.vue';  
import AdminDashboard from '../view/AdminDashboard.vue';  
import MicroempresaDashboard from '../view/MicroempresaDashboard.vue' // SuperUsuario
import VendedorDashboard from '../view/VendedorDashboard.vue'
import MicroempresaRegister from '../view/MicroempresaRegister.vue'

// Definir rutas
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,  // Página de inicio
  },
  {
    path: '/login',
    name: 'login',
    component: Login,  // Página de Login
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,  // Página de recuperación de contraseña
  },
  {
    path: '/register',
    name: 'register',
    component: Register,  // Página de Registro
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: AdminDashboard,  // Dashboard del Administrador
    meta: { requiresAuth: true },
  },
  {
    path: '/microempresa',
    name: 'microempresa-dashboard',
    component: MicroempresaDashboard,  // Dashboard del Superusuario Microempresa
    meta: { requiresAuth: true },
  },
  {
    path: '/vendedor',
    name: 'vendedor-dashboard',
    component: VendedorDashboard,  // Dashboard del Vendedor
    //meta: { requiresAuth: true },  // Puedes activar esta línea si deseas proteger la ruta
  },
  {
    path: '/microempresa-register',  // Nueva ruta para registro de microempresa
    name: 'microempresa-register',
    component: MicroempresaRegister,  // Componente del formulario de microempresa
  },

];

// Crear el router con historial
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Protección de rutas para autenticación
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = localStorage.getItem('auth-token');
    if (!isAuthenticated) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

