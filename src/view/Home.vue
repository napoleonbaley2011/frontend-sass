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
        <a href="#" class="navbar-link">Comunidad</a>
        <a href="#" class="navbar-link">¿Cómo funciona?</a>
        <router-link to="/register" class="signup-btn">Registrarse</router-link>
        <router-link to="/login" class="login-btn">Iniciar sesión</router-link>
        <router-link to="/microempresa-register" class="register-btn">Registrar Microempresa</router-link> <!-- Botón de microempresa -->
      </nav>
    </header>

    <!-- Sección principal -->
    <section class="hero-section">
      <h1 class="hero-title">Encuentra la mejor solución SaaS</h1>
      <p class="hero-description">
        Conéctate con los mejores servicios SaaS para hacer crecer tu negocio de manera eficiente.
      </p>
      <div class="cta-buttons">
        <button class="cta-btn">Explorar resultados</button>
      </div>
    </section>

    <!-- Pie de página -->
    <footer class="footer">
      <p>&copy; 2026 Mi SaaS. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped lang="scss">
/* Contenedor general */
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
  background-color: #1c3b56; /* Azul más oscuro */
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
    border-radius: 30px; /* Bordes redondeados más amplios */
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
      background-color: #3498db;
      border: none;
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;

      &:hover {
        background-color: #2980b9;
      }
    }
  }

  .navbar {
    display: flex;
    justify-content: center; /* Centra los enlaces */
    gap: 30px; /* Espaciado entre los enlaces */
    align-items: center; /* Centrado vertical */
    height: 100%; /* Asegura que los enlaces estén centrados verticalmente */
    
    a {
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      padding: 10px 0; /* Ajuste para alinear verticalmente */
    }

    .signup-btn, .login-btn, .register-btn {
      padding: 10px 20px;
      background-color: #2980b9;
      color: white;
      border-radius: 20px; /* Botones ovalados */
      font-size: 14px;
      text-decoration: none;

      &:hover {
        background-color: #1f6392;
      }
    }

    .login-btn {
      background-color: #fff;
      color: #2980b9;
      border: 1px solid #2980b9;

      &:hover {
        background-color: #2980b9;
        color: white;
      }
    }
  }
}

/* Sección Hero */
.hero-section {
  text-align: center;
  padding: 50px;
  background-color: #fff;
  margin-top: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .hero-title {
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }

  .hero-description {
    font-size: 18px;
    color: #555;
    margin-bottom: 40px;
  }

  .cta-buttons {
    .cta-btn {
      padding: 12px 20px;
      background-color: #3498db;
      color: white;
      font-size: 16px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        background-color: #2980b9;
      }
    }
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


