<template>
  <div class="home-container">
    <!-- Encabezado -->
    <header class="header">
      <div class="logo">
        <span class="brand-name">SaaS</span> <!-- Texto de SaaS -->
      </div>
      <div class="search-bar">
        <input type="text" placeholder="¿Qué estás buscando?" />
        <button class="search-btn">
          <i class="fas fa-search"></i> <!-- Ícono de lupa -->
        </button>
      </div>
      <nav class="navbar">
        <a href="#" class="navbar-link">Explorar</a>
       
        <a href="#" class="navbar-link">¿Cómo funciona?</a>
        <router-link to="/register" class="signup-btn">Registrarse</router-link>
        <router-link to="/login" class="login-btn">Iniciar sesión</router-link>
        <router-link to="/microempresa-register" class="register-btn">Registrar Microempresa</router-link>
        <!-- Botón de microempresa -->
      </nav>
    </header>

    <!-- Sección de microempresas -->
    <section class="microempresas-section">
      <h2>Microempresas</h2>
      <div class="microempresas-cards">
        <div class="card" v-for="microempresa in microempresas" :key="microempresa.id" @mouseover="hover = true"
          @mouseleave="hover = false" :class="{ 'card-hover': hover }">
          <div class="card-content">
            <h3>{{ microempresa.nombre }}</h3>
            <p>{{ microempresa.direccion }}</p>
            <p>Teléfono: {{ microempresa.telefono }}</p>
            <p>Horario: {{ microempresa.horario_atencion }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pie de página -->
    <footer class="footer">
      <p>&copy; 2026 Mi SaaS. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      microempresas: [],
      hover: false,
    };
  },
  mounted() {
    this.fetchMicroempresas();
  },
  methods: {
    async fetchMicroempresas() {
      try {
        const response = await axios.get('http://localhost:8000/api/micro/allMicroempresas');
        this.microempresas = response.data.microempresas;
      } catch (error) {
        console.error("Error al obtener las microempresas:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.home-container {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  margin: 0;
  padding: 0;
}

/* Encabezado */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1c3b56;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .logo {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
  }

  .search-bar {
    display: flex;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 30px;
    padding: 5px 15px;

    input {
      padding: 8px;
      border: none;
      outline: none;
      border-radius: 20px;
      width: 300px;
      font-family: 'Arial', sans-serif;
    }

    .search-btn {
      background-color: #abb1b4;
      border: none;
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;

      &:hover {
        background-color: #a6acaf;
      }
    }
  }

  .navbar {
    display: flex;
    justify-content: center;
    gap: 30px;
    align-items: center;
    height: 100%;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      padding: 10px 0;
    }
  }
}

/* Sección de Microempresas */
.microempresas-section {
  padding: 30px;
  background-color: #fff;
  margin-top: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
  }

  .microempresas-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .card {
    width: 280px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    padding: 15px;
    cursor: pointer;

    .card-content {
      padding: 10px 0;

      h3 {
        font-size: 18px;
        color: #333;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #555;
        margin-bottom: 8px;
      }
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .card-hover {
    background-color: #f4f7fa;
    transform: scale(1.05);
  }
}

/* Pie de página */
.footer {
  text-align: center;
  padding: 20px;
  background-color: #fff;
  margin-top: 40px;
  border-top: 1px solid #ddd;
}
</style>