import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Importa el archivo del enrutador
import '@fortawesome/fontawesome-free/css/all.css';


// Crea la aplicación Vue, usa el enrutador y monta la app en el div con id 'app'
createApp(App)
  .use(router)  // Usa el enrutador para manejar la navegación
  .mount('#app') // Monta la aplicación en el div con id 'app'

